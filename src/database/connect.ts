import * as Knex from 'knex';
import { Model } from 'objection';
import * as knexConfig from '../../knexfile';

const connectDatabase = async () => {
    const knex = Knex(knexConfig);

    Model.knex(knex);

    await knex.migrate.latest();
};

export default connectDatabase;
