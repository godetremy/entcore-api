import * as dotenv from "dotenv";
import {NeoClient} from "~/structures/Client";
import * as process from "node:process";

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


	process.exit(0);
}();