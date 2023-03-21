import {PersonOnLecture} from "@prisma/client";
import {Class} from "./class";
import {Person} from "./person";

interface Lecture {
    id: string;
    slug: string;
    className: string;
    time: Date;
    description: string;
    students: PersonOnLecture[];
    class: Class;
    teacher: Person;
}