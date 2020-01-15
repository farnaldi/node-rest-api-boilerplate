import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env';
import jwtOptions from '../config/jwt-options';
// eslint-disable-next-line no-unused-vars
import { JwtPayload } from '../types/jwt-types';

export const createToken = (payload: JwtPayload): string => {
    return jwt.sign(payload, JWT_SECRET, jwtOptions);
};

export const verifyAndDecodeToken = (token: string): JwtPayload => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET, { issuer: jwtOptions.issuer });
        return decoded;
    } catch (e) {
        throw new Error('Invalid token');
    }
};
