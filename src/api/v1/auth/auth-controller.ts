// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import * as httpStatus from 'http-status';
import { EMAIL_IN_USE, UNAUTHORIZED, INTERNAL_SERVER_ERROR } from '../../../constants/error-constants';
// eslint-disable-next-line no-unused-vars
import { ErrorDetail } from '../../../types/error-types';
import { FindUserByEmail, AddUser } from '../../../database/users/user-functions';

import * as cryptoHelper from '../../../helpers/crypto-helper';
// eslint-disable-next-line no-unused-vars
import { JwtPayload } from '../../../types/jwt-types';
// eslint-disable-next-line no-unused-vars
import UserModel from '../../../database/users/user-model';
import logError from '../../../handlers/log-handler';
import { createToken } from '../../../helpers/jwt-helper';

import parseError from '../../../helpers/error-helper';

export const login = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;

    try {
        let matchPasswords = false;

        const user = await FindUserByEmail(email);

        if (user) {
            matchPasswords = await cryptoHelper.compare(password, user.Password);
        }

        if (!user || !matchPasswords) {
            return res.status(httpStatus.UNAUTHORIZED).send({ message: UNAUTHORIZED });
        }

        const tokenPayload: JwtPayload = {
            sub: user.Id,
            name: user.FirstName,
            email: user.Email,
            role: user.Role,
        };

        const token = createToken(tokenPayload);

        return res.status(httpStatus.OK).send({ token });
    } catch (e) {
        logError(e);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            message: INTERNAL_SERVER_ERROR,
        });
    }
};

export const register = async (req: Request, res: Response): Promise<any> => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const existingUser = await FindUserByEmail(email);

        if (existingUser) {
            const errorsDetail: ErrorDetail[] = [parseError('email', EMAIL_IN_USE)];
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).send({ errorsDetail });
        }
        const hash = await cryptoHelper.hash(password);

        const user: Partial<UserModel> = {
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            Password: hash,
            Role: 'Customer',
        };

        await AddUser(user);

        return res.status(httpStatus.CREATED).send();
    } catch (e) {
        logError(e);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            message: INTERNAL_SERVER_ERROR,
        });
    }
};
