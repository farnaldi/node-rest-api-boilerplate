// eslint-disable-next-line no-unused-vars
import UserModel from '../../../database/users/user-model';

export interface UserDTO {
    Id: number;

    FirstName: string;

    LastName: string;

    Email: string;

    Role: string;
}

export const getUserDTO = (user: UserModel): UserDTO => {
    return {
        Id: user.Id,
        FirstName: user.FirstName,
        LastName: user.LastName,
        Email: user.Email,
        Role: user.Role,
    };
};
