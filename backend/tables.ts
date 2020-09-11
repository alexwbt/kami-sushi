import { CreateTableBuilder } from "knex";

export const USER = "user";
export const MENU = "menu";
export const ITEM = "item";

export const USER_I = 0;
export const MENU_I = 1;
export const ITEM_I = 2;

export type User = {
    id?: number,
    username: string;
    created_at?: string;
    updated_at?: string;
};

export type Menu = {
    id?: number,
    name: string;
    min_column?: number;
    max_column?: number;
    padding?: number;
    banner?: string;
    created_at?: string;
    updated_at?: string;
};

export type MenuItem = {
    id?: number;
    name: string;
    description: string;
    image: string;
    menu_id: number;
    created_at?: string;
    updated_at?: string;
};

type TableList = {
    name: string;
    create: (table: CreateTableBuilder) => void;
    valid?: (data: any) => string | true;
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
            table.string("name").notNullable();
            table.integer("min_column").defaultTo(2);
            table.integer("max_column").defaultTo(4);
            table.integer("padding").defaultTo(5);
            table.string("banner").defaultTo("");
            table.boolean("direction").defaultTo(false);
            table.timestamps(false, true);
        },
        valid: (data: any) => {
            const d = {
                min_column: 2,
                max_column: 4,
                padding: 5,
                banner: "",
                direction: false,
                ...data
            };
            if (typeof d.name !== "string" || d.name.length <= 0) return "Invalid menu name";
            if (typeof d.min_column !== "number") return "Invalid columns";
            if (typeof d.max_column !== "number") return "Invalid columns";
            if (typeof d.padding !== "number") return "Invalid padding";
            if (typeof d.banner !== "string") return "Invalid banner path";
            if (typeof d.direction !== "boolean") return "Invalid direction";
            if (d.min_column > d.max_column) return "Invalid columns";
            return true;
        }
    },
    {
        name: ITEM,
        create: (table: CreateTableBuilder) => {
            table.increments();
            table.string("name").notNullable();
            table.string("description").defaultTo("");
            table.string("image").defaultTo("");
            table.integer("menu_id").notNullable().references(`${MENU}.id`).onUpdate("CASCADE").onDelete("CASCADE");
            table.timestamps(false, true);
        },
        valid: (data: any) => {
            const d = {
                description: "",
                image: "",
                ...data
            };
            if (typeof d.name !== "string" || d.name.length <= 0) return "Invalid item name";
            if (typeof d.description !== "string") return "Invalid description";
            if (typeof d.image !== "string") return "Invalid image path";
            if (typeof d.menu_id !== "number" || d.menu_id < 1) return "Invalid menu id";
            return true;
        }
    }
];

export default tables;
