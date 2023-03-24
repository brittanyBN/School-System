"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonOnLectureSchema = void 0;
const zod_1 = require("zod");
exports.PersonOnLectureSchema = zod_1.z.object({
    lectureId: zod_1.z.string(),
    personId: zod_1.z.string(),
    attended: zod_1.z.boolean(),
});
