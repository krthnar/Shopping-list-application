import { sql } from "../database/database.js";
const create = async (name) => {
    await sql`INSERT INTO shopping_lists (name, active) VALUES (${name}, true)`;
};

const findAllActiveLists = async () => {
    return await sql`SELECT * FROM shopping_lists WHERE active = true`;
};
const deactivateListById = async (listId) => {
    await sql`UPDATE shopping_lists SET active = FALSE WHERE id = ${listId}`;
};
export { create, deactivateListById, findAllActiveLists };
