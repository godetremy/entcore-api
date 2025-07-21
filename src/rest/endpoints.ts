export const AUTH_TOKEN = () => "auth/oauth2/token";

export const SSO_PRONOTE = () => "sso/pronote";

export const CAS_OAUTH_LOGIN = (service: string) => `cas/oauth/login?service=${encodeURIComponent(service)}`;