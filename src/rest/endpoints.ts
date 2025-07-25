import {NeoConversationListParameters} from "~/types/conversation";
import {generateParametersConversationList} from "~/rest/parameters";

export const AUTH_TOKEN = () => "auth/oauth2/token";

export const SSO_PRONOTE = () => "sso/pronote";

export const CONVERSATION_BASE_URL = () => "conversation/api";
export const CONVERSATION_LIST_FOLDER = (folder: string, param: NeoConversationListParameters) => `${CONVERSATION_BASE_URL()}/list/${folder}${generateParametersConversationList(param)}`;

export const CONVERSATION_FOLDERS = () => `${CONVERSATION_BASE_URL()}/folders`;
export const CONVERSATION_FOLDER_MESSAGES = (id: string, param: NeoConversationListParameters) => `${CONVERSATION_BASE_URL()}/folders/${encodeURIComponent(id)}/messages${generateParametersConversationList(param)}`;


export const CAS_OAUTH_LOGIN = (service: string) => `cas/oauth/login?service=${encodeURIComponent(service)}`;