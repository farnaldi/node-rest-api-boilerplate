// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import * as httpStatus from 'http-status';
import { validateUpdate } from '../../../handlers/users-handler';
import { getUserDTO } from '../dtos/users-dtos';
import { findUserById, updateUser } from '../../../database/users/user-functions';
import { INTERNAL_SERVER_ERROR } from '../../../constants/error-constants';
import UserModel from '../../../database/users/user-model';
import * as cryptoHelper from '../../../helpers/crypto-helper';
import logError from '../../../handlers/log-handler';

export const me = async (req: Request, res: Response): Promise<any> => {
    const userId = res.locals.jwtPayload.sub;

    try {
        const user = await findUserById(userId);

        return res.status(httpStatus.OK).send(getUserDTO(user));
    } catch (e) {
        logError(e);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            message: INTERNAL_SERVER_ERROR,
        });
    }
};

export const update = async (req: Request, res: Response): Promise<any> => {
    const userId = Number(req.params.id);

    try {
        const errors = await validateUpdate(userId);

        if (errors.length > 0) {
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).send({ errors });
        }

        let user: UserModel = UserModel.fromJson(req.body);

        if (user.password) {
            user.password = await cryptoHelper.hash(user.password);
        }

        user = await updateUser(userId, user);

        return res.status(httpStatus.OK).send(getUserDTO(user));
    } catch (e) {
        logError(e);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            message: INTERNAL_SERVER_ERROR,
        });
    }
};
