import {NeoInstance} from "~/models";

const NeoFetcher = async (instance: NeoInstance, path: string, fetchOptions: RequestInit = {}): Promise<any> => {
	const url = `${instance.baseUrl}${path}`;

	const baseHeaders: Headers = new Headers({
		"x-app-name": "NEO Pocket",
		"x-app": "mobile",
		"x-app-version": "1.14.0.1140025",
		"Authorization": "Basic YXBwLWU="
	});

	const fetcher = await fetch(url, {
		...fetchOptions,
		headers: {
			...baseHeaders,
			...fetchOptions.headers
		},
	});
	if (!fetcher.ok) {
		throw new Error(`Error fetching ${url}: ${fetcher.statusText}`);
	}
	return await fetcher.json();
}

export default NeoFetcher;