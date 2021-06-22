/*
  Warnings:

  - Made the column `companyId` on table `CompanyProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `UserProfile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CompanyProfile" ALTER COLUMN "companyId" SET NOT NULL;

-- AlterTable
ALTER TABLE "UserProfile" ALTER COLUMN "userId" SET NOT NULL;
