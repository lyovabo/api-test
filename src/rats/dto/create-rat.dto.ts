import { z } from 'zod';

export const createRatSchema = z
  .object({
    name: z.string(),
    age: z.number(),
    breed: z.string().nonempty(),
  })
  .required();

export type CreateRatDto = z.infer<typeof createRatSchema>;
