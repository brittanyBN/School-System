import { Request, Response } from "express";
import prisma from "../utils/client";
import { Class } from "../lib/types/class";
import { Lecture } from "../lib/types/lecture";
import { Person } from "../lib/types/person";

// POST NEW CLASS
export async function newClass(req: Request, res: Response) {
    try {
        const data: Class = req.body;
        const class_ = await prisma.class.create({
            data: {
                id: data.id,
                slug: data.slug,
                name: data.name,
            },
            include: {
                students: {
                    select: {
                        name: true,
                    }
                }
            }
        });
        res.status(201).json(class_);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not create new class' });
    }
}

// GET ALL CLASSES
export async function getClasses(req: Request, res: Response) {
    try {
    const data = req.body;
    const classes = await prisma.class.findMany();
    res.status(200).json({
        message: "classes fetched",
        data: classes,
    });
    } catch (err) {
        return res.status(500).json({
            message: "classes not fetched",
            data: err,
        });
    }
}

// GET CLASS BY SLUG
export async function getClass(req: Request, res: Response) {
    try {
    const { slug } = req.params;
    const class_ = await prisma.class.findUnique({
        where: { slug },
        include: {
            students: {
                select: {
                    name: true,
                }
            }
        }
    });
    res.status(200).json({
        message: "class fetched",
        data: class_,
    });
    } catch (err) {
        return res.status(500).json({
            message: "class not fetched",
            data: err,
        });
    }
}

// UPDATE CLASS BY SLUG
export async function updateClass(req: Request, res: Response) {
    try {
    const { slug } = req.params;
    const data: Class = req.body;
    const class_ = await prisma.class.update({
        where: { slug },
        data: {
            slug: data.slug,
            name: data.name,
        },
    });
    res.status(201).json({
        message: "class updated",
        data: class_,
    });
    } catch (err) {
        return res.status(500).json({
            message: "class not updated",
            data: err,
        });
    }
}

// DELETE CLASS BY ID
export async function deleteClass(req: Request, res: Response) {
    const { id } = req.params;
    try {
        await prisma.$transaction([
            prisma.personOnLecture.deleteMany({
                where: {
                    lecture: {
                        classId: id
                    }
                }
            }),
            prisma.class.delete({
                where: { id },
            }),
        ]);
        res.status(200).json({
            message: "Class deleted",
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete class",
            error,
        });
    }
}


