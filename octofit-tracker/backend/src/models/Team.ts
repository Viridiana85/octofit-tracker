import mongoose, { Schema, type Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  city: string;
  description: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    city: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    color: { type: String, default: '#4f46e5' },
  },
  { timestamps: true },
);

export const Team = mongoose.model<ITeam>('Team', teamSchema);
