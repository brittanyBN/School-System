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
exports.deletePerson = exports.updatePerson = exports.getPerson = exports.getPersons = exports.newPerson = exports.login = void 0;
const client_1 = __importDefault(require("../utils/client"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const person_schema_1 = require("../lib/schemas/person.schema");
// LOGIN VALIDATION
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { personalNumber, password } = req.body;
            const person = yield client_1.default.person.findUnique({
                where: {
                    personalNumber,
                },
            });
            if (!person) {
                return res.status(404).json({
                    message: "invalid username or password",
                });
            }
            const match = bcryptjs_1.default.compareSync(password, person.password);
            if (!match) {
                return res.status(404).json({
                    message: "invalid username or password",
                });
            }
            return res.status(200).json({
                message: "logged in successfully",
            });
        }
        catch (err) {
            return res.status(500).json({
                message: "Error logging in",
                error: err,
            });
        }
    });
}
exports.login = login;
// POST NEW PERSON
function newPerson(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = person_schema_1.PersonSchema.parse(req.body);
            const validatePerson = person_schema_1.PersonSchema.parse(data);
            const salt = bcryptjs_1.default.genSaltSync();
            const hashedPassword = bcryptjs_1.default.hashSync(data.password, salt);
            const person = yield client_1.default.person.create({
                data: {
                    personalNumber: data.personalNumber,
                    name: data.name,
                    email: data.email,
                    password: hashedPassword,
                    role: data.role,
                    lectures: {
                        create: data.lectures ? data.lectures.map((lecture) => {
                            return {
                                lectureId: lecture.lectureId,
                                personId: {
                                    connect: {
                                        personalNumber: data.personalNumber,
                                    }
                                },
                                attended: lecture.attended,
                            };
                        }) : []
                    },
                    classId: data.classId,
                    departmentHeadForClassId: data.departmentHeadForClassId,
                },
                include: {
                    lectures: {
                        select: {
                            lecture: true,
                        }
                    },
                    class: true,
                },
            });
            return res.status(201).json({
                message: "person created",
                data: person,
            });
        }
        catch (err) {
            return res.status(500).json({
                message: "Error creating person",
                error: err,
            });
        }
    });
}
exports.newPerson = newPerson;
// GET ALL PERSONS
function getPersons(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const persons = yield client_1.default.person.findMany();
            res.status(201).json({
                message: "persons fetched",
                data: persons,
            });
        }
        catch (err) {
            return res.status(500).json({
                message: "Error fetching persons",
                error: err,
            });
        }
    });
}
exports.getPersons = getPersons;
// GET PERSON BY PERSONAL NUMBER
function getPerson(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { personalNumber } = req.params;
            const person = yield client_1.default.person.findUnique({
                where: {
                    personalNumber,
                },
            });
            if (!person) {
                return res.status(404).json({
                    message: "person not found",
                });
            }
            return res.status(201).json({
                message: "person fetched",
                data: person,
            });
        }
        catch (err) {
            return res.status(500).json({
                message: "Error fetching person",
                error: err,
            });
        }
    });
}
exports.getPerson = getPerson;
// UPDATE PERSON BY PERSONAL NUMBER
function updatePerson(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { personalNumber } = req.params;
            const data = req.body;
            const validatePerson = person_schema_1.PersonSchema.parse(data);
            const person = yield client_1.default.person.update({
                where: {
                    personalNumber,
                },
                data: {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    role: data.role,
                },
            });
            return res.status(201).json({
                message: "person updated",
                data: person,
            });
        }
        catch (err) {
            return res.status(500).json({
                message: "Error updating person",
                error: err,
            });
        }
    });
}
exports.updatePerson = updatePerson;
// DELETE PERSON BY PERSONAL NUMBER AND ALL RELATED ENTRIES
function deletePerson(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { personalNumber } = req.params;
        try {
            yield client_1.default.$transaction([
                client_1.default.personOnLecture.deleteMany({
                    where: {
                        person: {
                            personalNumber,
                        },
                    },
                }),
                client_1.default.person.delete({
                    where: {
                        personalNumber,
                    },
                }),
            ]);
            return res.status(201).json({
                message: "Person deleted",
            });
        }
        catch (error) {
            return res.status(500).json({
                message: "Failed to delete person",
                error,
            });
        }
    });
}
exports.deletePerson = deletePerson;
