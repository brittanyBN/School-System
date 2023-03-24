import { z } from "zod";

export const LectureSchema = z.object({
    id: z.string(),
    slug: z.string(),
    className: z.string(),
    time: z.date(),
    description: z.string(),
    students: z.array(z.string()).optional(),
    classId: z.string(),
    teacherId: z.string(),
});

export type Lecture = z.infer<typeof LectureSchema>;