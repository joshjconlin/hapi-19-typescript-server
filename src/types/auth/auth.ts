export interface Auth {
    isValid: boolean;
    credentials: {
        scope: string;
        userId: string;
    };
}

export type token = string;

export interface Credentials {
    scope: string;
    userId: string;
}
