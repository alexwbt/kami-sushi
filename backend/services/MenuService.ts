import { knex } from ".";
import { Menu, MENU } from "../tables";

export const getMenu = async (id: number) => {
    return await knex<Menu>(MENU).where({ id });
};

export const createMenu = async (menu: Menu) => {
    await knex(MENU).insert(menu);
};

export const editMenu = async (menu: Menu) => {
    await knex(MENU).where("id", menu.id).update(menu);
};

export const deleteMenu = async (id: number) => {
    await knex(MENU).where({ id }).del();
};
