import {NeoInstance} from "~/models";

function InitNeoInstance(baseUrl: string): NeoInstance {
	return {
		baseUrl: baseUrl
	} as NeoInstance;
}

export {InitNeoInstance};