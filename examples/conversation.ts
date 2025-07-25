import * as dotenv from "dotenv";
import {NeoClient} from "~/structures/Client";
import * as process from "node:process";
import {NeoConversationSystemFolder} from "../src/types/conversation";
import {readFile} from "node:fs/promises";

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
	console.log("Logging in with refresh token...");
	await instance.auth.refreshToken(process.env.NEO_REFRESH_TOKEN);
	console.log("Logged in Successful !");

	// Fetch user info
	console.log("\nFetching user info...");
	const userInfo = await instance.auth.getUserInfo();
	console.log("Hello, " + userInfo.username + "!");

	// List User Folders
	const folders = await instance.conversation.getUserFolders();
	console.log("\nUser Folders:");
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
		to: [userInfo.userId],
		body: "Currently, this draft as not been updated.",
	});
	console.log(`Draft created with ID: ${draft.id}`);

	// Update the draft message
	console.log("\nUpdating the draft message...");
	await instance.conversation.updateDraft(draft.id, {
		to: [userInfo.userId],
		body: "This draft has been updated.",
	});
	console.log("Draft updated successfully.");

	// Send the draft message
	console.log("\nSending the draft message...");
	const sentMessage = await instance.conversation.sendMessage({
		to: [userInfo.userId],
		subject: "[ENTCORE-API] Test Send",
		body: "This draft has been sent.",
	}, draft.id);
	console.log("Draft sent successfully.");

	// Moving the received message to the trash folder
	console.log("\nMoving the sent message to the trash folder...");
	await instance.conversation.moveMessageToTrash(sentMessage.id);
	console.log("Message moved to trash successfully.");

	// Delete the draft message
	console.log("\nDeleting the message from the trash folder...");
	await instance.conversation.deleteMessage(sentMessage.id);
	console.log("Message deleted successfully.");

	// Create a new draft message
	console.log("\nCreating a new draft message...");
	const newDraft = await instance.conversation.createDraft({
		subject: "[ENTCORE-API] Test Draft Attachment",
		to: [userInfo.userId],
		body: "This is draft will be sent with an attachment.",
	});
	console.log("Draft created successfully.");

	// Upload an attachment to the draft
	console.log("\nAdd an attachment to the draft message...");
	// Read the file .upload_file
	const fs = require("node:fs");
	const filePath = "./examples/.upload_file"; // Path to the file you want to upload
	if (!fs.existsSync(filePath)) throw new Error(`File not found: ${filePath}`);
	const buffer = await readFile(filePath);
	const blob = new Blob([buffer], { type: 'application/octet-stream' });
	const attachment = await instance.conversation.addAttachmentToDraft(newDraft.id, blob, "upload_file.txt");
	console.log("Attachment added successfully with ID:", attachment.id);

	// Move the draft message to the trash folder
	console.log("\nMoving the draft message to the trash folder...");
	await instance.conversation.moveMessageToTrash(newDraft.id);
	console.log("Draft message moved to trash successfully.");

	// Check the trash folder
	console.log("\nChecking the trash folder...");
	const trashMessages = await instance.conversation.listFolder(NeoConversationSystemFolder.TRASH);
	console.log("Trash Messages:");
	trashMessages.forEach(message => {
		console.log(`[${message.from?.displayName || "Unknown"}] ${message.subject}`);
	});

	// Empty the trash folder
	if (trashMessages.length == 1) {
		console.log("\nEmptying the trash folder...");
		await instance.conversation.emptyTrash();
		console.log("Trash folder emptied successfully.");
	} else {
		console.log("\n[WARNING] There are multiple messages in the trash folder, skipping emptying to avoid error.");
	}
	process.exit(0);
}();