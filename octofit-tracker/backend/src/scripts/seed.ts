import mongoose from 'mongoose';
import { Activity } from '../models/Activity.js';
import { LeaderboardEntry } from '../models/LeaderboardEntry.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const teams = await Team.insertMany([
      {
        name: 'River Runners',
        city: 'Seattle',
        description: 'Distance-focused runners who love early morning miles and team challenges.',
        color: '#2563eb',
      },
      {
        name: 'Summit Striders',
        city: 'Denver',
        description: 'Mountain endurance athletes building strength, resilience, and consistency.',
        color: '#f97316',
      },
      {
        name: 'Harbor Hustle',
        city: 'San Diego',
        description: 'Balanced cardio and mobility specialists focused on sustainable progress.',
        color: '#10b981',
      },
    ]);

    const users = await User.insertMany([
      {
        name: 'Ava Nguyen',
        email: 'ava.nguyen@example.com',
        age: 29,
        fitnessLevel: 'Advanced',
        city: 'Seattle',
        weeklyGoal: 220,
        teamId: teams[0]._id,
      },
      {
        name: 'Marcus Lee',
        email: 'marcus.lee@example.com',
        age: 34,
        fitnessLevel: 'Intermediate',
        city: 'Denver',
        weeklyGoal: 200,
        teamId: teams[1]._id,
      },
      {
        name: 'Sofia Ramirez',
        email: 'sofia.ramirez@example.com',
        age: 27,
        fitnessLevel: 'Intermediate',
        city: 'San Diego',
        weeklyGoal: 180,
        teamId: teams[2]._id,
      },
      {
        name: 'Noah Brooks',
        email: 'noah.brooks@example.com',
        age: 31,
        fitnessLevel: 'Beginner',
        city: 'Seattle',
        weeklyGoal: 150,
        teamId: teams[0]._id,
      },
    ]);

    const activities = await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'Run',
        distanceKm: 12.5,
        durationMinutes: 62,
        caloriesBurned: 680,
        date: new Date('2026-09-01T06:00:00Z'),
        notes: 'Tempo run with a strong finish.',
      },
      {
        userId: users[1]._id,
        type: 'Cycling',
        distanceKm: 28,
        durationMinutes: 78,
        caloriesBurned: 720,
        date: new Date('2026-09-02T18:30:00Z'),
        notes: 'Hill intervals on the ridge route.',
      },
      {
        userId: users[2]._id,
        type: 'Strength',
        durationMinutes: 48,
        caloriesBurned: 420,
        date: new Date('2026-09-03T17:15:00Z'),
        notes: 'Lower body focus and core circuit.',
      },
      {
        userId: users[3]._id,
        type: 'Yoga',
        durationMinutes: 30,
        caloriesBurned: 180,
        date: new Date('2026-09-04T07:00:00Z'),
        notes: 'Mobility session and breath work.',
      },
    ]);

    const workouts = await Workout.insertMany([
      {
        title: 'Trail Tempo Blast',
        category: 'Cardio',
        difficulty: 'Advanced',
        durationMinutes: 40,
        description: 'Pace intervals designed to build endurance while staying efficient.',
        equipment: ['Shoes', 'Water bottle'],
        targetArea: 'Legs and cardio',
        coach: 'Avery Stone',
      },
      {
        title: 'Power Circuit',
        category: 'Strength',
        difficulty: 'Intermediate',
        durationMinutes: 35,
        description: 'Full-body strength blocks with controlled recovery intervals.',
        equipment: ['Dumbbells', 'Mat'],
        targetArea: 'Full body',
        coach: 'Nina Patel',
      },
      {
        title: 'Mobility Reset',
        category: 'Mobility',
        difficulty: 'Beginner',
        durationMinutes: 25,
        description: 'Gentle mobility work to reduce tightness and improve range of motion.',
        equipment: ['Yoga mat'],
        targetArea: 'Hip and back',
        coach: 'Jules Martin',
      },
      {
        title: 'Mountain HIIT',
        category: 'HIIT',
        difficulty: 'Advanced',
        durationMinutes: 30,
        description: 'Short, high-intensity intervals to improve power and stamina.',
        equipment: ['Kettlebell', 'Bench'],
        targetArea: 'Full body',
        coach: 'Theo Grant',
      },
    ]);

    await LeaderboardEntry.insertMany([
      {
        userId: users[0]._id,
        userName: 'Ava Nguyen',
        teamName: 'River Runners',
        points: 1420,
        streakDays: 12,
        workoutsCompleted: 18,
        rank: 1,
      },
      {
        userId: users[1]._id,
        userName: 'Marcus Lee',
        teamName: 'Summit Striders',
        points: 1335,
        streakDays: 9,
        workoutsCompleted: 16,
        rank: 2,
      },
      {
        userId: users[2]._id,
        userName: 'Sofia Ramirez',
        teamName: 'Harbor Hustle',
        points: 1270,
        streakDays: 7,
        workoutsCompleted: 15,
        rank: 3,
      },
      {
        userId: users[3]._id,
        userName: 'Noah Brooks',
        teamName: 'River Runners',
        points: 980,
        streakDays: 4,
        workoutsCompleted: 10,
        rank: 4,
      },
    ]);

    console.log(`Seeded ${teams.length} teams, ${users.length} users, ${activities.length} activities, ${workouts.length} workouts, and leaderboard entries.`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
