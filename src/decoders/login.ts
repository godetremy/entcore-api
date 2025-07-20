import {NeoLoginResponse, NeoScope} from "~/models";

const decodeNeoLoginResponse = (response: any): NeoLoginResponse => {
	return {
		token_type: response.token_type,
		access_token: response.access_token,
		refresh_token: response.refresh_token,
		expires_in: response.expires_in,
		scope: response.scope.split(' ').map((scope: string) => {
			return scope as NeoScope;
		})
	}
};

export { decodeNeoLoginResponse };