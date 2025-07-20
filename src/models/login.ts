import { NeoScope } from "./scope";

interface NeoLoginResponse {
	token_type: string;
	access_token: string;
	refresh_token: string;
	expires_in: number;
	scope: Array<NeoScope>;
}

export type { NeoLoginResponse };