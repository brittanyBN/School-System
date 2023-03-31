import { Request, Response } from "express";
import prisma from "../utils/client";
import bcrypt from "bcryptjs";
import {PersonSchema} from "../lib/schemas/person.schema";

// POST NEW PERSON
export async function newPerson(req: Request, res: Response) {
    try {
        const data = PersonSchema.parse(req.body);
        const validatePerson = PersonSchema.parse(data);
        const salt = bcrypt.genSaltSync();
        const hashedPassword: string = bcrypt.hashSync(data.password, salt);

        const person = await prisma.person.create({
            data: {
                personalNumber: data.personalNumber,
                name: data.name,
                email: data.email,
                password: hashedPassword,
                role: data.role,
                classId: data.classId,
                departmentHeadForClassId: data.departmentHeadForClassId,
            },
            include:{
                lectures: {
                    select: {
                        lecture: true,
                    }
                },
                class: true,
            },
        });
        return res.status(201).json({
            message: "person created",
            data: person,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error creating person",
            error: err,
        });
    }
}

// GET ALL PERSONS
export async function getPersons(req: Request, res: Response) {
    try {
        const persons = await prisma.person.findMany();
        res.status(201).json({
            message: "persons fetched",
            data: persons,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error fetching persons",
            error: err,
        });
    }
}

// GET PERSON BY PERSONAL NUMBER
    export async function getPerson(req: Request, res: Response) {
        try {
            const {personalNumber} = req.params;
            const person = await prisma.person.findUnique({
                where: {
                    personalNumber,
                },
            });
            if (!person) {
                return res.status(404).json({
                    message: "person not found",
                });
            }
            return res.status(201).json({
                message: "person fetched",
                data: person,
            });
        } catch (err) {
            return res.status(500).json({
                message: "Error fetching person",
                error: err,
            });
        }
    }

// GET ALL LECTURES OF A PERSON BY THEIR PERSONAL NUMBER
    export async function getPersonLectures(req: Request, res: Response) {
        try {
            const {personalNumber} = req.params;
            const person = await prisma.person.findUnique({
                where: {
                    personalNumber,
                },
                include: {
                    lectures: {
                        select: {
                            lecture: true,
                        }
                    }
                }
            });
            if (!person) {
                return res.status(404).json({
                    message: "person not found",
                });
            }
            return res.status(201).json({
                message: "person lectures fetched",
                data: person.lectures,
            });
        } catch (err) {
            return res.status(500).json({
                message: "Error fetching person lectures",
                error: err,
            });
        }
    }

// UPDATE PERSON BY PERSONAL NUMBER
    export async function updatePerson(req: Request, res: Response) {
        try {
            const {personalNumber} = req.params;
            const data = req.body;
            const validatePerson = PersonSchema.parse(data);
            const person = await prisma.person.update({
                where: {
                    personalNumber,
                },
                data: {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    role: data.role,
                    classId: data.classId,
                    departmentHeadForClassId: data.departmentHeadForClassId
                },
            });
            return res.status(201).json({
                message: "person updated",
                data: person,
            });
        } catch (err) {
            return res.status(500).json({
                message: "Error updating person",
                error: err,
            });
        }
    }

// UPDATE PERSON ATTENDANCE BY PERSONAL NUMBER AND LECTURE ID
    export async function updatePersonAttendance(req: Request, res: Response) {
        try {
            const {personalNumber, id} = req.params;
            const data = req.body;
            console.log(data)
            const updatedAttendance = await prisma.personOnLecture.update({
                where: {
                    personId_lectureId: {
                        personId: personalNumber,
                        lectureId: id
                    }
                },
                data: {
                    attended: data.attended
                }
            })
            return res.status(201).json({
                message: "person attendance updated",
                data: updatedAttendance,
            });
        } catch (err) {
            return res.status(500).json({
                message: "Error updating person attendance",
                error: err,
            });
        }
    }


// DELETE PERSON BY PERSONAL NUMBER AND ALL RELATED ENTRIES
    export async function deletePerson(req: Request, res: Response) {
        const {personalNumber} = req.params;
        try {
            await prisma.$transaction([
                prisma.personOnLecture.deleteMany({
                    where: {
                        person: {
                            personalNumber,
                        },
                    },
                }),
                prisma.person.delete({
                    where: {
                        personalNumber,
                    },
                }),
            ]);

            return res.status(201).json({
                message: "Person deleted",
            });
        } catch (err) {
            return res.status(500).json({
                message: "Error deleting person",
                error: err,
            });
        }
    }





