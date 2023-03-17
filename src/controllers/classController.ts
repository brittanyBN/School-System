import { Request, Response } from "express";
import prisma from "../utils/client";

// POST NEW CLASS
export async function newClass(req: Request, res: Response) {
    try {
    const data = req.body;
    const class_ = await prisma.class.create({
        data: {
            slug: data.slug,
            name: data.name,
            students: {
                create: data.students,
            }
        },
        include: {
            students: true,
        }
    });
    return res.status(201).json({
        message: "class created",
        data: class_,
    });
    } catch (err) {
        return res.status(500).json({
            message: "class not created",
            data: err,
        });
    }
}

// GET ALL CLASSES
export async function getClasses(req: Request, res: Response) {
    try {
    const data = req.body;
    const classes = await prisma.class.findMany();
    res.json({
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
    res.json({
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
    const data = req.body;
    const class_ = await prisma.class.update({
        where: { slug },
        data: {
            slug: data.slug,
            name: data.name,
        },
    });
    res.json({
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
            // Delete related records in other tables
            prisma.person.deleteMany({
                where: {
                    class: {
                        id,
                    },
                },
            }),
            // Delete the class record
            prisma.class.delete({
                where: { id },
            }),
        ]);

        res.json({
            message: "Class deleted",
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete class",
            error,
        });
    }
}

