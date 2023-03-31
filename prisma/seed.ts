import { seedPersons } from "./databaseSeeder/person.seed";
import { seedClasses } from "./databaseSeeder/class.seed";
import { seedLectures } from "./databaseSeeder/lecture.seed";
import {PrismaClient} from "@prisma/client";
import {seedPersonOnLecture} from "./databaseSeeder/persononlecture.seed";
import dotenv from "dotenv";

const prisma = new PrismaClient();


export async function main() {
    dotenv.config()
    await seedClasses();
    await seedPersons();
    await seedLectures();
    await seedPersonOnLecture();
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
