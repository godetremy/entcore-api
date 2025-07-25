import {NeoRestManager} from "~/rest/RESTManager";
import {NeoAuthCredentials, NeoAuthToken, NeoScope} from "~/types/authentication";
import {AUTH_TOKEN, AUTH_USERINFO, AUTH_WELCOME} from "~/rest/endpoints";
import {CLIENT} from "~/const/client";
import {TOKEN_ERROR} from "~/const/error";
import {NeoCoreSession} from "~/types/core";

export class NeoAuth {
    private restManager: NeoRestManager;
    private credentials: NeoAuthCredentials;

    constructor(restManager: NeoRestManager, credentials: NeoAuthCredentials) {
        this.restManager = restManager;
        this.credentials = credentials;
    }

    private checkToken(): void {
        if (!this.credentials.access_token)
            throw TOKEN_ERROR;
    }

    public async loginSAML(assertion: string): Promise<NeoAuthCredentials> {
        const token = await this.restManager.post<NeoAuthCredentials>(
            AUTH_TOKEN(),
            {
                ...CLIENT,
                assertion,
                grant_type: "saml2",
                scope: Object.values(NeoScope).join(" "),
            }
        );
        Object.assign(this.credentials, token);
        return token;
    }

    public async refreshToken(refresh_token?: string): Promise<NeoAuthCredentials> {
        if (!refresh_token)
            refresh_token = this.credentials.refresh_token;
        if (!refresh_token)
            throw new Error("No token available for refresh");
        const token = await this.restManager.post<NeoAuthCredentials>(
            AUTH_TOKEN(),
            {
                ...CLIENT,
                refresh_token,
                grant_type: "refresh_token",
                scope: Object.values(NeoScope).join(" "),
            }
        );
        Object.assign(this.credentials, token);
        return token;
    }

    public async getUserInfo(): Promise<NeoCoreSession> {
        this.checkToken();
        return await this.restManager.get<NeoCoreSession>(
            AUTH_USERINFO(),
            {
                Authorization: `Bearer ${this.credentials.access_token}`,
            }
        );
    }

    public async requestQueryParamToken(): Promise<NeoAuthToken> {
        this.checkToken();
        return await this.restManager.get<NeoAuthToken>(
            AUTH_TOKEN() + "?type=queryparam",
            {
                Authorization: `Bearer ${this.credentials.access_token}`,
            }
        );
    }

    public async getTemporaryLoginURL(): Promise<string> {
        this.checkToken();
        const token = await this.requestQueryParamToken();
        return `${this.restManager.getBaseURL()}${AUTH_WELCOME(token.access_token)}`;
    }
}