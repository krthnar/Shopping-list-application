import { renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as statisticsService from "../services/statisticsService.js";

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
};

// Function to display the main page
const viewMainPage = async () => {
    const stats = await statisticsService.getStatistics();
    const data = {
        title: "Shared shopping lists",
        stats: stats,
    };

    return new Response(
        await renderFile("main.eta", data),
        responseDetails,
    );
};

export { viewMainPage };
