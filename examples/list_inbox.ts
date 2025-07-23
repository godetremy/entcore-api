import * as dotenv from "dotenv";
import {NeoClient} from "~/structures/Client";
import * as process from "node:process";
import {NeoConversationSystemFolder} from "~/types/conversation";

void async function main () {
	// Load environment variables from .env file
	dotenv.config({quiet: true});

	// Validate required environment variables
	if (!process.env.NEO_URL)
		throw new Error("NEO_URL environment variable is not set.");
	if (!process.env.NEO_REFRESH_TOKEN)
		throw new Error("NEO_REFRESH_TOKEN environment variable is not set.");

	const instance = new NeoClient(process.env.NEO_URL);

	// Perform SAML login using the provided assertion
	await instance.refreshToken(process.env.NEO_REFRESH_TOKEN);

	console.log("Auth Successful !");

	const inbox = await instance.conversation.listFolder(NeoConversationSystemFolder.INBOX, {page: 0})
	inbox.forEach(message => {

		const to_content = message.to.map(id => {
			const info = message.displayNames.find(name => name[0] === id)
			if (!info)
				return id;
			return info[1];
		});
		console.log(`✉️ ${to_content} - ${message.subject}`);
	});
	process.exit(0);
}();