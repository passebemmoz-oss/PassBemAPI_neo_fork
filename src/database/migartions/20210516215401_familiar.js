
exports.up = function(knex) {

    return knex.schema.createTable("familiar", function(table){
        table.string("tiket").notNullable();
        table.string("chefetiket").notNullable();
        table.string("email").primary();
        table.string("parentesco").notNullable();
        table.string("nome")
        table.string("apelido")
        table.string("aniversario")
        table.string("contacto")
        table.string("avenida")
        table.string("avatar")
        
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTable("familiar");
  
};
