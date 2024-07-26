/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('santri', t =>{
    t.string('id').primary();
    t.string('nik',16).notNullable().unique();
    t.string('name').notNullable();
    t.string('tempat_lahir').notNullable();
    t.dateTime('tanggal_lahir').notNullable();
    t.enum('jenis_kelamin',['L','P']).notNullable();
    t.string('asal_sekolah').notNullable();
    t.enum('jenis_pendaftaran',['santri_baru'],['mutasi_sekolah_lain']).notNullable();
    t.enum('mendaftar_ke_lembaga',['RA','MI','MTS','MA','PONDOK_SAJA']).notNullable();
    t.string('nama_wali').notNullable();
    t.string("avatar")
    t.timestamps(true, true) 
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("santri")
};
