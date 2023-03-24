"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassSchema = void 0;
const zod_1 = require("zod");
exports.ClassSchema = zod_1.z.object({
    name: zod_1.z.string(),
    slug: zod_1.z.string(),
    students: zod_1.z.array(zod_1.z.string()).optional(),
    departmentHeadForClassId: zod_1.z.string().nullable().optional(),
    lectures: zod_1.z.array(zod_1.z.string()).optional(),
});
