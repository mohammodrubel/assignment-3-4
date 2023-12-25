import { z } from 'zod';

const userSchemaValidation = z.object({
  body: z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum(['user', 'admin']),
  }),
});

export default userSchemaValidation;
