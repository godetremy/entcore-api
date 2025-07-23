import {NeoRestManager} from "~/rest/RESTManager";
import {NeoAuthCredentials} from "~/types/authentication";
import {
	NeoConversationListParameters,
	NeoConversationMessageMetadata,
	NeoConversationSystemFolder
} from "~/types/conversation";
import {TOKEN_ERROR} from "~/const/error";
import {CONVERSATION_LIST_FOLDER} from "~/rest/endpoints";

export class NeoConversation {
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

	public async listFolder(folder: string | NeoConversationSystemFolder, params: NeoConversationListParameters = {}): Promise<NeoConversationMessageMetadata[]> {
		this.checkToken();
		return this.restManager.get<NeoConversationMessageMetadata[]>(
			CONVERSATION_LIST_FOLDER(folder, params),
			{
				Authorization: `Bearer ${this.credentials.access_token}`
			}
		);
	}
}