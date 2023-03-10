import { Request, Response } from "express";
import prisma from "../utils/client";
import { Person } from "@prisma/client";

// POST NEW LECTURE
export async function newLecture(req: Request, res: Response) {
    const data = req.body;
    const lecture = await prisma.lecture.create({
        data: {
            slug: data.slug,
            className: data.className,
            time: data.time,
            description: data.description,
        },
    });

    return res.json({
        message: "lecture created",
        data: lecture,
    });
}

// GET ALL LECTURES
export async function getLectures(req: Request, res: Response) {
    const lectures = await prisma.lecture.findMany({
        include: {
            students: true,
        },
    });
    return res.json({
        message: "lectures fetched",
        data: lectures,
    });
}

// GET LECTURE BY SLUG
export async function getLecture(req: Request, res: Response) {
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
}

// UPDATE LECTURE BY ID
export async function updateLecture(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;
    const lecture = await prisma.lecture.update({
        where: { id },
        data: {
            slug: data.slug,
            className: data.className,
            time: data.time,
            description: data.description,
        },
    });
    return res.json({
        message: "lecture updated",
        data: lecture,
    });
}

// DELETE LECTURE BY ID
export async function deleteLecture(req: Request, res: Response) {
    const { id } = req.params;
    const lecture = await prisma.lecture.delete({
        where: { id },
    });
    return res.json({
        message: "lecture deleted",
        data: lecture,
    });
}
