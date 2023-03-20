import { PersonOnLecture } from "@prisma/client";
import Roles from "../enums/personRole";
import {Class} from "./class";
import { Lecture } from './lecture'

interface Person {
    personalNumber: string;
    name: string;
    email: string;
    password: string;
    role: Roles;
    createdAt: Date;
    lectures: PersonOnLecture[];
    class?: Class;
    classId?: string;
    departmentHeadForClass?: Class;
    departmentHeadForClassId?: string;
    teacherForLecture: Lecture[];
}
