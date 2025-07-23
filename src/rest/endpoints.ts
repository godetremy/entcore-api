import {NeoConversationListParameters} from "~/types/conversation";
import {generateParametersConversationList} from "~/rest/parameters";

export const AUTH_TOKEN = () => "auth/oauth2/token";

export const SSO_PRONOTE = () => "sso/pronote";

export const BASE_URL_CONVERSATION = () => "conversation";
export const CONVERSATION_LIST_FOLDER = (folder: string, param: NeoConversationListParameters) => `${BASE_URL_CONVERSATION()}/list/${folder}${generateParametersConversationList(param)}`;

export const CAS_OAUTH_LOGIN = (service: string) => `cas/oauth/login?service=${encodeURIComponent(service)}`;