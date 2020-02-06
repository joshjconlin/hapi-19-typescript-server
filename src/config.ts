export const options = {
    ops: {
        interval: 1000,
    },
    reporters: {
        console: [
            {
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [
                    {
                        log: '*',
                        response: '*',
                    },
                ],
            },
            {
                module: 'good-console',
            },
            'stdout',
        ],
        file: [
            {
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [
                    {
                        log: '*',
                        response: '*',
                    },
                ],
            },
            {
                module: 'good-squeeze',
                name: 'SafeJson',
            },
            {
                module: 'good-file',
                args: ['./logs/server_log'],
            },
        ],
    }
};
