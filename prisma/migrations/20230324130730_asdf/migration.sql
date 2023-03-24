-- DropForeignKey
ALTER TABLE "Lecture" DROP CONSTRAINT "Lecture_classId_fkey";

-- DropForeignKey
ALTER TABLE "Lecture" DROP CONSTRAINT "Lecture_teacherId_fkey";

-- AlterTable
ALTER TABLE "Lecture" ALTER COLUMN "classId" DROP NOT NULL,
ALTER COLUMN "teacherId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Lecture" ADD CONSTRAINT "Lecture_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lecture" ADD CONSTRAINT "Lecture_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Person"("personalNumber") ON DELETE SET NULL ON UPDATE CASCADE;
