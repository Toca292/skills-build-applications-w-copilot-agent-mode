"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = require("express");
const models_js_1 = require("./models.js");
exports.apiRouter = (0, express_1.Router)();
function registerCrudRoutes(path, resource) {
    exports.apiRouter.get(path, async (_request, response) => {
        response.json(await resource.find().sort({ createdAt: -1 }));
    });
    exports.apiRouter.post(path, async (request, response) => {
        const created = await resource.create(request.body);
        response.status(201).json(created);
    });
    exports.apiRouter.get(`${path}/:id`, async (request, response) => {
        const item = await resource.findById(request.params.id);
        if (!item) {
            response.status(404).json({ error: 'Resource not found' });
            return;
        }
        response.json(item);
    });
    exports.apiRouter.patch(`${path}/:id`, async (request, response) => {
        const item = await resource.findByIdAndUpdate(request.params.id, request.body, {
            new: true,
            runValidators: true,
        });
        if (!item) {
            response.status(404).json({ error: 'Resource not found' });
            return;
        }
        response.json(item);
    });
    exports.apiRouter.delete(`${path}/:id`, async (request, response) => {
        const item = await resource.findByIdAndDelete(request.params.id);
        if (!item) {
            response.status(404).json({ error: 'Resource not found' });
            return;
        }
        response.status(204).send();
    });
}
registerCrudRoutes('/users', models_js_1.User);
registerCrudRoutes('/teams', models_js_1.Team);
registerCrudRoutes('/activities', models_js_1.Activity);
registerCrudRoutes('/leaderboard', models_js_1.LeaderboardEntry);
registerCrudRoutes('/workouts', models_js_1.Workout);
