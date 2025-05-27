/*
  Warnings:

  - You are about to alter the column `sessionToken` on the `VerificationCode` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Char(36)`.

*/
-- AlterTable
ALTER TABLE "VerificationCode" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '10 minutes',
ALTER COLUMN "sessionToken" SET DATA TYPE CHAR(36);
