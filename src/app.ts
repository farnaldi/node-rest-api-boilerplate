import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import * as compression from 'compression';

import { ALLOWED_ORIGINS } from './config/env';

import routerV1 from './api/v1';
import { healthCheck, notFoundDefault } from './helpers/response-helper';

const corsOptions = {
    origin: (origin, callback) => {
        if (ALLOWED_ORIGINS.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    allowedHeaders: ['Save-Data', 'Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept'],
};

const initApp = (): express.Application => {
    const app = express();

    // middlewares
    app.use(cors(corsOptions));

    if (process.env.NODE_ENV === 'production') {
        app.use(
            morgan('combined', {
                // log only errors
                skip: (req, res) => {
                    return res.statusCode < 400;
                },
            }),
        );
    } else {
        app.use(morgan('dev'));
    }

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(compression());
    app.use(helmet());

    // health-check
    app.get('/', healthCheck);

    app.use('/v1', routerV1);

    app.use(notFoundDefault);

    return app;
};

export default initApp;
