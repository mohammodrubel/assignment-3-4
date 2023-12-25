import { z } from 'zod';

const TagPOSTValidation = z.object({
  name: z.string(),
  isDeleted: z.boolean().default(false),
});

// post course validation

const DetailsPOSTValidation = z.object({
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  description: z.string(),
});

const CoursePOSTValidation = z.object({
  body: z.object({
    title: z.string(),
    instructor: z.string(),
    categoryId: z.string({
      invalid_type_error: 'categoryId must be string',
      required_error: 'categoryId is required',
    }),
    price: z.number(),
    tags: z.array(TagPOSTValidation),
    startDate: z.string(),
    endDate: z.string(),
    language: z.string(),
    provider: z.string(),
    details: DetailsPOSTValidation,
  }),
});

// update course validation

const TagUPDATEValidation = z.object({
  name: z.string().optional(),
  isDeleted: z.boolean().default(false).optional(),
});

// post course validation

const DetailsUPDATEValidation = z.object({
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
  description: z.string().optional(),
});

const CourseUPDATEValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    instructor: z.string().optional(),
    categoryId: z
      .string({
        invalid_type_error: 'categoryId must be string',
        required_error: 'categoryId is required',
      })
      .optional(),
    price: z.number().optional(),
    tags: z.array(TagUPDATEValidation).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    language: z.string().optional(),
    provider: z.string().optional(),
    details: DetailsUPDATEValidation.optional(),
  }),
});

export const CourseValidation = {
  CoursePOSTValidation,
  CourseUPDATEValidation,
};
