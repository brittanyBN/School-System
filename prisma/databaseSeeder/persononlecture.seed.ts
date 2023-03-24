import prisma from "../../src/utils/client";
import { randomPerson } from "./person.seed";
import { randomLecture} from "./lecture.seed";
import {PersonOnLecture} from "@prisma/client";

export const fakerPersonOnLecture = async (): Promise<PersonOnLecture> => ({
    personId: await randomPerson(),
    lectureId: await randomLecture(),
    attended: true,
});

export async function seedPersonOnLecture() {
    for (let i = 0; i < 20; i++) {
        const personOnLectureData = await fakerPersonOnLecture();
        await prisma.personOnLecture.createMany({ data: { ...personOnLectureData } });
    }
}

export async function randomPersonOnLecture() {
    const personOnLecture = await prisma.personOnLecture.findMany();
    if (personOnLecture.length === 0) {
        throw new Error('No personOnLecture found');
    }
    const random = personOnLecture[Math.floor(Math.random() * personOnLecture.length)]
    return [random.lectureId,random.personId,random.attended];
}




