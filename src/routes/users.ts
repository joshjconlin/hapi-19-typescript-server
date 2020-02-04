import * as Hapi from '@hapi/hapi';
import Joi from 'joi';
import UserController from '../controllers/UserController';

export default function getRoutes(server: Hapi.Server): void {
    server.route({
        method: 'GET',
        path: '/user/{userId}',
        options: {
            auth: 'jwt',
            validate: {
                params: {
                    userId: Joi.string().required(),
                },
                failAction: (request, h, error) => { // todo: factor out
                    return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
                },
            },
        },
        handler: UserController.get,
    });

    server.route({
        method: 'POST',
        path: '/user',
        options: {
            auth: false,
            validate: {
                payload: {
                    username: Joi.string().required(),
                    firstName: Joi.string().required(),
                    lastName: Joi.string().required(),
                    email: Joi.string().required(),
                    password: Joi.string().required(),
                },
                failAction: (request, h, error) => {
                    return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
                },
            },
        },
        handler: UserController.create,
    });
}
