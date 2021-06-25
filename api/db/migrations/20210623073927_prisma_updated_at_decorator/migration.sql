/*
  Warnings:

  - You are about to drop the column `modified` on the `UserProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "CompanyProfile" ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "modified",
ADD COLUMN     "updatedAt" TIMESTAMP(3);
