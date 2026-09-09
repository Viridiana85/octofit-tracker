import mongoose, { Schema, type Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  category: 'Cardio' | 'Strength' | 'Mobility' | 'HIIT';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  durationMinutes: number;
  description: string;
  equipment: string[];
  targetArea: string;
  coach: string;
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['Cardio', 'Strength', 'Mobility', 'HIIT'],
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 10 },
    description: { type: String, required: true },
    equipment: { type: [String], default: [] },
    targetArea: { type: String, required: true },
    coach: { type: String, required: true },
  },
  { timestamps: true },
);

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
