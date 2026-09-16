"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = exports.LeaderboardEntry = exports.Activity = exports.Team = exports.User = void 0;
const mongoose_1 = require("mongoose");
exports.User = (0, mongoose_1.model)('User', new mongoose_1.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    displayName: { type: String, required: true, trim: true },
    avatarUrl: String,
}, { timestamps: true }));
exports.Team = (0, mongoose_1.model)('Team', new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    description: String,
    memberIds: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true }));
exports.Activity = (0, mongoose_1.model)('Activity', new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['running', 'walking', 'strength', 'cycling', 'other'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0 },
    points: { type: Number, required: true, min: 0 },
    completedAt: { type: Date, required: true },
}, { timestamps: true }));
exports.LeaderboardEntry = (0, mongoose_1.model)('LeaderboardEntry', new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    points: { type: Number, required: true, min: 0, default: 0 },
    rank: { type: Number, required: true, min: 1 },
}, { timestamps: true }));
exports.Workout = (0, mongoose_1.model)('Workout', new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    description: String,
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    activityType: { type: String, required: true, trim: true },
}, { timestamps: true }));
