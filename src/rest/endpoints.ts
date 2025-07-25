import {NeoConversationListParameters} from "~/types/conversation";
import {generateParametersConversationList} from "~/rest/parameters";

export const AUTH_TOKEN = () => "auth/oauth2/token";
export const AUTH_USERINFO = () => "auth/oauth2/userinfo";

export const SSO_PRONOTE = () => "sso/pronote";

export const CONVERSATION_BASE_URL = () => "conversation";
export const CONVERSATION_FOLDERS = () => `${CONVERSATION_BASE_URL()}/api/folders`;
export const CONVERSATION_FOLDER_MESSAGES = (id: string, param: NeoConversationListParameters) => `${CONVERSATION_BASE_URL()}/api/folders/${encodeURIComponent(id)}/messages${generateParametersConversationList(param)}`;
export const CONVERSATION_CREATE_DRAFT = () => `${CONVERSATION_BASE_URL()}/draft`;
export const CONVERSATION_UPDATE_DRAFT = (id: string) => `${CONVERSATION_BASE_URL()}/draft/${id}`;
export const CONVERSATION_SEND_MESSAGE = (draftId?: string) => `${CONVERSATION_BASE_URL()}/send${draftId ? `?id=${draftId}` : ""}`;

export const CAS_OAUTH_LOGIN = (service: string) => `cas/oauth/login?service=${encodeURIComponent(service)}`;