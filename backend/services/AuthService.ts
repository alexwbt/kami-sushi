import { knex } from ".";
import { User, USER } from "../tables";

export const getUser = async (id: number) => {
    return await knex<User>(USER).where({ id }).first();
};

export const getUserWithUsername = async (username: string) => {
    return await knex<User>(USER).where({ username }).first();
};

export const createUser = async (username: string) => {
    return await knex<User>(USER).insert({ username }).returning("id").first();
};

export const verifyUser = async (id: number) => {
    await knex(USER).where({ id }).update({ verified: true });
};

export const deleteUser = async (id: number) => {
    await knex(USER).where({ id }).del();
};
