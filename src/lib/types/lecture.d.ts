import {Person} from "./person";
import {Class} from "./class";
import {PersonOnLecture} from "@prisma/client";

export interface Lecture {
    id: string;
    slug: string;
    className: string;
    time: Date;
    description: string;
    students: PersonOnLecture[];
    classId: string;
    teacherId: string;
}