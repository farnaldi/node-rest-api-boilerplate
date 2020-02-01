import * as sinon from 'sinon';
import { INVALID_DATA_TYPE, EMAIL_IN_USE, USER_NOT_EXISTS } from '../../constants/error-constants';
/* eslint-disable no-undef */
import { validateNewUser, validateUpdate } from '../users-handler';
import * as usersFunctions from '../../database/users/user-functions';
import usersMock from './__mocks__/users-mock';
import parseError from '../../helpers/error-helper';

// eslint-disable-next-line no-unused-vars
import UserModel from '../../database/users/user-model';

describe('userHandler', () => {
    describe('validateNewUser', () => {
        it('should return an error when the email is in use', async () => {
            const usersFunctionsStub = sinon.stub(usersFunctions, 'findUserByEmail').callsFake(() => usersMock[0]);

            const user: UserModel = UserModel.fromJson({
                firstName: 'fakeName',
                lastName: 'fakeLastName',
                email: 'fake@email.com',
                role: 'Customer',
            });

            const validationResult = await validateNewUser(user);

            expect(validationResult).toEqual([parseError('email', EMAIL_IN_USE)]);

            usersFunctionsStub.restore();
        });

        it('should return an an empty array when the email is not in use', async () => {
            const usersFunctionsStub = sinon.stub(usersFunctions, 'findUserByEmail').callsFake(() => undefined);
            const user: UserModel = UserModel.fromJson({
                firstName: 'fakeName',
                lastName: 'fakeLastName',
                email: 'fake@email.com',
                role: 'Customer',
            });

            const validationResult = await validateNewUser(user);

            expect(validationResult).toEqual([]);

            usersFunctionsStub.restore();
        });
    });

    describe('validateUpdate', () => {
        it('should return an an empty array when the user exists', async () => {
            const usersFunctionsStub = sinon.stub(usersFunctions, 'findUserById').callsFake(() => usersMock[0]);

            const validationResult = await validateUpdate(1);

            expect(validationResult).toEqual([]);

            usersFunctionsStub.restore();
        });

        it('should return an error when the id does not exist', async () => {
            const usersFunctionsStub = sinon.stub(usersFunctions, 'findUserById').callsFake(() => undefined);

            const validationResult = await validateUpdate(1);

            expect(validationResult).toEqual([parseError('id', USER_NOT_EXISTS)]);

            usersFunctionsStub.restore();
        });

        it('should return an error when the id is not a number', async () => {
            const usersFunctionsStub = sinon.stub(usersFunctions, 'findUserById').callsFake(() => usersMock[0]);

            const userId = Number('not a number');
            const validationResult = await validateUpdate(userId);

            expect(validationResult).toEqual([parseError('id', INVALID_DATA_TYPE)]);

            usersFunctionsStub.restore();
        });
    });
});
