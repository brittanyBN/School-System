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
exports.seedLectures = exports.fakerLecture = void 0;
const faker_1 = require("@faker-js/faker");
const client_1 = __importDefault(require("../../src/utils/client"));
const class_seed_1 = require("./class.seed");
const person_seed_1 = require("./person.seed");
const fakerLecture = () => __awaiter(void 0, void 0, void 0, function* () {
    return ({
        id: faker_1.faker.datatype.uuid(),
        slug: faker_1.faker.lorem.slug(),
        className: faker_1.faker.commerce.department(),
        time: faker_1.faker.datatype.datetime(),
        description: faker_1.faker.commerce.productDescription(),
        classId: yield (0, class_seed_1.randomClass)(),
        teacherId: yield (0, person_seed_1.randomPerson)(),
    });
});
exports.fakerLecture = fakerLecture;
function seedLectures() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < 20; i++) {
            const lectureData = yield (0, exports.fakerLecture)();
            yield client_1.default.lecture.createMany({ data: Object.assign({}, lectureData) });
        }
    });
}
exports.seedLectures = seedLectures;