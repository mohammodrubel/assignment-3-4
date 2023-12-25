import { Types } from 'mongoose';

export type TTags = {
  name: string;
  isDeleted: boolean;
};

export type TDetails = {
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
};

export type TCourse = {
  title: string;
  instructor: string;
  categoryId: Types.ObjectId;
  price: number;
  tags: TTags[];
  startDate: string;
  endDate: string;
  language: string;
  provider: string;
  durationInWeeks: number;
  details: TDetails;
};

export type TParams = {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: string;
  minPrice: number;
  maxPrice: number;
  tags: string;
  startDate: string;
  endDate: string;
  language: string;
  provider: string;
  durationInWeeks: number;
  level: string;
};
