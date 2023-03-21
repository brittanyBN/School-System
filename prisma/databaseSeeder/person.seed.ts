import { faker } from "@faker-js/faker";
import prisma from "../../src/utils/client";
import bcrypt from "bcryptjs";
import { Person } from "../../src/lib/types/person";

const passwordHash = (pw: string): string => {
    return bcrypt.hashSync(pw, 10);
}

export const fakerPerson = (): Person => ({
    personalNumber: faker.datatype.uuid(),
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: passwordHash(faker.internet.password()),
    role: "STUDENT",
    createdAt: faker.date.recent(),
});

export const personBrittany = {
    name: "Brittany",
    email: "brittany@aol.com",
    password: "britt",
};

export async function randomPerson() {
    const person = await prisma.person.findMany();
    const random = Math.floor(Math.random() * person.length);
    return person[random].personalNumber;
}

export async function seedPersons() {
    for (let i = 0; i < 20; i++) {
        await prisma.person.createMany({ data: fakerPerson()});
    }
}
