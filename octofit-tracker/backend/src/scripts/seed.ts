import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      {
        username: 'maya-chen',
        email: 'maya.chen@example.com',
        displayName: 'Maya Chen',
        avatarUrl: 'https://i.pravatar.cc/150?img=47',
      },
      {
        username: 'jordan-rivera',
        email: 'jordan.rivera@example.com',
        displayName: 'Jordan Rivera',
        avatarUrl: 'https://i.pravatar.cc/150?img=12',
      },
      {
        username: 'sam-taylor',
        email: 'sam.taylor@example.com',
        displayName: 'Sam Taylor',
        avatarUrl: 'https://i.pravatar.cc/150?img=32',
      },
      {
        username: 'alex-kim',
        email: 'alex.kim@example.com',
        displayName: 'Alex Kim',
        avatarUrl: 'https://i.pravatar.cc/150?img=5',
      },
    ]);

    await Team.create([
      {
        name: 'Trail Blazers',
        description: 'A team for steady miles and fresh air.',
        memberIds: [users[0]._id, users[1]._id],
      },
      {
        name: 'Strength Squad',
        description: 'Building consistency one session at a time.',
        memberIds: [users[2]._id, users[3]._id],
      },
    ]);

    await Activity.create([
      {
        userId: users[0]._id,
        type: 'running',
        durationMinutes: 32,
        distanceKm: 5.2,
        points: 52,
        completedAt: new Date('2026-09-14T16:30:00Z'),
      },
      {
        userId: users[1]._id,
        type: 'cycling',
        durationMinutes: 45,
        distanceKm: 12.8,
        points: 64,
        completedAt: new Date('2026-09-13T15:00:00Z'),
      },
      {
        userId: users[2]._id,
        type: 'strength',
        durationMinutes: 40,
        points: 48,
        completedAt: new Date('2026-09-12T17:15:00Z'),
      },
      {
        userId: users[3]._id,
        type: 'walking',
        durationMinutes: 28,
        distanceKm: 2.4,
        points: 24,
        completedAt: new Date('2026-09-11T18:00:00Z'),
      },
    ]);

    await LeaderboardEntry.create([
      { userId: users[0]._id, points: 286, rank: 1 },
      { userId: users[1]._id, points: 248, rank: 2 },
      { userId: users[2]._id, points: 216, rank: 3 },
      { userId: users[3]._id, points: 184, rank: 4 },
    ]);

    await Workout.create([
      {
        title: 'Quick Cardio Burst',
        description: 'A short interval session to raise your heart rate.',
        difficulty: 'beginner',
        durationMinutes: 20,
        activityType: 'running',
      },
      {
        title: 'Full Body Foundation',
        description: 'Simple strength movements for a balanced session.',
        difficulty: 'intermediate',
        durationMinutes: 35,
        activityType: 'strength',
      },
      {
        title: 'Endurance Ride',
        description: 'A sustained cycling workout for building stamina.',
        difficulty: 'advanced',
        durationMinutes: 50,
        activityType: 'cycling',
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
