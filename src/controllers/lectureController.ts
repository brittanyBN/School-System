import { Request, Response } from "express";
import prisma from "../utils/client";

// POST NEW LECTURE
export async function newLecture(req: Request, res: Response) {
    try {
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
    } catch (err) {
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
    const lecture = await prisma.lecture.update({
        where: { slug },
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
    } catch (err) {
        return res.status(500).json({
            message: "lecture not updated",
            data: err,
        });
    }
}

// DELETE LECTURE BY SLUG
export async function deleteLecture(req: Request, res: Response) {
    try {
    const { slug } = req.params;
    const lecture = await prisma.lecture.delete({
        where: { slug },
    });
    return res.json({
        message: "lecture deleted",
        data: lecture,
    });
    } catch (err) {
        return res.status(500).json({
            message: "lecture not deleted",
            data: err,
        });
    }
}
