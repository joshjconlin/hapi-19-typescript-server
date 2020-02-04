import * as Hapi from '@hapi/hapi';
import getRoutes from './routes';
import Mongoose from 'mongoose';
import validate from './auth/validation';

const HOST = process.env.host || 'localhost';
const PORT = process.env.port || 5000;
const DATABASE = process.env.database || 'mongodb://localhost:27017/dev_api'; // todo: dockerize

Mongoose.connect(DATABASE, {useNewUrlParser: true, useUnifiedTopology: true});

const server: Hapi.Server = new Hapi.Server({host: HOST, port: PORT});

async function start(): Promise<void> {
    try {
        await server.register([require('hapi-auth-jwt2')]);
        server.auth.strategy('jwt', 'jwt', {
            key: // todo: hide this somehow, is in one other place
                'HaFwVcntGquwlJkFY5VU4kan0TKkT2mnBTJ381drEyoiShvBQKh4VJbbc+y8Oezv20QdLHGJBC3LLDvjPKu4rwa6Zv9FPrsqRQh/j+Z0G/8GyollQjZGUAJJoLb2FfAdBpuGM+AxWh54iQJos4+t49mO8BGh5CmnMEK+9QYIkiG84BQEiQ+uviQFHoPQ57P/vO6CW25Xu2JCBR2DIp4Z7wcXe8yPU0RPz9WH6sEiQdnShMg4glWSq5oiuWIWsCrZwxIC263Mz6Cs89h79RIC5J0lQFYGTdkOGHNe9NORihDvRrraReCohIBxVonVLQqxH/wtgGyIKyWZgHufNidofA==', // Never Share your secret key todo: change
            validate, // validate function defined above
        });

        server.auth.default('jwt');

        getRoutes(server);

        await server.start();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
    console.log(`Server running @ ${server.info.uri}`);
}

start();
