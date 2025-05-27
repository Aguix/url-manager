/*
  Warnings:

  - A unique constraint covering the columns `[sessionToken]` on the table `VerificationCode` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "VerificationCode" ADD COLUMN     "sessionToken" VARCHAR(255),
ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '10 minutes';

-- CreateIndex
CREATE UNIQUE INDEX "VerificationCode_sessionToken_key" ON "VerificationCode"("sessionToken");
