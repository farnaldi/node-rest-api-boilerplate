export function up(knex) {
    return knex.schema.createTable('users', t => {
        t.increments('id')
            .unsigned()
            .primary();
        t.string('firstName').notNull();
        t.string('lastName').notNull();
        t.string('email')
            .notNull()
            .index();
        t.string('role').notNull();
        t.string('password').notNull();
        t.timestamp('createdAt')
            .notNull()
            .defaultTo(knex.fn.now());
        t.timestamp('updatedAt')
            .nullable()
            .defaultTo(null);
        t.timestamp('deletedAt')
            .nullable()
            .defaultTo(null);
    });
}

export function down(knex) {
    return knex.schema.dropTable('users');
}
