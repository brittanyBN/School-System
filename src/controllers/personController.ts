import { Request, Response } from "express";
import prisma from "../utils/client";
import bcrypt from "bcryptjs";

// LOGIN VALIDATION
export async function login(req: Request, res: Response) {
    const { personalNumber, password } = req.body;
    const person = await prisma.person.findUnique({
        where: {
            personalNumber,
        },
    });

    if (!person) {
        return res.status(404).json({
            message: "invalid username or password",
        });
    }

    const match = bcrypt.compareSync(password, person.password);
    if (!match) {
        return res.status(404).json({
            message: "invalid username or password",
        });
    }

    return res.status(200).json({
        message: "logged in successfully",
    });
}

// POST NEW PERSON
export async function newPerson(req: Request, res: Response) {
    try {
        const data = req.body;
        console.log(data);
        const salt = bcrypt.genSaltSync();
        const hashedPassword: string = bcrypt.hashSync(data.password, salt);

        const person = await prisma.person.create({
            data: {
                personalNumber: data.personalNumber,
                name: data.name,
                email: data.email,
                password: hashedPassword,
                role: data.role,
                lectures: {
                    create: data.lectures ? data.lectures.map((lecture: any) => {
                        return {
                            lecture: {
                                connect: {
                                    id: lecture,
                                },
                            },
                        };
                    }) : [],
                },
                classId: data.classId,
            },
            include: {
                lectures: {
                    select: {
                        lecture: true,
                    }
                },
                class: true,
            },
        });

        console.log(person);

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
    const persons = await prisma.person.findMany();
    res.status(201).json({
        message: "persons fetched",
        data: persons,
    });
}

// GET PERSON BY PERSONAL NUMBER
export async function getPerson(req: Request, res: Response) {
    const { personalNumber } = req.params;
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
}

// UPDATE PERSON BY PERSONAL NUMBER
export async function updatePerson(req: Request, res: Response) {
    const { personalNumber } = req.params;
    const data = req.body;
    const person = await prisma.person.update({
        where: {
            personalNumber,
        },
        data: {
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role,
        },
    });
    return res.status(201).json({
        message: "person updated",
        data: person,
    });
}

// DELETE PERSON BY PERSONAL NUMBER
export async function deletePerson(req: Request, res: Response) {
    const { personalNumber } = req.params;
    const person = await prisma.person.delete({
        where: {
            personalNumber,
        },
    });
    return res.status(201).json({
        message: "person deleted",
        data: person,
    });
}
