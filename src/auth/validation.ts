import { Auth } from 'auth/auth';
import {User} from "models/user";
import UserRepository from '../repositories/UserRepository';

const validate = async function(decoded, request, h): Promise<Auth> {
    try {
        const user: User = await UserRepository.getById(decoded.id);
        return {
            isValid: true,
            credentials: {
                scope: user.admin ? 'admin' : '',
                userId: user._id,
            },
        };
    } catch (error) {
        return { credentials: { scope: '', userId: '' }, isValid: false };
    }
};

export default validate;
