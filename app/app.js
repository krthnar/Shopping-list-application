import { serve } from "./deps.js";
import { configure } from "./deps.js";
import * as listController from "./controllers/listController.js";
import * as itemController from "./controllers/itemController.js";
import * as mainController from "./controllers/mainController.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
  const url = new URL(request.url);
  const pathParts = url.pathname.split("/");
  const listId = pathParts[2];
  const itemId = pathParts[4];

  if (url.pathname === "/" && request.method === "GET") {
    return await mainController.viewMainPage();
  } else if (url.pathname === "/lists" && request.method === "POST") {
    return await listController.addList(request);
  } else if (url.pathname === "/lists" && request.method === "GET") {
    return await listController.viewLists(request);
  } else if (
    pathParts[3] === "deactivate" &&
    request.method === "POST"
  ) {
    // Deactivate list
    return await listController.deactivateList(listId);
  } else if (
    pathParts[5] === "collect" &&
    request.method === "POST"
  ) {
    return await itemController.markItemCollected(listId, itemId);
  } else if (
    pathParts[3] === "items" &&
    request.method === "POST"
  ) {
    // Add an item to the shopping list
    return await itemController.addItem(request, listId);
  } else if (
    pathParts[1] === "lists" && listId && request.method === "GET"
  ) {
    // View the shopping list
    return await itemController.viewListItems(listId);
  } else {
    return new Response("Not Found", { status: 404 });
  }
};

serve(handleRequest, { port: 7777 });
