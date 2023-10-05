import { z } from 'zod';

export const createBatSchema = z
  .object({
    name: z.string(),
    age: z.number(),
    breed: z.string(),
  })
  .required();

export type CreateBatZodDto = z.infer<typeof createBatSchema>;
