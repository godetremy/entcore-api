import {NeoRestManager} from "~/rest/RESTManager";
import {CAS_OAUTH_LOGIN, SSO_PRONOTE} from "~/rest/endpoints";

export const _pronote_sso = async (rest: NeoRestManager, access_token: string): Promise<Array<NeoPronoteSSO>> => {
	 return await rest.get<Array<NeoPronoteSSO>>(
		SSO_PRONOTE(),
		{
			"Authorization": `Bearer ${access_token}`
		}
	)
}

export const _generate_pronote_authorized_url = async (rest: NeoRestManager, sso: NeoPronoteSSO, access_token: string): Promise<URL> => {
	let pronote_endpoint = "";

	if (sso.xmlResponse.includes("Eleve"))
		pronote_endpoint = "mobile.eleve.html";

	const result = await rest.get<Headers>(
		CAS_OAUTH_LOGIN(`${sso.address.toString()}${pronote_endpoint}`),
		{
			"Authorization": `Bearer ${access_token}`
		}
	)
	if (result.has("Location"))
		return new URL(result.get("Location")!);
	throw new Error("No Location header found in the response.");
}