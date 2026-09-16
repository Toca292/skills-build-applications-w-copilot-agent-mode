"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const routes_js_1 = require("./routes.js");
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok' });
});
exports.app.use('/api', routes_js_1.apiRouter);
exports.app.use((_request, response) => {
    response.status(404).json({ error: 'Route not found' });
});
exports.default = exports.app;
