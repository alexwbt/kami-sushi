import { knex } from ".";
import { Menu, MENU } from "../tables";

export const getAllMenu = async () => {
    return await knex<Menu>(MENU);
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
