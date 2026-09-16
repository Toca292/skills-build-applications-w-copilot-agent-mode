"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = __importDefault(require("./app.js"));
const database_js_1 = require("./config/database.js");
const port = Number(process.env.PORT ?? 8000);
async function startServer() {
    await (0, database_js_1.connectDatabase)();
    const server = app_js_1.default.listen(port, () => {
        console.log(`OctoFit Tracker API listening on port ${port}`);
    });
    const shutdown = async () => {
        server.close();
        await (0, database_js_1.disconnectDatabase)();
    };
    process.once('SIGINT', shutdown);
    process.once('SIGTERM', shutdown);
}
startServer().catch((error) => {
    console.error('Unable to start OctoFit Tracker API:', error);
    process.exitCode = 1;
});
