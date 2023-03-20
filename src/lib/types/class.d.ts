import { Person } from './person';
import { Lecture } from './lecture';

export interface Class {
    id: string;
    slug: string;
    name: string;
    departmentHeadForClassId?: string;
    departmentHeadForClass: Person;
    students: Person[];
}