import mongoose, { Schema, type Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  userId: mongoose.Types.ObjectId;
  userName: string;
  teamName: string;
  points: number;
  streakDays: number;
  workoutsCompleted: number;
  rank: number;
  createdAt: Date;
  updatedAt: Date;
}

const leaderboardEntrySchema = new Schema<ILeaderboardEntry>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    teamName: { type: String, required: true },
    points: { type: Number, required: true, default: 0 },
    streakDays: { type: Number, required: true, default: 0 },
    workoutsCompleted: { type: Number, required: true, default: 0 },
    rank: { type: Number, required: true, min: 1 },
  },
  { timestamps: true },
);

export const LeaderboardEntry = mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardEntrySchema);
