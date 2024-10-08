import { renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as itemService from "../services/itemService.js";
const redirectTo = (path) => {
    return new Response(`Redirecting to ${path}.`, {
        status: 303,
        headers: {
            "Location": path,
        },
    });
};

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const viewListItems = async (listId) => {
    const list = await itemService.findListById(listId);
    const items = await itemService.findItemsByListId(listId);

    const data = {
        list,
        items,
    };

    return new Response(
        await renderFile("list_items.eta", data),
        responseDetails,
    );
};

const addItem = async (request, listId) => {
    const formData = await request.formData();
    const itemName = formData.get("name");

    await itemService.addItemToList(listId, itemName);
    return redirectTo(`/lists/${listId}`);
};

const markItemCollected = async (listId, itemId) => {
    await itemService.markAsCollected(itemId);
    return redirectTo(`/lists/${listId}`);
};

export { addItem, markItemCollected, viewListItems };
