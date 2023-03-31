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
exports.seedPersons = exports.randomTeacher = exports.randomStudent = exports.randomPerson = exports.personBrittany = exports.fakerPerson = void 0;
const faker_1 = require("@faker-js/faker");
const client_1 = __importDefault(require("../../src/utils/client"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const class_seed_1 = require("./class.seed");
const passwordHash = (pw) => {
    return bcryptjs_1.default.hashSync(pw, 10);
};
var Role;
(function (Role) {
    Role["STUDENT"] = "STUDENT";
    Role["TEACHER"] = "TEACHER";
})(Role || (Role = {}));
function randomRole() {
    const roles = Object.values(Role);
    const randomIndex = Math.floor(Math.random() * roles.length);
    return roles[randomIndex];
}
const fakerPerson = () => __awaiter(void 0, void 0, void 0, function* () {
    return ({
        personalNumber: faker_1.faker.random.numeric(10),
        name: faker_1.faker.name.firstName(),
        email: faker_1.faker.internet.email(),
        password: passwordHash(faker_1.faker.internet.password()),
        role: randomRole(),
        createdAt: faker_1.faker.date.recent(),
        classId: yield (0, class_seed_1.randomClass)(),
        departmentHeadForClassId: null,
    });
});
exports.fakerPerson = fakerPerson;
exports.personBrittany = {
    name: "Brittany",
    email: "brittany@aol.com",
    password: "britt",
    role: "TEACHER",
};
function randomPerson() {
    return __awaiter(this, void 0, void 0, function* () {
        const person = yield client_1.default.person.findMany();
        if (person.length === 0) {
            throw new Error('No persons found');
        }
        const random = person[Math.floor(Math.random() * person.length)];
        return random.personalNumber;
    });
}
exports.randomPerson = randomPerson;
function randomStudent() {
    return __awaiter(this, void 0, void 0, function* () {
        const person = yield client_1.default.person.findMany({
            where: {
                role: "STUDENT"
            }
        });
        if (person.length === 0) {
            throw new Error('No students found');
        }
        const random = person[Math.floor(Math.random() * person.length)];
        return random.personalNumber;
    });
}
exports.randomStudent = randomStudent;
function randomTeacher() {
    return __awaiter(this, void 0, void 0, function* () {
        const person = yield client_1.default.person.findMany({
            where: {
                role: "TEACHER"
            }
        });
        if (person.length === 0) {
            throw new Error('No teachers found');
        }
        const random = person[Math.floor(Math.random() * person.length)];
        return random.personalNumber;
    });
}
exports.randomTeacher = randomTeacher;
function seedPersons() {
    return __awaiter(this, void 0, void 0, function* () {
        const iterations = 5;
        const persons = new Array(iterations);
        for (let i = 0; i < iterations; i++) {
            persons.push(yield (0, exports.fakerPerson)());
            console.count("person");
        }
        yield client_1.default.person.createMany({ data: persons });
    });
}
exports.seedPersons = seedPersons;
