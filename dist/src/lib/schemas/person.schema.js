"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonSchema = void 0;
const zod_1 = require("zod");
exports.PersonSchema = zod_1.z.object({
    personalNumber: zod_1.z.string(),
    name: zod_1.z.string(),
    email: zod_1.z.string(),
    password: zod_1.z.string(),
    role: zod_1.z.enum(['STUDENT', 'TEACHER']),
    createdAt: zod_1.z.date(),
    classId: zod_1.z.string().nullable().optional(),
    departmentHeadForClassId: zod_1.z.string().nullable().optional(),
});
