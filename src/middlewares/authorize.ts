// eslint-disable-next-line no-unused-vars
import { NextFunction, Request, Response } from 'express';
import { verifyAndDecodeToken } from '../helpers/jwt-helper';
import { UNAUTHORIZED } from '../constants/error-constants';

import httpStatus = require('http-status');

const authorizeCustomer = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    if (!req.headers.authorization || !req.headers.authorization.includes('Bearer')) {
        return res.status(httpStatus.UNAUTHORIZED).send({ message: UNAUTHORIZED });
    }

    const [, token] = req.headers.authorization.split(' ');

    try {
        const decoded = verifyAndDecodeToken(token);
        res.locals.jwtPayload = decoded;

        return next();
    } catch (err) {
        return res.status(httpStatus.UNAUTHORIZED).send({ message: UNAUTHORIZED });
    }
};

export default authorizeCustomer;
