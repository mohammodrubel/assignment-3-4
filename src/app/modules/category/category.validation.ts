import { z } from 'zod';

const CategoryPOSTValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Category must be string',
      required_error: 'Category is required',
    }),
  }),
});
const CategoryUPDATEValidation = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});

export const CategoryValidation = {
  CategoryPOSTValidation,
  CategoryUPDATEValidation,
};
