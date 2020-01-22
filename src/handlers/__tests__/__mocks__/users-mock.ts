// eslint-disable-next-line no-unused-vars
import { UserModel } from '../../../database/users/user-model';

const usersMock: Partial<UserModel>[] = [
    {
        Id: 1,
        FirstName: 'FirstNameMock',
        LastName: 'LastNameMock',
        Email: 'fake@email.com',
        Role: 'mock',
        Password: 'hashedPassword',
    },
];

export default usersMock;
