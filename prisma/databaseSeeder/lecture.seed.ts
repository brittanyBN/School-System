import {faker} from "@faker-js/faker";
import prisma from "../../src/utils/client";
import {randomClass} from "./class.seed";
import {randomPerson} from "./person.seed";
import {Lecture, Prisma} from "@prisma/client";

export const fakerLecture = async (): Promise<Prisma.LectureCreateInput> => {
    return {
        id: faker.datatype.uuid(),
        slug: faker.lorem.slug(),
        className: faker.commerce.department(),
        time: faker.datatype.datetime(),
        description: faker.commerce.productDescription(),
    };
};

export async function randomLecture() {
    const lecture = await prisma.lecture.findMany();
    const random = lecture[Math.floor(Math.random() * lecture.length)] as Lecture;
    return random.id;
}

export async function seedLectures() {
    const iterations = 5;
    const lectures = new Array(iterations)
    for (let i = 0; i < iterations; i++) {
        lectures.push(await fakerLecture())
        console.count("lecture")
    }
    await prisma.lecture.createMany({ data: lectures  });
}