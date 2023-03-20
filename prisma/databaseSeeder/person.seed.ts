// import { faker } from "@faker-js/faker";
// import prisma from "../../src/utils/client";
// import { Person } from "../../src/lib/types/person"
// import bcrypt from "bcryptjs";
// import {fakerLecture, randomLecture} from "./lecture.seed"
//
// const passwordHash = (pw: string): string => {
//     return bcrypt.hashSync(pw, 10);
// }
//
// export const fakerPerson = async (): Promise<{
//     createdAt: Date;
//     password: string;
//     role: string; name: string;
//     personalNumber: string;
//     email: string;
//     teacherForLecture: string
// }> => ({
//     personalNumber: faker.datatype.uuid(),
//     name: faker.name.firstName(),
//     email: faker.internet.email(),
//     password: passwordHash("password"),
//     role: "STUDENT",
//     createdAt: faker.date.recent(),
//     teacherForLecture: await randomPerson(),
// });
//
// export const personBrittany = {
//     name: "Brittany",
//     email: "brittany@aol.com",
//     password: "britt",
// };
//
// export async function randomPerson() {
//     const person = await prisma.person.findMany();
//     const random = Math.floor(Math.random() * person.length);
//     return person[random].personalNumber;
// }
//
// export async function seedpersons() {
//     for (let i = 0; i < 20; i++) {
//         const personData = await fakerPerson();
//         await prisma.person.createMany({ data: { ...personData } });
//     }
// }
