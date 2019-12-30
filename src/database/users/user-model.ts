import { Model } from 'objection';

export class UserModel extends Model {
    static get tableName() {
        return `users`;
    }

    static get idColumn() {
        return `Id`;
    }

    Id: number;

    FirstName: string;

    LastName: string;

    Email: string;

    Role: string;

    Password: string;

    /*
    CreatedAt: Date;

    UpdatedAt: Date;

    DeletedAt: Date;
    */
}

export default UserModel;
