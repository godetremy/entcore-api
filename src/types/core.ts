interface NeoCoreAction {
    name: string;
    displayName: string;
    type: string;
}

interface NeoCoreApplication {
    name: string;
    address: string;
    icon: string;
    target: string;
    displayName: string;
    display: boolean;
    prefix: string;
}


interface NeoCoreWidget {
    id: string;
    name: string;
    path: string;
    js: string;
    i18n: string;
    application: string;
    mandatory: boolean;
}

interface NeoCoreFunction {
    code: string;
    functioName?: string;
    scope: string[];
    structureExternalIds?: string[];
    subjects?: Map<string, NeoCoreSubject>;
}

interface NeoCoreSubject {
    subjectCode: string;
    subjectName: string;
    scope: string[];
    structureExternalIds: string[];
}

interface NeoCoreSessionMetatdata {
    nameID: string;
    SessionIndex: string;
    _id: string;
    userId: string;
}

interface NeoCoreSession {
    apps: NeoCoreApplication[];
    authorizedActions: NeoCoreAction[];
    birthDate: string;
    childrenIds: string[];
    classNames: string[];
    classes: string[];
    deletePending: boolean;
    email?: string;
    externalId: string;
    federated: boolean;
    federatedlDP?: string;
    firstName: string;
    forceChangePassword?: boolean;
    functions: NeoCoreFunction[];
    groupsIds: string[];
    hasApp: boolean;
    hasPw: boolean;
    ignoreMFA?: boolean;
    lastName: string;
    level: string;
    login: string;
    mobile?: any; // Can't find the type for this field
    needRevalidateTerms: boolean;
    optionEnabled: any[]; // Can't find the type for this field
    sessionMetadata: NeoCoreSessionMetatdata;
    structureNames: string[];
    structures: string[];
    type: string;
    uai: string;
    userId: string;
    username: string;
    widgets: NeoCoreWidget[];
}

export type {
    NeoCoreAction,
    NeoCoreApplication,
    NeoCoreWidget,
    NeoCoreFunction,
    NeoCoreSubject,
    NeoCoreSessionMetatdata,
    NeoCoreSession
}