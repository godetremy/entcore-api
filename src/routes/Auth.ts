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