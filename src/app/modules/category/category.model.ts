/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, model } from 'mongoose';
import { TCategory } from './category.interface';

const CategorySchema = new Schema<TCategory>({
  name: {
    type: String,
    unique: true,
    trim: true,
  },
});

export const Category = model<TCategory>('Category', CategorySchema);
