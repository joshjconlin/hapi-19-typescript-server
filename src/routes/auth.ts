import * as Hapi from '@hapi/hapi';
import Joi from 'joi';
import AuthController from '../controllers/AuthController';

export default function getRoutes(server: Hapi.Server): void {
    server.route({
        method: 'POST',
        path: '/authenticate',
        options: {
            auth: false,
            validate: {
                payload: {
                    username: Joi.string().required(),
                    password: Joi.string().required(),
                },
                failAction: (request, h, error) => {
                    return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
                },
            },
        },
        handler: AuthController.authenticate,
    });
}
