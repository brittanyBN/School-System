import {z} from "zod";

export const PersonOnLectureSchema = z.object({
    lectureId: z.string(),
    personId: z.string(),
    attended: z.boolean(),
});

export type PersonOnLecture = z.infer<typeof PersonOnLectureSchema>;
