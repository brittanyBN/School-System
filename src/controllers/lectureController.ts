import { Request, Response } from "express";
import prisma from "../utils/client";
import {Person} from "../lib/types/person";
import {PersonOnLecture} from "@prisma/client";
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
                time: data.time,
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
        console.log(data);
        return res.json({
            message: "lecture created",
            data: lecture,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "lecture not created",
            data: err,
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
            message: "lectures not fetched",
            data: err,
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
        res.json({
            message: "lecture fetched",
            data: lecture,
        });
    } catch (err) {
        return res.status(500).json({
            message: "lecture not fetched",
            data: err,
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
                time: data.time,
                description: data.description,
                students: {
                    create: data.students ? data.students.map((person: Person) => {
                        return {
                            person: {
                                connect: {
                                    personalNumber: person
                                }
                            },
                        }
                    }) : []
                },
            },
            include: {
                students: true,
            },
        });
        return res.json({
            message: "lecture updated",
            data: lecture,
        });
    } catch (err) {
        return res.status(500).json({
            message: "lecture not updated",
            data: err,
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
        console.log(err);
        return res.status(500).json({
            message: "lecture not deleted",
            data: err,
        });
    }
}