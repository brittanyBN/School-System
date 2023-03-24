import { z } from "zod";
import {LectureSchema} from "./lecture.schema";
import {PersonOnLectureSchema} from "./persononlecture.schema";

export const PersonSchema = z.object({
    personalNumber: z.string(),
    name: z.string(),
    email: z.string(),
    password: z.string(),
    role: z.enum(['STUDENT', 'TEACHER']),
    createdAt: z.date(),
    classId: z.string().nullable().optional(),
    departmentHeadForClassId: z.string().nullable().optional(),
});

export type Person = z.infer<typeof PersonSchema>;


