"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LectureSchema = void 0;
const zod_1 = require("zod");
exports.LectureSchema = zod_1.z.object({
    slug: zod_1.z.string(),
    className: zod_1.z.string(),
    time: zod_1.z.coerce.date(),
    description: zod_1.z.string(),
    students: zod_1.z.array(zod_1.z.string()).optional(),
    class: zod_1.z.string(),
    teacher: zod_1.z.string(),
});
