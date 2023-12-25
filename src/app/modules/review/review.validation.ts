import { z } from 'zod';

const ReviewPOSTValidation = z.object({
  body: z.object({
    courseId: z.string({
      invalid_type_error: 'courseId must be string',
      required_error: 'courseId is required',
    }),
    rating: z.number().min(1).max(5),
    review: z.string(),
  }),
});

export const ReviewValidation = {
  ReviewPOSTValidation,
};
