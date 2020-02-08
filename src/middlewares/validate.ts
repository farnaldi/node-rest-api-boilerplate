// eslint-disable-next-line no-unused-vars
import { NextFunction, Request, Response } from 'express';
// eslint-disable-next-line no-unused-vars
import * as Joi from '@hapi/joi';
import { unprocessableEntity } from '../helpers/response-helper';
import parseError from '../helpers/error-helper';

const validateBody = (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        const valid = error == null;

        if (valid) {
            next();
        } else {
            const { details } = error;
            const errorDetails = details.map(i => parseError(i.path[0] as string, i.message));

            unprocessableEntity(res, errorDetails);
        }
    };
};

export default validateBody;
