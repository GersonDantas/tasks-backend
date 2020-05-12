exports.up = function(knex) {
    return knex.schema.createTable('tasks', table => {
        table.increments('id').primary()
        table.string('desc').notNull()
        table.datetime('estimateAt')
        table.string('doneAt')
        table.integer('userId').references('id').inTable('users')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tasks')
};
