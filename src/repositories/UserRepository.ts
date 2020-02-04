import {User} from 'models/user';
import bcrypt from 'bcryptjs';
import UserModel from '../models/users/user';

class UserRepository {
    private async hashPassword(password): Promise<string> {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(hash);
                    }
                });
            });
        });
    }

    public async create(user: User): Promise<User> {
        const password: string = await this.hashPassword(user.password);
        // todo: username unique validation
        const $user = new UserModel({
            ...user,
            password,
            admin: false,
        });
        return $user.save();
    }

    public async getById(userId: string): Promise<User> {
        return new Promise((resolve, reject) => {
            UserModel.find({_id: userId}, (error: Error, users: User[]) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(users[0]);
                }
            });
        });
    }
}

export default new UserRepository();
