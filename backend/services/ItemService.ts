import { knex } from ".";
import { MenuItem, ITEM } from "../tables";

export const getAllItem = async () => {
    return await knex<MenuItem>(ITEM);
};

export const createItem = async (item: MenuItem) => {
    await knex(ITEM).insert(item);
};

export const editItem = async (item: MenuItem) => {
    await knex(ITEM).where("id", item.id).update(item);
};

export const deleteItem = async (id: number) => {
    await knex(ITEM).where({ id }).del();
};
