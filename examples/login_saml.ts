import * as dotenv from "dotenv";
import {NeoClient} from "~/structures/Client";
import * as process from "node:process";

void async function main () {
	// Load environment variables from .env file
	dotenv.config({quiet: true});

	// Validate required environment variables
	if (!process.env.NEO_URL)
		throw new Error("NEO_URL environment variable is not set.");
	if (!process.env.NEO_SAML_ASSERTION)
		throw new Error("NEO_SAML_ASSERTION environment variable is not set.");

	const instance = new NeoClient(process.env.NEO_URL);

	// Perform SAML login using the provided assertion
	const token = await instance.loginSAML(process.env.NEO_SAML_ASSERTION);

	console.log("SAML Login Successful:", token);
	process.exit(0);
}();