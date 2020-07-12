import pick from 'lodash.pick';
// eslint-disable-next-line no-unused-vars
import UserModel from '../../../database/users/user-model';

export interface UserDTO {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

export const getUserDTO = (user: UserModel): UserDTO => pick(user, ['id', 'firstName', 'lastName', 'email', 'role']);
