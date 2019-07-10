
exports.up = function(knex) {
    return knex.schema.createTable('scores', tbl => {
        tbl.increments();
    
        tbl.string('date', 255).notNullable();

        tbl.integer('score').notNullable();
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('scores');
};
