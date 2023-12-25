import { Schema, model } from 'mongoose';
import { TCourse, TDetails, TTags } from './course.interface';
import { calculateDurationInWeeks } from '../../utils/weekCalculator';

const TagsSchema = new Schema<TTags>({
  name: { type: String, trim: true },
  isDeleted: { type: Boolean, default: false },
});

const DetailsSchema = new Schema<TDetails>({
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] },
  description: { type: String, trim: true },
});

const CourseSchema = new Schema<TCourse>({
  title: { type: String, unique: true, trim: true },
  instructor: { type: String, trim: true },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
  price: { type: Number },
  tags: [TagsSchema],
  startDate: { type: String, trim: true },
  endDate: { type: String, trim: true },
  language: { type: String, trim: true },
  provider: { type: String, trim: true },
  durationInWeeks: { type: Number },
  details: DetailsSchema,
});

// middlewares

CourseSchema.pre('save', async function (next) {
  // Ensuring that startDate and endDate are converted to Date
  const startDate = new Date(this.startDate as string);
  const endDate = new Date(this.endDate as string);
  this.durationInWeeks = calculateDurationInWeeks(startDate, endDate);
  next();
});

export const Course = model<TCourse>('Course', CourseSchema);
