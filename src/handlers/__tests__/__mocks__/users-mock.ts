// eslint-disable-next-line no-unused-vars
import { UserModel } from '../../../database/users/user-model';

const usersMock: UserModel[] = [
    UserModel.fromJson({
        id: 1,
        firstName: 'FirstNameMock',
        lastName: 'LastNameMock',
        email: 'fake@email.com',
        role: 'mock',
        password: 'hashedPassword',
    }),
];

export default usersMock;
