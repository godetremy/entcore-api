import {NeoRestManager} from "~/rest/RESTManager";
import {NeoAuthCredentials} from "~/types/authentication";
import {
	NeoConversationAttachmentId,
	NeoConversationDraftId,
	NeoConversationFolder,
	NeoConversationListParameters,
	NeoConversationMessageContent,
	NeoConversationMessageMetadata, NeoConversationSentMessage,
	NeoConversationSystemFolder
} from "~/types/conversation";
import {TOKEN_ERROR} from "~/const/error";
import {
	CONVERSATION_CREATE_DRAFT,
	CONVERSATION_DELETE,
	CONVERSATION_EMPTY_TRASH,
	CONVERSATION_FOLDER_MESSAGES,
	CONVERSATION_FOLDERS,
	CONVERSATION_MESSAGE_ADD_ATTACHMENT,
	CONVERSATION_MESSAGE_ATTACHMENT,
	CONVERSATION_SEND_MESSAGE,
	CONVERSATION_TRASH,
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

	public async sendMessage(content: NeoConversationMessageContent, draftId?: string): Promise<NeoConversationSentMessage> {
		this.checkToken();
		return this.restManager.post<NeoConversationSentMessage>(
			CONVERSATION_SEND_MESSAGE(draftId),
			content,
			{
				Authorization: `Bearer ${this.credentials.access_token}`
			}
		);
	}

	public async moveMessageToTrash(messageId: string | string[]): Promise<void> {
		if (!Array.isArray(messageId))
			messageId = [messageId];
		this.checkToken();
		await this.restManager.put<{}>(
			CONVERSATION_TRASH(),
			{id: messageId},
			{
				Authorization: `Bearer ${this.credentials.access_token}`
			}
		)
	}

	public async deleteMessage(messageId: string | string[]): Promise<void> {
		if (!Array.isArray(messageId))
			messageId = [messageId];
		this.checkToken();
		await this.restManager.put<{}>(
			CONVERSATION_DELETE(),
			{id: messageId},
			{
				Authorization: `Bearer ${this.credentials.access_token}`
			}
		)
	}

	public async addAttachmentToDraft(draftId: string, file: File | Blob | ArrayBuffer, filename?: string): Promise<NeoConversationAttachmentId> {
		this.checkToken();
		return await this.restManager.postFile<NeoConversationAttachmentId>(
			CONVERSATION_MESSAGE_ADD_ATTACHMENT(draftId),
			file,
			{
				"Authorization": `Bearer ${this.credentials.access_token}`
			},
			filename
		);
	}

	public generateAttachmentUrl(messageId: string, attachmentId: string): string {
		return `${this.restManager.getBaseURL()}/${CONVERSATION_MESSAGE_ATTACHMENT(messageId, attachmentId)}`;
	}

	public async deleteAttachmentToDraft(draftId: string, attachmentId: string): Promise<void> {
		this.checkToken();
		await this.restManager.delete<{}>(
			CONVERSATION_MESSAGE_ATTACHMENT(draftId, attachmentId),
			{
				Authorization: `Bearer ${this.credentials.access_token}`
			}
		);
	}

	public async emptyTrash(): Promise<void> {
		this.checkToken();
		await this.restManager.delete<{}>(
			CONVERSATION_EMPTY_TRASH(),
			{
				Authorization: `Bearer ${this.credentials.access_token}`
			}
		);
	}
}