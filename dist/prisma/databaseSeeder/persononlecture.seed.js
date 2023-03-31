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
exports.randomPersonOnLecture = exports.seedPersonOnLecture = exports.fakerPersonOnLecture = void 0;
const client_1 = __importDefault(require("../../src/utils/client"));
const person_seed_1 = require("./person.seed");
const lecture_seed_1 = require("./lecture.seed");
const fakerPersonOnLecture = () => __awaiter(void 0, void 0, void 0, function* () {
    return ({
        personId: yield (0, person_seed_1.randomPerson)(),
        lectureId: yield (0, lecture_seed_1.randomLecture)(),
        attended: true,
    });
});
exports.fakerPersonOnLecture = fakerPersonOnLecture;
function seedPersonOnLecture() {
    return __awaiter(this, void 0, void 0, function* () {
        const iterations = 5;
        const personOnLecture = new Array(iterations);
        for (let i = 0; i < iterations; i++) {
            personOnLecture.push(yield (0, exports.fakerPersonOnLecture)());
            yield client_1.default.personOnLecture.create({ data: yield (0, exports.fakerPersonOnLecture)() });
            console.count("personOnLecture");
        }
        yield client_1.default.personOnLecture.createMany({ data: personOnLecture });
    });
}
exports.seedPersonOnLecture = seedPersonOnLecture;
function randomPersonOnLecture() {
    return __awaiter(this, void 0, void 0, function* () {
        const personOnLecture = yield client_1.default.personOnLecture.findMany();
        if (personOnLecture.length === 0) {
            throw new Error('No personOnLecture found');
        }
        const random = personOnLecture[Math.floor(Math.random() * personOnLecture.length)];
        return [random.lectureId, random.personId, random.attended];
    });
}
exports.randomPersonOnLecture = randomPersonOnLecture;
