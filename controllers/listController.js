import { renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as listService from "../services/listService.js";

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

const addList = async (request) => {
    const formData = await request.formData();
    const name = formData.get("name");

    await listService.create(name);

    return redirectTo("/lists");
};
const viewLists = async () => {
    const data = {
        lists: await listService.findAllActiveLists(),
    };

    return new Response(await renderFile("lists.eta", data), responseDetails);
};
const deactivateList = async (listId) => {
    await listService.deactivateListById(listId);
    return redirectTo("/lists");
};

export { addList, deactivateList, viewLists };
