import { faker } from "@faker-js/faker";
import prisma from "../../src/utils/client";
import bcrypt from "bcryptjs";
import {randomClass} from "./class.seed";
import { Person } from "../../src/lib/types/person";

const passwordHash = (pw: string): string => {
    return bcrypt.hashSync(pw, 10);
};

export const fakerStudent = async (): Promise<Person> => ({
    personalNumber: faker.helpers.unique(faker.random.numeric, [10]),
    name: faker.name.firstName(),
    email: faker.helpers.unique(faker.internet.email),
    password: passwordHash(faker.internet.password()),
    role: "STUDENT",
    createdAt: faker.date.recent(),
    classId: await randomClass(),
    departmentHeadForClassId: null,
});

export const fakerTeacher = async (): Promise<Person> => ({
    personalNumber: faker.helpers.unique(faker.random.numeric, [10]),
    name: faker.name.firstName(),
    email: faker.helpers.unique(faker.internet.email),
    password: passwordHash(faker.internet.password()),
    role: "TEACHER",
    createdAt: faker.date.recent(),
    classId: await randomClass(),
    departmentHeadForClassId: null,
});

export async function randomTeacher() {
    const person = await prisma.person.findMany({
        where: {
            role: "TEACHER"
        }
    });
    if (person.length === 0) {
        throw new Error('No teachers found');
    }
    const random = person[Math.floor(Math.random() * person.length)] as Person
    return random.personalNumber;
}

export async function seedPersons() {
    const teacherIterations = 5;
    const studentIterations = 10;
    const persons = new Array(teacherIterations)
    for (let i = 0; i < teacherIterations; i++) {
        persons.push(await fakerTeacher())
        console.count("person")
    }
    for (let i = 0; i < studentIterations; i++) {
        persons.push(await fakerStudent())
        console.count("person")
    }
    await prisma.person.createMany({ data: persons  });
}
