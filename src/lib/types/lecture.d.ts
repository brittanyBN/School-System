import {PersonOnLecture} from "@prisma/client";

export interface Lecture {
    slug: string;
    className: string;
    time: Date;
    description: string;
    students: PersonOnLecture[];
    class: string;
    teacher: string;
}