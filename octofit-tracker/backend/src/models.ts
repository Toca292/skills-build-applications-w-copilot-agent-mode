import { Schema, model } from 'mongoose'

export const User = model('User', new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  displayName: { type: String, required: true, trim: true },
  avatarUrl: String,
}, { timestamps: true }))

export const Team = model('Team', new Schema({
  name: { type: String, required: true, trim: true },
  description: String,
  memberIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true }))

export const Activity = model('Activity', new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['running', 'walking', 'strength', 'cycling', 'other'], required: true },
  durationMinutes: { type: Number, required: true, min: 1 },
  distanceKm: { type: Number, min: 0 },
  points: { type: Number, required: true, min: 0 },
  completedAt: { type: Date, required: true },
}, { timestamps: true }))

export const LeaderboardEntry = model('LeaderboardEntry', new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  points: { type: Number, required: true, min: 0, default: 0 },
  rank: { type: Number, required: true, min: 1 },
}, { timestamps: true }))

export const Workout = model('Workout', new Schema({
  title: { type: String, required: true, trim: true },
  description: String,
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  durationMinutes: { type: Number, required: true, min: 1 },
  activityType: { type: String, required: true, trim: true },
}, { timestamps: true }))