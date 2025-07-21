enum NeoScope {
	Auth = 'auth',
	UserInfo = 'userinfo',
	Timeline = 'timeline',
	UserBook = 'userbook',
	Audience = 'audience',
	Explorer = 'explorer',
	Blog = 'blog',
	CollaborativeWall = 'collaborativewall',
	CAS = 'cas',
	LVS = 'lvs',
	Conversation = 'conversation',
	Formulaire = 'formulaire',
	Homeworks = 'homeworks',
	Mediacentre = 'mediacentre',
	Actualites = 'actualites',
	Pronote = 'pronote',
	SchoolBook = 'schoolbook',
	Scrapbook = 'scrapbook',
	Edt = 'edt',
	VieScolaire = 'viescolaire',
	Diary = 'diary',
	Presences = 'presences',
	Wiki = 'wiki',
	Workspace = 'workspace',
	Infra = 'infra',
	Directory = 'directory',
	Portal = 'portal',
	SSO = 'sso',
	Zimbra = 'zimbra',
	Incidents = 'incidents',
	Competences = 'competences',
	Support = 'support',
}

interface NeoAuthCredentials {
	/** Type of the token, usually "Bearer" */
	token_type?: string;
	/** Bearer token */
	access_token?: string;
	/** Refresh token to get a new access token */
	refresh_token?: string;
	/** Date until the access token expires */
	expires_at: number;
	/** Scopes granted to the access token */
	scope: Array<NeoScope>;
}

export type { NeoAuthCredentials };
export { NeoScope };