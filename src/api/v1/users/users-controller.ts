// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import * as httpStatus from 'http-status';
import { getUserDTO } from './users-dtos';
import { FindUserById } from '../../../database/users/user-functions';
import { INTERNAL_SERVER_ERROR } from '../../../constants/error-constants';

const me = async (req: Request, res: Response): Promise<any> => {
    const userId = res.locals.jwtPayload.sub;

    try {
        const user = await FindUserById(userId);

        return res.status(httpStatus.OK).send(getUserDTO(user));
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            message: INTERNAL_SERVER_ERROR,
        });
    }
};

export default me;
