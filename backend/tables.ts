import { CreateTableBuilder } from "knex";

export const USER = "user";
export const MENU = "menu";
export const MENU_ITEM = "menu_item";

export type User = {
    id?: number,
    username: string,
    created_at?: string,
    updated_at?: string
};

export type Menu = {
    id?: number,
    menu_name: string,
    created_at?: string,
    updated_at?: string
};

export type MenuItem = {
    id?: number,
    item_name: string,
    item_description: string,
    item_image: string,
    menu_id: number,
    created_at?: string,
    updated_at?: string
};

type TableList = {
    name: string,
    create: (table: CreateTableBuilder) => void
}[];

const tables: TableList = [
    {
        name: USER,
        create: (table: CreateTableBuilder) => {
            table.increments();
            table.string("username").notNullable();
            table.timestamps(false, true);
        }
    },
    {
        name: MENU,
        create: (table: CreateTableBuilder) => {
            table.increments();
            table.string("menu_name").notNullable();
            table.timestamps(false, true);
        }
    },
    {
        name: MENU_ITEM,
        create: (table: CreateTableBuilder) => {
            table.increments();
            table.string("item_name").notNullable();
            table.string("item_description").notNullable();
            table.string("item_image").notNullable();
            table.integer(`${MENU}_id`).notNullable().references(`${MENU}.id`).onUpdate("CASCADE").onDelete("CASCADE");
            table.timestamps(false, true);
        }
    }
];

export default tables;
