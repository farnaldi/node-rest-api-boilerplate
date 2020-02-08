// eslint-disable-next-line no-unused-vars
import { Response, Request } from 'express';
import * as httpStatus from 'http-status';
// eslint-disable-next-line no-unused-vars
import { ErrorDetail } from '../types/error-types';
import { UNAUTHORIZED_ERROR, NOT_FOUND_ERROR, INTERNAL_SERVER_ERROR } from '../constants/error-constants';
import logError from '../handlers/log-handler';
import * as pjson from '../../package.json';

export const badRequest = (res: Response, errors: ErrorDetail[]) =>
    res.status(httpStatus.BAD_REQUEST).json({ error: true, errors });

export const unauthorized = (res: Response) =>
    res.status(httpStatus.UNAUTHORIZED).json({ error: true, message: UNAUTHORIZED_ERROR });

export const notFound = (res: Response, message: string = NOT_FOUND_ERROR) =>
    res.status(httpStatus.NOT_FOUND).json({ error: true, message });

export const internalError = (res: Response, error: Error) => {
    logError(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: true, message: INTERNAL_SERVER_ERROR });
};

export const unprocessableEntity = (res: Response, errors: ErrorDetail[]) =>
    res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: true, errors });

export const ok = (res: Response, data: any) => res.status(httpStatus.OK).json(data);

export const created = (res: Response, data: any) => res.status(httpStatus.CREATED).json(data);

export const healthCheck = (req: Request, res: Response): any =>
    res.status(httpStatus.OK).send({ success: true, version: pjson.version });

export const notFoundDefault = (req: Request, res: Response): any =>
    res.status(httpStatus.NOT_FOUND).json({
        error: true,
        message: NOT_FOUND_ERROR,
    });
