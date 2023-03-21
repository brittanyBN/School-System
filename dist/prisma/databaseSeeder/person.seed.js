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
exports.seedPersons = exports.randomPerson = exports.personBrittany = exports.fakerPerson = void 0;
const faker_1 = require("@faker-js/faker");
const client_1 = __importDefault(require("../../src/utils/client"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const passwordHash = (pw) => {
    return bcryptjs_1.default.hashSync(pw, 10);
};
const fakerPerson = () => ({
    personalNumber: faker_1.faker.datatype.uuid(),
    name: faker_1.faker.name.firstName(),
    email: faker_1.faker.internet.email(),
    password: passwordHash(faker_1.faker.internet.password()),
    role: "STUDENT",
    createdAt: faker_1.faker.date.recent(),
});
exports.fakerPerson = fakerPerson;
exports.personBrittany = {
    name: "Brittany",
    email: "brittany@aol.com",
    password: "britt",
};
function randomPerson() {
    return __awaiter(this, void 0, void 0, function* () {
        const person = yield client_1.default.person.findMany();
        const random = Math.floor(Math.random() * person.length);
        return person[random].personalNumber;
    });
}
exports.randomPerson = randomPerson;
function seedPersons() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < 20; i++) {
            yield client_1.default.person.createMany({ data: (0, exports.fakerPerson)() });
        }
    });
}
exports.seedPersons = seedPersons;
