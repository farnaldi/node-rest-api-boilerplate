// eslint-disable-next-line no-unused-vars
import { ErrorDetail } from '../types/error-types';
// eslint-disable-next-line no-unused-vars
import UserModel from '../database/users/user-model';
import { findUserByEmail } from '../database/users/user-functions';
import parseError from '../helpers/error-helper';
import { EMAIL_IN_USE } from '../constants/error-constants';

// eslint-disable-next-line import/prefer-default-export
export const validateNewUser = async (user: Partial<UserModel>): Promise<ErrorDetail[]> => {
    const errors: ErrorDetail[] = [];

    const existingUser = await findUserByEmail(user.Email);
    if (existingUser) {
        errors.push(parseError('email', EMAIL_IN_USE));
    }

    return errors;
};
