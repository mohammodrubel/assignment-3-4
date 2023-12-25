import { Schema, model } from 'mongoose';
import { TUser } from './registration_user_interface';
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['user', 'admin'],
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  try {
    const saltRounds = 10;
    const hashingPassword = await bcrypt.hash(this.password, saltRounds);
    this.password = hashingPassword;
    next()
  } catch (error: any) {
    next(error);
  }
});

export const User = model<TUser>('user', userSchema);
