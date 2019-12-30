export function up(knex) {
    return knex.schema.createTable('users', t => {
        t.increments('Id')
            .unsigned()
            .primary();
        t.string('FirstName').notNull();
        t.string('LastName').notNull();
        t.string('Email')
            .notNull()
            .index();
        t.string('Role').notNull();
        t.string('Password').notNull();
    });
}

export function down(knex) {
    return knex.schema.dropTable('users');
}
