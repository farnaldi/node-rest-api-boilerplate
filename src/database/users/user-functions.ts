import { UserModel } from './user-model';

export const addUser = async (user: Partial<UserModel>): Promise<UserModel> => {
    return UserModel.query().insertAndFetch(user);
};

export const findUserByEmail = async (email: string): Promise<UserModel> => {
    return UserModel.query().findOne('Email', email);
};

export const findUserById = async (id: number): Promise<UserModel> => {
    return UserModel.query().findOne('Id', id);
};
