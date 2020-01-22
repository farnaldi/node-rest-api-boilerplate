// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import * as httpStatus from 'http-status';
import { UNAUTHORIZED, INTERNAL_SERVER_ERROR } from '../../../constants/error-constants';
// eslint-disable-next-line no-unused-vars
import { ErrorDetail } from '../../../types/error-types';
import { findUserByEmail, addUser } from '../../../database/users/user-functions';

import * as cryptoHelper from '../../../helpers/crypto-helper';
// eslint-disable-next-line no-unused-vars
import { JwtPayload } from '../../../types/jwt-types';
// eslint-disable-next-line no-unused-vars
import UserModel from '../../../database/users/user-model';
import logError from '../../../handlers/log-handler';
import { createToken } from '../../../helpers/jwt-helper';

import { validateNewUser } from '../../../handlers/users-handler';

export const login = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;

    try {
        let matchPasswords = false;

        const user = await findUserByEmail(email);

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
        const user: Partial<UserModel> = {
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            Role: 'Customer',
        };

        const errors = await validateNewUser(user);

        if (errors.length > 0) {
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).send({ errors });
        }

        user.Password = await cryptoHelper.hash(password);

        await addUser(user);

        return res.status(httpStatus.CREATED).send();
    } catch (e) {
        logError(e);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            message: INTERNAL_SERVER_ERROR,
        });
    }
};
