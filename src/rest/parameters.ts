import {NeoConversationListParameters} from "~/types/conversation";

export const generateParametersConversationList = (params: NeoConversationListParameters): string => {
	let set: string[] = [];

	if (params.page)
		set.push(`page=${params.page}`);
	if (params.page_size)
		set.push(`page_size=${params.page_size}`);
	if (params.unread)
		set.push(`unread=${params.unread}`);
	if (params.searchWords)
		set.push(`searchWords=${encodeURIComponent(params.searchWords)}`);

	return (set.length > 0 ? "?" + set.join("&") : "")
}