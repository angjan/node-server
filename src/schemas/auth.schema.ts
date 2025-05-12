import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
  address: z.string().min(1).optional(),
});

// Export type for use in controller
export type RegisterInput = z.infer<typeof registerSchema>;
