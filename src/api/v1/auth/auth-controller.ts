// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import * as httpStatus from 'http-status';
import { UNAUTHORIZED, INTERNAL_SERVER_ERROR } from '../../../constants/error-constants';
import { findUserByEmail, addUser } from '../../../database/users/user-functions';

import * as cryptoHelper from '../../../helpers/crypto-helper';
// eslint-disable-next-line no-unused-vars
import { JwtPayload } from '../../../types/jwt-types';
// eslint-disable-next-line no-unused-vars
import UserModel from '../../../database/users/user-model';
import logError from '../../../handlers/log-handler';
import { createToken } from '../../../helpers/jwt-helper';

import { validateNewUser } from '../../../handlers/users-handler';
import roles from '../../../constants/roles-contants';

export const login = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;

    try {
        let matchPasswords = false;

        const user = await findUserByEmail(email);

        if (user) {
            matchPasswords = await cryptoHelper.compare(password, user.password);
        }

        if (!user || !matchPasswords) {
            return res.status(httpStatus.UNAUTHORIZED).send({ message: UNAUTHORIZED });
        }

        const tokenPayload: JwtPayload = {
            sub: user.id,
            name: user.firstName,
            email: user.email,
            role: user.role,
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
    try {
        const { password } = req.body;

        const user: UserModel = UserModel.fromJson(req.body);

        const errors = await validateNewUser(user);

        if (errors.length > 0) {
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).send({ errors });
        }

        user.password = await cryptoHelper.hash(password);
        user.role = roles.Customer;

        await addUser(user);

        return res.status(httpStatus.CREATED).send();
    } catch (e) {
        logError(e);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            message: INTERNAL_SERVER_ERROR,
        });
    }
};
