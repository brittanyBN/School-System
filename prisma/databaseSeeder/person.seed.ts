import { faker } from "@faker-js/faker";
import prisma from "../../src/utils/client";
import bcrypt from "bcryptjs";
import {randomClass} from "./class.seed";
import { Person } from "../../src/lib/types/person";

const passwordHash = (pw: string): string => {
    return bcrypt.hashSync(pw, 10);
}

enum Role {
    STUDENT = "STUDENT",
    TEACHER = "TEACHER"
}

function randomRole(): Role {
    const roles: Role[] = Object.values(Role);
    const randomIndex: number = Math.floor(Math.random() * roles.length);
    return roles[randomIndex];
}

export const fakerPerson = async (): Promise<Person> => ({
    personalNumber: faker.helpers.unique(faker.random.numeric, [10]),
    name: faker.name.firstName(),
    email: faker.helpers.unique(faker.internet.email),
    password: passwordHash(faker.internet.password()),
    role: randomRole(),
    createdAt: faker.date.recent(),
    classId: await randomClass(),
    departmentHeadForClassId: null,
});

export const personBrittany = {
    name: "Brittany",
    email: "brittany@aol.com",
    password: "britt",
    role: "TEACHER",
};

export async function randomPerson() {
    const person = await prisma.person.findMany();
    if (person.length === 0) {
        throw new Error('No persons found');
    }
    const random = person[Math.floor(Math.random() * person.length)] as Person
    return random.personalNumber;
}

export async function randomStudent() {
    const person = await prisma.person.findMany({
        where: {
            role: "STUDENT"
        }
    });
    if (person.length === 0) {
        throw new Error('No students found');
    }
    const random = person[Math.floor(Math.random() * person.length)] as Person
    return random.personalNumber;
}

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
    const iterations = 5;
    const persons = new Array(iterations)
    for (let i = 0; i < iterations; i++) {
        persons.push(await fakerPerson())
        console.count("person")
    }
    await prisma.person.createMany({ data: persons  });
}
