import {NeoRestManager} from "~/rest/RESTManager";
import {NeoAuthCredentials} from "~/types/authentication";
import {NeoAuth} from "~/routes/Auth";
import {NeoConversation} from "~/routes/Conversation";
import {NeoSSO} from "~/routes/SSO";
import {NeoMediacentre} from "~/routes/Mediacentre";

export class NeoClient {
	private restManager: NeoRestManager;
	private credentials: NeoAuthCredentials = {
		expires_at: 0,
		scope: []
	}

	public auth: NeoAuth;
	public conversation: NeoConversation;
	public mediacentre: NeoMediacentre;
	public sso: NeoSSO;

	constructor(baseURL: string, credentials?: NeoAuthCredentials) {
		if (credentials)
			this.credentials = credentials;
		this.restManager = new NeoRestManager(baseURL);

		this.auth = new NeoAuth(this.restManager, this.credentials);
		this.conversation = new NeoConversation(this.restManager, this.credentials);
		this.mediacentre = new NeoMediacentre(this.restManager, this.credentials);
		this.sso = new NeoSSO(this.restManager, this.credentials);
	}
}