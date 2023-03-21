import {faker} from "@faker-js/faker";
import prisma from "../../src/utils/client";
import {randomClass} from "./class.seed";
import {randomPerson} from "./person.seed";
import {Lecture} from "@prisma/client";

export const fakerLecture = async (): Promise<Lecture> => ({
        id: faker.datatype.uuid(),
        slug: faker.lorem.slug(),
        className: faker.commerce.department(),
        time: faker.datatype.datetime(),
        description: faker.commerce.productDescription(),
        classId: await randomClass(),
        teacherId: await randomPerson(),
});

export async function seedLectures() {
    for (let i = 0; i < 20; i++) {
        const lectureData = await fakerLecture();
        await prisma.lecture.createMany({ data: { ...lectureData } });
    }
}