import { sql } from "../database/database.js";

const findListById = async (listId) => {
  const result = await sql`SELECT * FROM shopping_lists WHERE id = ${listId}`;
  return result[0];
};
const findItemsByListId = async (listId) => {
  return await sql`
      SELECT * FROM shopping_list_items
      WHERE shopping_list_id = ${listId}
      ORDER BY collected, name`;
};
const addItemToList = async (listId, name) => {
  await sql`INSERT INTO shopping_list_items (shopping_list_id, name, collected) VALUES (${listId}, ${name}, false)`;
};

const markAsCollected = async (itemId) => {
  await sql`UPDATE shopping_list_items SET collected = TRUE WHERE id = ${itemId}`;
};

export { addItemToList, findItemsByListId, findListById, markAsCollected };
