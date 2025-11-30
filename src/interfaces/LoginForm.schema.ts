import * as z from "zod";

export const LoginSchema = z.object({
  email: z.email('Invalid Email'),
  password: z.string().nonempty('Type ur password'),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;