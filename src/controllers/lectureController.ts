import { Request, Response } from "express";
import prisma from "../utils/client";
import {Person} from "../lib/types/person";
import {LectureSchema} from "../lib/schemas/lecture.schema";

// POST NEW LECTURE
export async function newLecture(req: Request, res: Response) {
    try {
        const data = req.body;
        const validateLecture = LectureSchema.parse(data);
        const lecture = await prisma.lecture.create({
            data: {
                slug: data.slug,
                className: data.className,
                description: data.description,
                time: new Date(data.time).toISOString(),
                students: {
                    create: data.students ? data.students.map((person: Person) => {
                        return {
                            person: {
                                connect: {
                                    personalNumber: person
                                }
                            }
                        }
                    }) : []
                },
                classId: data.class,
                teacherId: data.teacher,
            },
        });
        return res.json({
            message: "lecture created",
            data: lecture,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error creating lecture",
            error: err,
        });
    }
}

// GET ALL LECTURES
export async function getLectures(req: Request, res: Response) {
    try {
        const lectures = await prisma.lecture.findMany({
            include: {
                students: true,
            },
        });
        return res.json({
            message: "lectures fetched",
            data: lectures,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error fetching lectures",
            error: err,
        });
    }
}

// GET LECTURE BY SLUG
export async function getLecture(req: Request, res: Response) {
    try {
        const { slug } = req.params;
        const lecture = await prisma.lecture.findUnique({
            where: { slug },
            include: {
                students: true,
            },
        });
        if (lecture === null) {
            return res.status(404).json({
                message: "Lecture not found",
            });
        }
        res.json({
            message: "lecture fetched",
            data: lecture,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error fetching lecture",
            error: err,
        });
    }
}

// UPDATE LECTURE BY SLUG
export async function updateLecture(req: Request, res: Response) {
    try {
        const { slug } = req.params;
        const data = req.body;
        const validateLecture = LectureSchema.parse(data);
        const lecture = await prisma.lecture.update({
            where: { slug },
            data: {
                slug: data.slug,
                className: data.className,
                time: new Date(data.time).toISOString(),
                description: data.description,
                classId: data.class,
                teacherId: data.teacher,
                students: {
                    create: data.students ? data.students.map((person: Person) => {
                        return {
                            person: {
                                connect: {
                                    personalNumber: person
                                }
                            }
                        }
                    }) : []
                }
            },
            include: {
                students: true,
            }
        });
        return res.json({
            message: "lecture updated",
            data: lecture,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error updating lecture",
            error: err,
        });
    }
}

// DELETE LECTURE BY ID
export async function deleteLecture(req: Request, res: Response) {
    const { id } = req.params;
    try {
        await prisma.$transaction([
            prisma.personOnLecture.deleteMany({
                where: {
                    lecture: {
                        id
                    },
                }
            }),
            prisma.lecture.delete({
                where: { id },
            }),
        ]);
        return res.status(200).json({
            message: "lecture deleted",
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error deleting lecture",
            error: err,
        });
    }
}