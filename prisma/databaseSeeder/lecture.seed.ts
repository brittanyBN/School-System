import {faker} from "@faker-js/faker";
import prisma from "../../src/utils/client";
import {randomClass} from "./class.seed";
import {randomTeacher} from "./person.seed";
import {Lecture, Prisma} from "@prisma/client";

export const fakerLecture = async (): Promise<{ classId: string; teacherId: string; description: string; className: string; id: string; time: Date; slug: string }> => {
    return {
        id: faker.helpers.unique(faker.random.numeric, [10]),
        slug: faker.helpers.unique(faker.lorem.slug, [1]),
        className: faker.commerce.department(),
        time: faker.datatype.datetime(),
        description: faker.commerce.productDescription(),
        classId: await randomClass(),
        teacherId: await randomTeacher(),
    };
};

export async function createRandomPersonOnLecture() {
    const personOnLecture = [];
    for (let i = 0; i < 5; i++) {
        const lecture = await prisma.lecture.findMany();
        const lectureId = lecture[i].id;
        let personId = lecture[i].teacherId;
        if (!personId) {
            throw new Error('No teacher found');
        }
        personOnLecture.push({
            lectureId,
            personId,
            attended: true
        });
    }
    return personOnLecture;
}

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