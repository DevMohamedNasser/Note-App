import * as z from 'zod';

export const noteSchema = z.object({
    title: z.string().nonempty('Title is required'),
    content: z.string().min(1, 'Content is required')
});

export type noteSchemaType = z.infer<typeof noteSchema>;