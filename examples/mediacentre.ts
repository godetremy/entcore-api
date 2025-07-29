import * as dotenv from "dotenv";
import process from "node:process";
import {NeoClient} from "../src";
import {NeoMediacentreSource} from "../src/types/mediacentre";

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

	// List all sources from GAR
	console.log("\nFetching all sources from GAR...");
	const sources = await instance.mediacentre.getResourcesFromSource(NeoMediacentreSource.GAR);
	sources.forEach((source) => {
		console.log(`===== ${source.source} =====`);
		source.resources.forEach((resource) => {
			console.log(`- ${resource.title} (${resource.link})`);
		});
	});

	// Search in mediacentre
	console.log("\nSearching in GAR...");
	const searchResults = await instance.mediacentre.searchFromSource(NeoMediacentreSource.GAR, "pix");
	searchResults.forEach((sourcesResult) => {
		console.log(`===== ${sourcesResult.source} =====`);
		sourcesResult.resources.forEach((resource) => {
			console.log(`- ${resource.title} (${resource.id})`);
		});
	})

	process.exit(0);
}();