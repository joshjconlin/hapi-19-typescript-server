import {User} from 'models/user';

export interface Login {
    auth_token: string;
    user: User;
}
