import * as Hapi from '@hapi/hapi';
import bcrypt from 'bcryptjs';
import { User } from 'models/user';
import UserModel from '../models/users/user';
import { token } from 'auth/auth';
import TokenImpl from '../auth/token';
import { Login } from 'responses/responses';

class AuthController {
    private validateUser = async (username: string, password: string): Promise<User | never> => {
        return new Promise((resolve, reject) => {
            UserModel.findOne(
                {
                    $or: [{ username: username }],
                },
                (err, $user) => {
                    if (err || !$user) {
                        reject(err ? err : 'Invalid Credentials');
                    } else {
                        bcrypt.compare(password, $user.password, (err, isValid) => {
                            if (isValid) {
                                delete $user.password;
                                resolve($user);
                            } else {
                                reject('Invalid Credentials');
                            }
                        });
                    }
                },
            );
        });
    };

    public authenticate = async (request, h): Promise<Hapi.ServerResponse> => {
        const { username, password } = request.payload;
        try {
            const user: User = await this.validateUser(username, password);
            const authToken: token = TokenImpl.create(user);

            const response: Login = {
                // eslint-disable-next-line @typescript-eslint/camelcase
                auth_token: authToken,
                user,
            };

            return h.response(response).takeover();
        } catch (error) {
            return h
                .response({ status: 'error', error: error.message })
                .code(401)
                .takeover();
        }
    }
}

export default new AuthController();
