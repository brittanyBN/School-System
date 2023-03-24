import { faker } from "@faker-js/faker";
import prisma from "../../src/utils/client";
import {fakerPerson} from "./person.seed";
import {Class} from "@prisma/client";
import {Person} from "../../src/lib/types/person";

export const fakerClass = (): Class => <Class>({
    id: faker.random.numeric(10),
    slug: faker.lorem.slug(1),
    name: faker.commerce.department(),
});

export async function randomClass() {
    const class_ = await prisma.class.findMany();
    if (class_.length === 0) {
        throw new Error('No classes found');
    }
    const random = class_[Math.floor(Math.random() * class_.length)] as Class;
    return random.id;
}

export async function seedClasses() {
    const iterations = 5;
    const classes = new Array(iterations)
    for (let i = 0; i < iterations; i++) {
        classes.push(fakerClass())
        console.count("class")
    }
    await prisma.class.createMany({ data: classes  });
}
