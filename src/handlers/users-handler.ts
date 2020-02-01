import { USER_NOT_EXISTS, EMAIL_IN_USE, INVALID_DATA_TYPE } from '../constants/error-constants';
// eslint-disable-next-line no-unused-vars
import { ErrorDetail } from '../types/error-types';
// eslint-disable-next-line no-unused-vars
import UserModel from '../database/users/user-model';
import { findUserByEmail, findUserById } from '../database/users/user-functions';
import parseError from '../helpers/error-helper';

// eslint-disable-next-line import/prefer-default-export
export const validateNewUser = async (user: UserModel): Promise<ErrorDetail[]> => {
    const errors: ErrorDetail[] = [];

    const existingUser = await findUserByEmail(user.email);
    if (existingUser) {
        errors.push(parseError('email', EMAIL_IN_USE));
    }

    return errors;
};

export const validateUpdate = async (id: number): Promise<ErrorDetail[]> => {
    const errors: ErrorDetail[] = [];

    if (Number.isNaN(id)) {
        errors.push(parseError('id', INVALID_DATA_TYPE));
        return errors;
    }

    const existingUser = await findUserById(id);
    if (!existingUser) {
        errors.push(parseError('id', USER_NOT_EXISTS));
    }

    return errors;
};
