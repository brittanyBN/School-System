import prisma from "../../src/utils/client";
import {createRandomPersonOnLecture, randomLecture} from "./lecture.seed";

export async function seedPersonOnLecture() {
    const personOnLecture = [];
    const randomPersonOnLecture = await createRandomPersonOnLecture();
    for (let i = 0; i < randomPersonOnLecture.length; i++) {
        personOnLecture.push(randomPersonOnLecture[i]);
        console.count("personOnLecture");
    }
    await prisma.personOnLecture.createMany({ data: personOnLecture });
}



