interface NeoInstance {
	baseUrl: string;
}

enum NeoPublicInstanceURLs {
	Neo = "https://neoconnect.edifice.io",
	ENT16 = "https://mon-ent16.lacharente.fr",
	Colibri = "https://colibri.ac-martinique.fr",
	ENT04 = "https://ent04.fr",
	LEIA = "https://ent.leia.corsica",
	EduProvance = "https://www.eduprovence.fr",
	ENTHDF = "https://enthdf.fr", // This ENT probably doesn't work, there are a different SAML endpoint
	ENTHautesAlpes = "https://ent.colleges05.fr",
	ENTMayotte = "https://mayotte.edifice.io",
	MonCollege = "https://www.moncollege-ent.essonne.fr",
	Natirua = "https://nati.pf",
	ProvinceSud = "https://www.province-sud.nc",
	eCollege78 = "https://ent.ecollege78.fr",
	ENTVar = "https://moncollege-ent.var.fr/",
	Wilapa = "https://wilapa-guyane.com",
	FormationNeo = "https://formationneo.edifice.io",
}

export type { NeoInstance, NeoPublicInstanceURLs };