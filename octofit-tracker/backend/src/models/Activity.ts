import mongoose, { Schema, type Document } from 'mongoose';

export interface IActivity extends Document {
  userId: mongoose.Types.ObjectId;
  type: 'Run' | 'Cycling' | 'Strength' | 'Yoga' | 'Hike';
  distanceKm?: number;
  durationMinutes: number;
  caloriesBurned: number;
  date: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['Run', 'Cycling', 'Strength', 'Yoga', 'Hike'],
      required: true,
    },
    distanceKm: { type: Number, min: 0 },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    date: { type: Date, required: true, default: Date.now },
    notes: { type: String, trim: true },
  },
  { timestamps: true },
);

export const Activity = mongoose.model<IActivity>('Activity', activitySchema);
