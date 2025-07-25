import * as dotenv from "dotenv";
import {NeoClient} from "~/structures/Client";
import * as process from "node:process";
import {NeoConversationSystemFolder} from "../src/types/conversation";

void async function main () {
	// Load environment variables from .env file
	dotenv.config({quiet: true});

	// Validate required environment variables
	if (!process.env.NEO_URL)
		throw new Error("NEO_URL environment variable is not set.");
	if (!process.env.NEO_REFRESH_TOKEN)
		throw new Error("NEO_REFRESH_TOKEN environment variable is not set.");

	const instance = new NeoClient(process.env.NEO_URL);

	// Perform Login
	await instance.auth.refreshToken(process.env.NEO_REFRESH_TOKEN);
	console.log("Auth Successful !");

	// List User Folders
	const folders = await instance.conversation.getUserFolders();
	console.log("User Folders:");
	folders.forEach(folder => {
		console.log(`(${folder.nbMessages}) ${folder.name}`);
	});

	// List Messages in inbox
	const messages = await instance.conversation.listFolder(NeoConversationSystemFolder.INBOX, {page_size: 5});
	console.log("\nInbox Messages:");
	messages.forEach(message => {
		console.log(`[${message.from?.displayName || "Unknown"}] ${message.subject}`);
	});

	// Create a draft message
	console.log("\nCreating a draft message...");
	const draft = await instance.conversation.createDraft({
		subject: "[ENTCORE-API] Test Draft",
		to: ["unknown"],
		body: "Currently, this draft as not been updated.",
	});
	console.log(`Draft created with ID: ${draft.id}`);

	// Update the draft message
	console.log("\nUpdating the draft message...");
	await instance.conversation.updateDraft(draft.id, {
		to: ["unknown"],
		body: "This draft has been updated.",
	});
	console.log("Draft updated successfully.");

	process.exit(0);
}();