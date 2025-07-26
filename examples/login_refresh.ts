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

	// Perform SAML login using the provided assertion
	const token = await instance.auth.refreshToken(process.env.NEO_REFRESH_TOKEN);

	console.log("Refresh Successful:", token);

	// Fetch user info
	const userInfo = await instance.auth.getUserInfo();
	console.log("User Info:", userInfo);

	// Request a temporary login URL
	const logged = await instance.auth.getTemporaryLoginURL();
	console.log("Temporary Logged URL:", logged);

	process.exit(0);
}();