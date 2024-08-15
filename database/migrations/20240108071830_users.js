/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', t =>{
      t.string('id').primary();
      t.string('email').unique().notNullable();
      t.string('password').notNullable();
      t.string('nama').notNullable();
      t.string('token').notNullable();
      t.enum('role', ['admin'],['santri'])
      t.integer('otp',6);
      t.timestamps(true, true); 
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable('users')
  };
  