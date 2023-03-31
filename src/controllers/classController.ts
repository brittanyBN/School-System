import { Request, Response } from "express";
import prisma from "../utils/client";
import { Class } from "../lib/types/class";
import { ClassSchema } from "../lib/schemas/class.schema";

// POST NEW CLASS
export async function newClass(req: Request, res: Response) {
    try {
        const data: Class = req.body;
        const validateClass = ClassSchema.parse(data);
        const class_ = await prisma.class.create({
            data: {
                slug: data.slug,
                name: data.name,
                departmentHeadForClassId: data.departmentHeadForClassId
            },
            include: {
                students: {
                    select: {
                        name: true,
                    }
                },
                departmentHead: {
                    select: {
                        name: true,
                    }
                }
            }
        });
        await prisma.person.update({
            where: {personalNumber: data.departmentHeadForClassId},
            data: {
                departmentHeadForClassId: data.departmentHeadForClassId
            }
        });
        res.status(201).json(class_);
    } catch (err) {
        return res.status(500).json({
            message: "Error creating class",
            error: err,
        });
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
            message: "Error fetching classes",
            error: err,
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
    if (class_ === null) {
            return res.status(404).json({
                message: "Class not found",
            });
    }
        res.status(200).json({
            message: "class fetched",
            data: class_,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error fetching class",
            error: err,
        });
    }
}

// UPDATE CLASS BY ID
export async function updateClass(req: Request, res: Response) {
    const { id } = req.params;
    const data: Class = req.body;
    const validateClass = ClassSchema.parse(data);
    try {
        const class_ = await prisma.class.update({
            where: { id },
            data: {
                slug: data.slug,
                name: data.name,
                departmentHeadForClassId: data.departmentHeadForClassId
            },
            include: {
                students: {
                    select: {
                        name: true,
                    }
                },
                departmentHead: {
                    select: {
                        name: true,
                    }
                }
            }
        });
        await prisma.person.update({
            where: { personalNumber: data.departmentHeadForClassId },
            data: {
                departmentHeadForClassId: data.departmentHeadForClassId
            }
        });
        res.status(200).json({
            message: "class updated",
            data: class_,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error updating class",
            error: err,
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
        await prisma.person.updateMany({
            where: {
                class: {
                     id
                }
            },
            data: {
                departmentHeadForClassId: null
            }
        });
        res.status(200).json({
            message: "Class deleted",
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error deleting class",
            error: err,
        });
    }
}


