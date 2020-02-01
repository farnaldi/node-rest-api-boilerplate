// eslint-disable-next-line no-unused-vars
import UserModel from '../../../database/users/user-model';

export interface UserDTO {
    id: number;

    firstName: string;

    lastName: string;

    email: string;

    role: string;
}

export const getUserDTO = (user: UserModel): UserDTO => {
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
    };
};
