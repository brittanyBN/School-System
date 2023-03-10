import { Request, Response } from "express";
import prisma from "../utils/client";

// POST NEW CLASS
export async function newClass(req: Request, res: Response) {
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
}

// GET ALL CLASSES
export async function getClasses(req: Request, res: Response) {
    const data = req.body;
    const classes = await prisma.class.findMany();
    res.json({
        message: "classes fetched",
        data: classes,
    });
}

// GET CLASS BY SLUG
export async function getClass(req: Request, res: Response) {
    const { slug } = req.params;
    const class_ = await prisma.class.findUnique({
        where: { slug },
    });
    res.json({
        message: "class fetched",
        data: class_,
    });
}

// UPDATE CLASS BY ID
export async function updateClass(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;
    const class_ = await prisma.class.update({
        where: { id },
        data: {
            slug: data.slug,
            name: data.name,
        },
    });
    res.json({
        message: "class updated",
        data: class_,
    });
}

// DELETE CLASS BY ID
export async function deleteClass(req: Request, res: Response) {
    const { id } = req.params;
    const class_ = await prisma.class.delete({
        where: { id },
    });
    res.json({
        message: "class deleted",
        data: class_,
    });
}
