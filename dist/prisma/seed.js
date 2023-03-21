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
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDb = void 0;
const person_seed_1 = require("./databaseSeeder/person.seed");
const class_seed_1 = require("./databaseSeeder/class.seed");
const lecture_seed_1 = require("./databaseSeeder/lecture.seed");
function seedDb(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, person_seed_1.seedPersons)();
        yield (0, class_seed_1.seedClasses)();
        yield (0, lecture_seed_1.seedLectures)();
        return res.status(201).json({
            message: "Seeder done",
        });
    });
}
exports.seedDb = seedDb;
