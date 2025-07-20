import {InitNeoInstance} from "~/api/instance";
import * as dotenv from "dotenv";
import {loginSAML, NeoLoginResponse} from "../src";

void async function main () {
	// Load environment variables from .env file
	dotenv.config();

	// Validate required environment variables
	if (!process.env.NEO_URL)
		throw new Error("NEO_URL environment variable is not set.");
	if (!process.env.NEO_SAML_ASSERTION)
		throw new Error("NEO_SAML_ASSERTION environment variable is not set.");

	// Initialize Neo instance with the base URL
	const instance = InitNeoInstance(process.env.NEO_URL);

	// Start the login process using SAML assertion
	const token: NeoLoginResponse = await loginSAML(instance, process.env.NEO_SAML_ASSERTION);

	console.log("Login successful! Token details:");
	console.log(`Token Type: ${token.token_type}`);
	console.log(`Access Token: ${token.access_token}`);
	console.log(`Refresh Token: ${token.refresh_token}`);
	console.log(`Expires In: ${token.expires_in} seconds`);
	console.log(`Scopes: ${token.scope.join(", ")}`);
}();