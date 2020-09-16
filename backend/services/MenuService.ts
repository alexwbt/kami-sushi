import { knex } from ".";
import { Menu, MENU, MenuItem, ITEM } from "../tables";

export const getMenuBanner = async (id: number) => {
    return (await knex(MENU).select<Menu>("banner").where({ id }).first()).banner;
};

export const getAllItemImages = async (menu_id: number) => {
    return (await knex<MenuItem>(ITEM).select("image").where({ menu_id })).map(i => i.image);
};

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
