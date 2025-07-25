import {NeoRestManager} from "~/rest/RESTManager";
import {NeoAuthCredentials} from "~/types/authentication";
import {
	NeoConversationDraftId,
	NeoConversationFolder,
	NeoConversationListParameters,
	NeoConversationMessageContent,
	NeoConversationMessageMetadata,
	NeoConversationSystemFolder
} from "~/types/conversation";
import {TOKEN_ERROR} from "~/const/error";
import {
	CONVERSATION_CREATE_DRAFT,
	CONVERSATION_FOLDER_MESSAGES,
	CONVERSATION_FOLDERS,
	CONVERSATION_UPDATE_DRAFT
} from "~/rest/endpoints";

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
			CONVERSATION_FOLDER_MESSAGES(folder, params),
			{
				Authorization: `Bearer ${this.credentials.access_token}`
			}
		);
	}

	public async getUserFolders(): Promise<NeoConversationFolder[]> {
		this.checkToken();
		return this.restManager.get<NeoConversationFolder[]>(
			CONVERSATION_FOLDERS(),
			{
				Authorization: `Bearer ${this.credentials.access_token}`
			}
		);
	}

	public async createDraft(draft: NeoConversationMessageContent): Promise<NeoConversationDraftId> {
		this.checkToken();
		return this.restManager.post<NeoConversationDraftId>(
			CONVERSATION_CREATE_DRAFT(),
			draft,
			{
				Authorization: `Bearer ${this.credentials.access_token}`
			}
		);
	}

	public async updateDraft(draftId: string, draft: NeoConversationMessageContent): Promise<void> {
		this.checkToken();
		await this.restManager.put<{}>(
			CONVERSATION_UPDATE_DRAFT(draftId),
			draft,
			{
				Authorization: `Bearer ${this.credentials.access_token}`
			}
		);
	}
}