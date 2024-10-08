import { sql } from "../database/database.js";

const getStatistics = async () => {
    const listCount = await sql`SELECT COUNT(*) FROM shopping_lists;`;
    const itemCount = await sql`SELECT COUNT(*) FROM shopping_list_items;`;

    return {
        shoppingListCount: listCount[0].count,
        shoppingListItemCount: itemCount[0].count,
    };
};

export { getStatistics };
