/* eslint-disable no-undef */
import * as sinon from 'sinon';
import { validateNewUser } from '../users-handler';
import * as usersFunctions from '../../database/users/user-functions';
import usersMock from './__mocks__/users-mock';
import parseError from '../../helpers/error-helper';
import { EMAIL_IN_USE } from '../../constants/error-constants';
// eslint-disable-next-line no-unused-vars
import UserModel from '../../database/users/user-model';

describe('userHandler', () => {
    describe('validateNewUser', () => {
        it('should throw an error when the email is in use', async () => {
            const usersFunctionsStub = sinon.stub(usersFunctions, 'findUserByEmail').callsFake(() => usersMock[0]);

            const user: Partial<UserModel> = {
                FirstName: 'fakeName',
                LastName: 'fakeLastName',
                Email: 'fake@email.com',
                Role: 'Customer',
            };

            const validationResult = await validateNewUser(user);

            expect(validationResult).toEqual([parseError('email', EMAIL_IN_USE)]);

            usersFunctionsStub.restore();
        });
    });

    it('should return an an empty array when the email is not in use', async () => {
        const usersFunctionsStub = sinon.stub(usersFunctions, 'findUserByEmail').callsFake(() => undefined);
        const user: Partial<UserModel> = {
            FirstName: 'fakeName',
            LastName: 'fakeLastName',
            Email: 'fake@email.com',
            Role: 'Customer',
        };

        const validationResult = await validateNewUser(user);

        expect(validationResult).toEqual([]);

        usersFunctionsStub.restore();
    });
});
