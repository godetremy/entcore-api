import {NeoRestManager} from "~/rest/RESTManager";
import {NeoAuthCredentials, NeoScope} from "~/types/authentication";
import {AUTH_TOKEN} from "~/rest/endpoints";
import {CLIENT} from "~/const/client";
import {TOKEN_ERROR} from "~/const/error";

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
}