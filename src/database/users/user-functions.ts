import { UserModel } from './user-model';

export const AddUser = async (user: Partial<UserModel>): Promise<UserModel> => {
    return UserModel.query().insertAndFetch(user);
};

export const FindUserByEmail = async (email: string): Promise<UserModel> => {
    return UserModel.query().findOne('Email', email);
};

export const FindUserById = async (id: number): Promise<UserModel> => {
    return UserModel.query().findOne('Id', id);
};
