import { z } from "zod";

export const LectureSchema = z.object({
    slug: z.string(),
    className: z.string(),
    time: z.coerce.date(),
    description: z.string(),
    students: z.array(z.string()).optional(),
    class: z.string(),
    teacher: z.string(),
});

export type Lecture = z.infer<typeof LectureSchema>;