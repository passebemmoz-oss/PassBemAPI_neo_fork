
exports.up = function(knex) {

    return knex.schema.createTable("usurios", function(table){
        table.string("tiket").notNullable();
        table.string("email").primary();
        table.string("senha").notNullable();
        table.string("nome")
        table.string("apelido")
        table.string("aniversario")
        table.string("contacto")
        table.string("avenida")
        table.string("expopushtoken");
        
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTable("usurios");
  
};
