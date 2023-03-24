export interface Person {
    personalNumber: string;
    name: string;
    email: string;
    password: string;
    role: "STUDENT" | "TEACHER";
    createdAt: Date;
    classId: string | null;
    departmentHeadForClassId: string | null;
}