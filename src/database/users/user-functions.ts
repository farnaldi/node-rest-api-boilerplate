import { UserModel } from './user-model';

export const addUser = async (user: UserModel): Promise<UserModel> => {
    return UserModel.query().insertAndFetch(user);
};

export const findUserByEmail = async (email: string): Promise<UserModel> => {
    return UserModel.query().findOne('email', email);
};

export const findUserById = async (id: number): Promise<UserModel> => {
    return UserModel.query().findOne('id', id);
};

export const updateUser = async (id: number, user: UserModel): Promise<UserModel> => {
    return UserModel.query().updateAndFetchById(id, user);
};
