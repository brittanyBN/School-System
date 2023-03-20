// import { faker } from "@faker-js/faker";
// import prisma from "../../src/utils/client";
// import { randomClass } from "./class.seed";
// import { randomPerson } from "./person.seed";
//
// export const fakerLecture = async () => ({
//     slug: faker.lorem.slug(),
//     className: faker.commerce.department(),
//     time: faker.datatype.datetime(),
//     description: faker.commerce.productDescription(),
//     teacherId: await randomPerson(),
//     classId: await randomClass(),
// });
//
// export async function randomLecture() {
//     const lecture = await prisma.lecture.findMany();
//     const random = Math.floor(Math.random() * lecture.length);
//     return lecture[random].id;
// }
//
// export async function seedLectures() {
//     for (let i = 0; i < 20; i++) {
//         const lectureData = await fakerLecture();
//         await prisma.lecture.createMany({ data: { ...lectureData } });
//     }
// }