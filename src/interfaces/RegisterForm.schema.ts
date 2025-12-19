import * as z from 'zod'

export const RegisterFormSchema = z.object({
  name: z.string().nonempty('Plz enter ur name'),
  email: z.email('Invalid Email'),
  password: z.string().nonempty('Type ur password'),
  phone: z.string().regex(/^01[0125][0-9]{8}$/, 'Invalid egy phone number'),
  age: z.string().nonempty('Age is required.').regex(/^(\d{1,2}|100)$/, 'Invalid age (must be between 0 and 100)'),
});

export type RegisterFormSchemaType = z.infer<typeof RegisterFormSchema>;