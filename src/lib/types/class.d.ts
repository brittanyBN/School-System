import {Person} from "./person";
import {Lecture} from "./lecture";

export interface Class {
    id: string;
    slug: string;
    name: string;
    students: Person[];
    departmentHeadForClassId: string | null | undefined;
    lectures: Lecture
}
