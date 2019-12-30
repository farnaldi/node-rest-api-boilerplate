import * as httpStatus from 'http-status';
// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import * as pjson from '../../package.json';

export const notFound = (req: Request, res: Response): any => {
    res.status(httpStatus.NOT_FOUND).send({
        success: false,
        message: 'Requested Resource Not Found',
    });
};

export const healthCheck = (req: Request, res: Response): any => {
    return res.status(httpStatus.OK).send({
        success: true,
        version: pjson.version,
    });
};
