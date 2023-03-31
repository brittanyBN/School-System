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
exports.deleteLecture = exports.updateLecture = exports.getLecture = exports.getLectures = exports.newLecture = void 0;
const client_1 = __importDefault(require("../utils/client"));
const lecture_schema_1 = require("../lib/schemas/lecture.schema");
// POST NEW LECTURE
function newLecture(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const validateLecture = lecture_schema_1.LectureSchema.parse(data);
            const lecture = yield client_1.default.lecture.create({
                data: {
                    slug: data.slug,
                    className: data.className,
                    description: data.description,
                    time: new Date(data.time).toISOString(),
                    students: {
                        create: data.students ? data.students.map((person) => {
                            return {
                                person: {
                                    connect: {
                                        personalNumber: person
                                    }
                                }
                            };
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
        }
        catch (err) {
            return res.status(500).json({
                message: "Error creating lecture",
                error: err,
            });
        }
    });
}
exports.newLecture = newLecture;
// GET ALL LECTURES
function getLectures(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const lectures = yield client_1.default.lecture.findMany({
                include: {
                    students: true,
                },
            });
            return res.json({
                message: "lectures fetched",
                data: lectures,
            });
        }
        catch (err) {
            return res.status(500).json({
                message: "Error fetching lectures",
                error: err,
            });
        }
    });
}
exports.getLectures = getLectures;
// GET LECTURE BY SLUG
function getLecture(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { slug } = req.params;
            const lecture = yield client_1.default.lecture.findUnique({
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
        }
        catch (err) {
            return res.status(500).json({
                message: "Error fetching lecture",
                error: err,
            });
        }
    });
}
exports.getLecture = getLecture;
// UPDATE LECTURE BY SLUG
function updateLecture(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { slug } = req.params;
            const data = req.body;
            const validateLecture = lecture_schema_1.LectureSchema.parse(data);
            const lecture = yield client_1.default.lecture.update({
                where: { slug },
                data: {
                    slug: data.slug,
                    className: data.className,
                    time: new Date(data.time).toISOString(),
                    description: data.description,
                    classId: data.class,
                    teacherId: data.teacher,
                    students: {
                        create: data.students ? data.students.map((person) => {
                            return {
                                person: {
                                    connect: {
                                        personalNumber: person
                                    }
                                }
                            };
                        }) : []
                    }
                },
                include: {
                    students: true,
                }
            });
            console.log(lecture);
            return res.json({
                message: "lecture updated",
                data: lecture,
            });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error updating lecture",
                error: err,
            });
        }
    });
}
exports.updateLecture = updateLecture;
// DELETE LECTURE BY ID
function deleteLecture(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            yield client_1.default.$transaction([
                client_1.default.personOnLecture.deleteMany({
                    where: {
                        lecture: {
                            id
                        },
                    }
                }),
                client_1.default.lecture.delete({
                    where: { id },
                }),
            ]);
            return res.status(200).json({
                message: "lecture deleted",
            });
        }
        catch (err) {
            return res.status(500).json({
                message: "Error deleting lecture",
                error: err,
            });
        }
    });
}
exports.deleteLecture = deleteLecture;
