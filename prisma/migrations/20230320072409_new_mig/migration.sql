/*
  Warnings:

  - A unique constraint covering the columns `[departmentHeadForClassId]` on the table `Class` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[departmentHeadForClassId]` on the table `Person` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `classId` to the `Lecture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacherId` to the `Lecture` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Person" DROP CONSTRAINT "Person_classId_fkey";

-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "departmentHeadForClassId" TEXT;

-- AlterTable
ALTER TABLE "Lecture" ADD COLUMN     "classId" TEXT NOT NULL,
ADD COLUMN     "teacherId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "departmentHeadForClassId" TEXT,
ALTER COLUMN "classId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PersonOnLecture" ADD COLUMN     "attended" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Class_departmentHeadForClassId_key" ON "Class"("departmentHeadForClassId");

-- CreateIndex
CREATE UNIQUE INDEX "Person_departmentHeadForClassId_key" ON "Person"("departmentHeadForClassId");

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_departmentHeadForClassId_fkey" FOREIGN KEY ("departmentHeadForClassId") REFERENCES "Person"("personalNumber") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lecture" ADD CONSTRAINT "Lecture_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lecture" ADD CONSTRAINT "Lecture_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Person"("personalNumber") ON DELETE RESTRICT ON UPDATE CASCADE;
