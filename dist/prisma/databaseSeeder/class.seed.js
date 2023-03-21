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
exports.seedClasses = exports.randomClass = exports.fakerClass = void 0;
const faker_1 = require("@faker-js/faker");
const client_1 = __importDefault(require("../../src/utils/client"));
const fakerClass = () => ({
    id: faker_1.faker.datatype.uuid(),
    slug: faker_1.faker.lorem.slug(),
    name: faker_1.faker.commerce.department(),
});
exports.fakerClass = fakerClass;
function randomClass() {
    return __awaiter(this, void 0, void 0, function* () {
        const class_ = yield client_1.default.class.findMany();
        const random = Math.floor(Math.random() * class_.length);
        return class_[random].id;
    });
}
exports.randomClass = randomClass;
function seedClasses() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < 20; i++) {
            yield client_1.default.class.createMany({ data: (0, exports.fakerClass)() });
        }
    });
}
exports.seedClasses = seedClasses;
