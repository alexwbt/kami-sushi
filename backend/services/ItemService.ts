import { knex } from ".";
import { MenuItem, MENU_ITEM } from "../tables";

export const getAllItem = async () => {
    return await knex<MenuItem>(MENU_ITEM);
};

export const createItem = async (item: MenuItem) => {
    await knex(MENU_ITEM).insert(item);
};

export const editItem = async (item: MenuItem) => {
    await knex(MENU_ITEM).where("id", item.id).update(item);
};

export const deleteItem = async (id: number) => {
    await knex(MENU_ITEM).where({ id }).del();
};
