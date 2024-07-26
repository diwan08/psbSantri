/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('daftar', t => {
        t.increments('id')
        t.integer("nomer_pendaftaran").notNullable().unsigned()
        t.string('id_santri').notNullable();
        t.foreign('id_santri').references('id').inTable('santri').onDelete('CASCADE')
        t.timestamps(true,true)
        })
    };

  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable("daftar")
  };
  