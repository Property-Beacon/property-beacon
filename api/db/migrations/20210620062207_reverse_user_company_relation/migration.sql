/*
  Warnings:

  - You are about to drop the column `userProfileId` on the `Company` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[companyId]` on the table `UserProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_userProfileId_fkey";

-- DropIndex
DROP INDEX "Company.userProfileId_unique";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "userProfileId";

-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "companyId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile.companyId_unique" ON "UserProfile"("companyId");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
