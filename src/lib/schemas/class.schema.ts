import {z} from "zod";

export const ClassSchema = z.object({
    name: z.string(),
    slug: z.string(),
    students: z.array(z.string()).optional(),
    departmentHeadForClassId: z.string().nullable().optional(),
    lectures: z.array(z.string()).optional(),
});

export type Class = z.infer<typeof ClassSchema>;
