import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    username: String,
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

export interface User {
  username: string;
  email: string;
  password: string;
}
