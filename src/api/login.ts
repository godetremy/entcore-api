import NeoFetcher from "./helpers/fetcher";
import {NeoInstance} from "~/models";
import {decodeNeoLoginResponse} from "~/decoders/login";
import {NeoLoginResponse, NeoScope} from "~/models";

async function loginSAML(instance: NeoInstance, assertion: string): Promise<NeoLoginResponse> {
	let response = await NeoFetcher(instance, "/auth/oauth2/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({
			assertion,
			client_id: "app-e",
			client_secret: "yTFxAPupNnKb9VcKwA6E5DA3",
			grant_type: "saml2",
			scope: Object.values(NeoScope).join(" "),
		}).toString()
	});
	return decodeNeoLoginResponse(response);
}

export {loginSAML};