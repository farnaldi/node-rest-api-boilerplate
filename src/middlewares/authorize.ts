// eslint-disable-next-line no-unused-vars
import { NextFunction, Request, Response } from 'express';
import { verifyAndDecodeToken } from '../helpers/jwt-helper';
import { unauthorized } from '../helpers/response-helper';

const authorizeCustomer = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    if (!req.headers.authorization || !req.headers.authorization.includes('Bearer')) {
        return unauthorized(res);
    }

    const [, token] = req.headers.authorization.split(' ');

    try {
        const decoded = verifyAndDecodeToken(token);
        res.locals.jwtPayload = decoded;

        return next();
    } catch (err) {
        return unauthorized(res);
    }
};

export default authorizeCustomer;
