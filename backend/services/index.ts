import * as Knex from "knex";

const { NODE_ENV } = process.env;

export const knex = Knex(require("../knexfile")[NODE_ENV]);
