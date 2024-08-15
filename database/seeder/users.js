const bcrypt = require("bcrypt");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) { 
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      id: require("crypto").randomUUID(),
      email: "diwanart898@gmail.com",
      password: bcrypt.hashSync("diwan0810", 10),
      role: "admin",
      nama: "Backend Digital Platfrom "
    },
  ])
  await knex('santri').del()
  await knex('santri').insert([

    // {
    //   id: require("crypto").randomUUID(),
    //   email: "diwanart898@gmail.com",
    //   password: bcrypt.hashSync("diwan0810", 10),
    //   role: "admin",
    //   nama: "Backend Digital Platfrom "
    // },
    {
      id: require("crypto").randomUUID(),
      name: "abdul malik",
      nik: "3513060607110003" ,
      tempat_lahir: "probolinggo",
      tanggal_lahir: "2006-09-30",
      jenis_kelamin: "L",
      asal_sekolah:"MI Mambaul Ulum",
      jenis_pendaftaran:"santri_baru",
      mendaftar_ke_lembaga:"MA",
      nama_wali:"tumin"
    },
    {
      id: require("crypto").randomUUID(),
      name: "M Ridwan",
      nik: "3513063009060005" ,
      tempat_lahir: "probolinggo",
      tanggal_lahir: "2006-09-30",
      jenis_kelamin: "L",
      asal_sekolah:"MI Mambaul Ulum",
      jenis_pendaftaran:"santri_baru",
      mendaftar_ke_lembaga:"MA",
      nama_wali:"tumin"
    },
    {
      id: require("crypto").randomUUID(),
      name: "M Gilang",
      nik: "3513060607110008" ,
      tempat_lahir: "probolinggo",
      tanggal_lahir: "2006-09-30",
      jenis_kelamin: "L",
      asal_sekolah:"MI Mambaul Ulum",
      jenis_pendaftaran:"santri_baru",
      mendaftar_ke_lembaga:"MA",
      nama_wali:"tumin"
    },
    {
      id: require("crypto").randomUUID(),
      name: "Abdul Jabran",
      nik: "3513060607110034" ,
      tempat_lahir: "probolinggo",
      tanggal_lahir: "2006-09-30",
      jenis_kelamin: "L",
      asal_sekolah:"MI Mambaul Ulum",
      jenis_pendaftaran:"santri_baru",
      mendaftar_ke_lembaga:"MA",
      nama_wali:"tumin"
    },
    {
      id: require("crypto").randomUUID(),
      name: "Abdul Kiboy",
      nik: "35130606071100129" ,
      tempat_lahir: "probolinggo",
      tanggal_lahir: "2006-09-30",
      jenis_kelamin: "L",
      asal_sekolah:"MI Mambaul Ulum",
      jenis_pendaftaran:"santri_baru",
      mendaftar_ke_lembaga:"MA",
      nama_wali:"tumin"
    },
    {
      id: require("crypto").randomUUID(),
      name: "M Lutfi",
      nik: "3513060607110007" ,
      tempat_lahir: "probolinggo",
      tanggal_lahir: "2006-09-30",
      jenis_kelamin: "L",
      asal_sekolah:"MI Mambaul Ulum",
      jenis_pendaftaran:"santri_baru",
      mendaftar_ke_lembaga:"MA",
      nama_wali:"tumin"
    },
    {
      id: require("crypto").randomUUID(),
      name: "Malik Ibrohim",
      nik: "35130606071100233" ,
      tempat_lahir: "probolinggo",
      tanggal_lahir: "2006-09-30",
      jenis_kelamin: "L",
      asal_sekolah:"MI Mambaul Ulum",
      jenis_pendaftaran:"santri_baru",
      mendaftar_ke_lembaga:"MA",
      nama_wali:"tumin"
    },
    {
      id: require("crypto").randomUUID(),
      name: "Abdul Aziz",
      nik: "3513060607110022" ,
      tempat_lahir: "probolinggo",
      tanggal_lahir: "2006-09-30",
      jenis_kelamin: "L",
      asal_sekolah:"MI Mambaul Ulum",
      jenis_pendaftaran:"santri_baru",
      mendaftar_ke_lembaga:"MA",
      nama_wali:"tumin"
    },
  ]);
};
