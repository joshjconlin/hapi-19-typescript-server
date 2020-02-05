import * as Hapi from '@hapi/hapi';
import Joi from 'joi';
import AuthController from '../controllers/AuthController';
import {failAction} from "./util";

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
                failAction,
            },
        },
        handler: AuthController.authenticate,
    });
}
