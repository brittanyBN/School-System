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
exports.main = void 0;
const person_seed_1 = require("./databaseSeeder/person.seed");
const class_seed_1 = require("./databaseSeeder/class.seed");
const lecture_seed_1 = require("./databaseSeeder/lecture.seed");
const client_1 = require("@prisma/client");
const persononlecture_seed_1 = require("./databaseSeeder/persononlecture.seed");
const dotenv_1 = __importDefault(require("dotenv"));
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        dotenv_1.default.config();
        yield (0, class_seed_1.seedClasses)();
        yield (0, person_seed_1.seedPersons)();
        yield (0, lecture_seed_1.seedLectures)();
        yield (0, persononlecture_seed_1.seedPersonOnLecture)();
    });
}
exports.main = main;
main()
    .catch((e) => console.error(e))
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
//  npx prisma db seed
