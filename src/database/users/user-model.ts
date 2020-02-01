import * as objection from 'objection';

export class UserModel extends objection.Model {
    static get tableName() {
        return `users`;
    }

    static get idColumn() {
        return `id`;
    }

    $beforeUpdate() {
        this.updatedAt = new Date();
    }

    id?: number;

    firstName?: string;

    lastName?: string;

    email?: string;

    role?: string;

    password?: string;

    createdAt?: Date;

    updatedAt?: Date;

    deletedAt?: Date;
}

export default UserModel;
