// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import { created, internalError, unauthorized, ok, unprocessableEntity } from '../../../helpers/response-helper';

import { findUserByEmail, addUser } from '../../../database/users/user-functions';

import * as cryptoHelper from '../../../helpers/crypto-helper';
// eslint-disable-next-line no-unused-vars
import { JwtPayload } from '../../../types/jwt-types';
// eslint-disable-next-line no-unused-vars
import UserModel from '../../../database/users/user-model';
import { createToken } from '../../../helpers/jwt-helper';

import { validateNewUser } from '../../../handlers/users-handler';
import roles from '../../../constants/roles-contants';
import { getUserDTO } from '../dtos/users-dtos';

export const login = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;

    try {
        let matchPasswords = false;

        const user = await findUserByEmail(email);

        if (user) {
            matchPasswords = await cryptoHelper.compare(password, user.password);
        }

        if (!user || !matchPasswords) {
            return unauthorized(res);
        }

        const tokenPayload: JwtPayload = {
            sub: user.id,
            name: user.firstName,
            email: user.email,
            role: user.role,
        };

        const token = createToken(tokenPayload);

        return ok(res, { token });
    } catch (e) {
        return internalError(res, e);
    }
};

export const register = async (req: Request, res: Response): Promise<any> => {
    try {
        const { password } = req.body;

        const user: UserModel = UserModel.fromJson(req.body);

        const errors = await validateNewUser(user);

        if (errors.length > 0) {
            return unprocessableEntity(res, errors);
        }

        user.password = await cryptoHelper.hash(password);
        user.role = roles.Customer;

        const userCreated = getUserDTO(await addUser(user));

        return created(res, userCreated);
    } catch (e) {
        return internalError(res, e);
    }
};
