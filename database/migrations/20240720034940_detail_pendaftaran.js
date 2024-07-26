/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("detail_pendaftaran" , t => {
    t.increments("id");
    t.integer("id_pendaftaran").notNullable().unsigned();
    t.foreign("id_pendaftaran").references("id").inTable("daftar").onDelete("CASCADE");
    t.string('id_santri').notNullable();
    t.foreign('id_santri').references('id').inTable('santri').onDelete('CASCADE');
    t.timestamps(true, true)
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("detail_pendaftaran")
};
