// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import { validateUpdate } from '../../../handlers/users-handler';
import { getUserDTO } from '../dtos/users-dtos';
import { findUserById, updateUser } from '../../../database/users/user-functions';
import UserModel from '../../../database/users/user-model';
import * as cryptoHelper from '../../../helpers/crypto-helper';
import { internalError, unprocessableEntity, ok } from '../../../helpers/response-helper';

export const me = async (req: Request, res: Response): Promise<any> => {
    const userId = res.locals.jwtPayload.sub;

    try {
        const user = await findUserById(userId);

        return ok(res, getUserDTO(user));
    } catch (e) {
        return internalError(res, e);
    }
};

export const update = async (req: Request, res: Response): Promise<any> => {
    const userId = Number(req.params.id);

    try {
        const errors = await validateUpdate(userId);

        if (errors.length > 0) {
            return unprocessableEntity(res, errors);
        }

        let user: UserModel = UserModel.fromJson(req.body);

        if (user.password) {
            user.password = await cryptoHelper.hash(user.password);
        }

        user = await updateUser(userId, user);

        return ok(res, getUserDTO(user));
    } catch (e) {
        return internalError(res, e);
    }
};
