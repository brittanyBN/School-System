import {Person} from "./person";
import {Lecture} from "./lecture";

export interface Class {
    slug: string;
    name: string;
    students: Person[];
    departmentHeadForClassId: string | null | undefined;
    lectures: Lecture
}
