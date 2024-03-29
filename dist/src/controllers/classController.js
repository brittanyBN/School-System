"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClass = exports.updateClass = exports.getClass = exports.getClasses = exports.newClass = void 0;
const client_1 = __importDefault(require("../utils/client"));
const class_schema_1 = require("../lib/schemas/class.schema");
// POST NEW CLASS
function newClass(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const validateClass = class_schema_1.ClassSchema.parse(data);
            const class_ = yield client_1.default.class.create({
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
            yield client_1.default.person.update({
                where: { personalNumber: data.departmentHeadForClassId },
                data: {
                    departmentHeadForClassId: data.departmentHeadForClassId
                }
            });
            res.status(201).json(class_);
        }
        catch (err) {
            return res.status(500).json({
                message: "Error creating class",
                error: err,
            });
        }
    });
}
exports.newClass = newClass;
// GET ALL CLASSES
function getClasses(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const classes = yield client_1.default.class.findMany();
            res.status(200).json({
                message: "classes fetched",
                data: classes,
            });
        }
        catch (err) {
            return res.status(500).json({
                message: "Error fetching classes",
                error: err,
            });
        }
    });
}
exports.getClasses = getClasses;
// GET CLASS BY SLUG
function getClass(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { slug } = req.params;
            const class_ = yield client_1.default.class.findUnique({
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
        }
        catch (err) {
            return res.status(500).json({
                message: "Error fetching class",
                error: err,
            });
        }
    });
}
exports.getClass = getClass;
// UPDATE CLASS BY ID
function updateClass(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const data = req.body;
        const validateClass = class_schema_1.ClassSchema.parse(data);
        try {
            const class_ = yield client_1.default.class.update({
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
            yield client_1.default.person.update({
                where: { personalNumber: data.departmentHeadForClassId },
                data: {
                    departmentHeadForClassId: data.departmentHeadForClassId
                }
            });
            res.status(200).json({
                message: "class updated",
                data: class_,
            });
        }
        catch (err) {
            return res.status(500).json({
                message: "Error updating class",
                error: err,
            });
        }
    });
}
exports.updateClass = updateClass;
// DELETE CLASS BY ID
function deleteClass(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            yield client_1.default.$transaction([
                client_1.default.personOnLecture.deleteMany({
                    where: {
                        lecture: {
                            classId: id
                        }
                    }
                }),
                client_1.default.class.delete({
                    where: { id },
                }),
            ]);
            yield client_1.default.person.updateMany({
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
        }
        catch (err) {
            return res.status(500).json({
                message: "Error deleting class",
                error: err,
            });
        }
    });
}
exports.deleteClass = deleteClass;
