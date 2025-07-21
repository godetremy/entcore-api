import {NeoAuthCredentials} from "~/types/authentication";
import {NeoRestManager} from "~/rest/RESTManager";
import {_login_saml, _refresh_token} from "~/routes/Auth";

export class NeoClient {
	private restManager: NeoRestManager;
	private credentials: NeoAuthCredentials = {
		expires_at: 0,
		scope: []
	}

	constructor(baseURL: string, credentials?: NeoAuthCredentials) {
		if (credentials)
			this.credentials = credentials;
		this.restManager = new NeoRestManager(baseURL);
	}

	public async loginSAML(assertion: string): Promise<NeoAuthCredentials> {
		const token = await _login_saml(this.restManager, assertion);
		this.credentials = token;
		return token;
	}

	public async refreshToken(refresh_token?: string): Promise<NeoAuthCredentials> {
		if (!refresh_token)
			refresh_token = this.credentials.refresh_token;
		const token = await _refresh_token(this.restManager, refresh_token);
		this.credentials = token;
		return token;
	}
}