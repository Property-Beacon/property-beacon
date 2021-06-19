-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'CLIENT', 'CUSTOMER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "issuer" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT E'USER',
    "email" TEXT NOT NULL,
    "logOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "logOff" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "avatar" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "phone" TEXT,
    "mobile" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "userProfileId" TEXT,
    "name" TEXT NOT NULL,
    "displayName" TEXT,
    "shortName" TEXT,
    "website" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyProfile" (
    "id" TEXT NOT NULL,
    "companyId" TEXT,
    "phone" TEXT,
    "fax" TEXT,
    "mobile" TEXT,
    "fullName" TEXT,
    "email" TEXT,
    "abn" TEXT,
    "acn" TEXT,
    "crn" TEXT,
    "owner" TEXT,
    "mayor" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "userProfileId" TEXT,
    "companyProfileId" TEXT,
    "country" TEXT,
    "state" TEXT,
    "postalCode" TEXT,
    "street" TEXT,
    "name" TEXT,
    "suburb" TEXT,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.issuer_unique" ON "User"("issuer");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile.userId_unique" ON "UserProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Company.userProfileId_unique" ON "Company"("userProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyProfile.companyId_unique" ON "CompanyProfile"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Address.userProfileId_unique" ON "Address"("userProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "Address.companyProfileId_unique" ON "Address"("companyProfileId");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyProfile" ADD FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD FOREIGN KEY ("companyProfileId") REFERENCES "CompanyProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
