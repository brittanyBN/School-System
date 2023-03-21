import { faker } from "@faker-js/faker";
import prisma from "../../src/utils/client";
import {fakerPerson} from "./person.seed";
import {Class} from "@prisma/client";

export const fakerClass = (): Class => <Class>({
    id: faker.datatype.uuid(),
    slug: faker.lorem.slug(),
    name: faker.commerce.department(),
});

export async function randomClass() {
    const class_ = await prisma.class.findMany();
    const random = Math.floor(Math.random() * class_.length);
    return class_[random].id;
}

export async function seedClasses() {
    for (let i = 0; i < 20; i++) {
        await prisma.class.createMany({ data: fakerClass() });
    }
}