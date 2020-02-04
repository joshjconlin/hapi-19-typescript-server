import {token as jsonToken} from 'auth/auth';
import {User} from 'models/user';
import jwt from 'jsonwebtoken';

const secret = // todo: factor out somewhere
    'HaFwVcntGquwlJkFY5VU4kan0TKkT2mnBTJ381drEyoiShvBQKh4VJbbc+y8Oezv20QdLHGJBC3LLDvjPKu4rwa6Zv9FPrsqRQh/j+Z0G/8GyollQjZGUAJJoLb2FfAdBpuGM+AxWh54iQJos4+t49mO8BGh5CmnMEK+9QYIkiG84BQEiQ+uviQFHoPQ57P/vO6CW25Xu2JCBR2DIp4Z7wcXe8yPU0RPz9WH6sEiQdnShMg4glWSq5oiuWIWsCrZwxIC263Mz6Cs89h79RIC5J0lQFYGTdkOGHNe9NORihDvRrraReCohIBxVonVLQqxH/wtgGyIKyWZgHufNidofA=='; //todo: factor out

class TokenImpl {
    public static create(user: User): jsonToken {
        let scopes;
        // Check if the user object passed in
        // has admin set to true, and if so, set
        // scopes to admin
        if (user.admin) {
            scopes = 'admin';
        }
        // Sign the JWT
        return jwt.sign({ id: user._id, username: user.username, scope: scopes }, secret, {
            algorithm: 'HS256',
            expiresIn: '1h',
        });
    }
}

export default TokenImpl;
