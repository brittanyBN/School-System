// import { Request, Response } from "express";
// import { seedPersons } from "./databaseSeeder/person.seed";
// import { seedClasses } from "./databaseSeeder/class.seed";
// import { seedLectures } from "./databaseSeeder/lecture.seed";
//
// export async function seedDb(req: Request, res: Response) {
//     await seedPersons();
//     await seedClasses();
//     await seedLectures();
//     return res.status(201).json({
//         message: "Seeder done",
//     });
// }