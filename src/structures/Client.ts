import {NeoAuthCredentials} from "~/types/authentication";
import {NeoRestManager} from "~/rest/RESTManager";
import {_login_saml, _refresh_token} from "~/routes/Auth";
import {_generate_pronote_authorized_url, _pronote_sso} from "~/routes/SSO";
import {TOKEN_ERROR} from "~/const/error";
import {NeoConversation} from "~/routes/Conversation";

export class NeoClient {
	private restManager: NeoRestManager;
	private credentials: NeoAuthCredentials = {
		expires_at: 0,
		scope: []
	}

	public conversation: NeoConversation;

	constructor(baseURL: string, credentials?: NeoAuthCredentials) {
		if (credentials)
			this.credentials = credentials;
		this.restManager = new NeoRestManager(baseURL);

		this.conversation = new NeoConversation(this.restManager, this.credentials);
	}

	/**
	 * @group Authentication
	 */

	public async loginSAML(assertion: string): Promise<NeoAuthCredentials> {
		const token = await _login_saml(this.restManager, assertion);
		Object.assign(this.credentials, token);
		return token;
	}

	public async refreshToken(refresh_token?: string): Promise<NeoAuthCredentials> {
		if (!refresh_token)
			refresh_token = this.credentials.refresh_token;
		const token = await _refresh_token(this.restManager, refresh_token);
		Object.assign(this.credentials, token);
		return token;
	}

	/**
	 * @group SSO
	 */

	public async getPronoteSSO(): Promise<Array<NeoPronoteSSO>> {
		if (!this.credentials.access_token)
			throw TOKEN_ERROR;
		return _pronote_sso(this.restManager, this.credentials.access_token);
	}

	public async generatePronoteAuthorizedUrl(sso: NeoPronoteSSO): Promise<URL> {
		if (!this.credentials.access_token)
			throw TOKEN_ERROR;
		return _generate_pronote_authorized_url(this.restManager, sso, this.credentials.access_token);
	}
}