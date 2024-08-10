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
  ]);
};
