import {NeoRestManager} from "~/rest/RESTManager";
import {NeoAuthCredentials, NeoScope} from "~/types/authentication";
import {AUTH_TOKEN} from "~/rest/endpoints";
import {CLIENT} from "~/const/client";

export const _login_saml = async (rest: NeoRestManager, assertion: string): Promise<NeoAuthCredentials> => {
	return await rest.post<NeoAuthCredentials>(
		AUTH_TOKEN(),
		{
			...CLIENT,
			assertion,
			grant_type: "saml2",
			scope: Object.values(NeoScope).join(" "),
		}
	);
}

export const _refresh_token = async (rest: NeoRestManager, refresh_token?: string): Promise<NeoAuthCredentials> => {
	if (!refresh_token)
		throw new Error("No token available for refresh");
	return await rest.post<NeoAuthCredentials>(
		AUTH_TOKEN(),
		{
			...CLIENT,
			refresh_token,
			grant_type: "refresh_token",
			scope: Object.values(NeoScope).join(" "),
		}
	);
}