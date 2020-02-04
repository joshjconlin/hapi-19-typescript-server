export interface User {
    _id: string;
    email: string;
    password?: string;
    username: string;
    admin: boolean;
    firstName: string;
    lastName: string;
}
