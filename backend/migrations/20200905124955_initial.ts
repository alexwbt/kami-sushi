import * as Knex from "knex";
import tables from "../tables";

export async function up(knex: Knex): Promise<void> {
    for (let i = 0; i < tables.length; i++)
        await knex.schema.createTable(tables[i].name, tables[i].create);
}

export async function down(knex: Knex): Promise<void> {
    for (let i = tables.length - 1; i >= 0; i--)
        await knex.schema.dropTable(tables[i].name);
}
