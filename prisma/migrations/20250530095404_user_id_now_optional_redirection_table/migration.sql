-- DropForeignKey
ALTER TABLE "Redirection" DROP CONSTRAINT "Redirection_userId_fkey";

-- AlterTable
ALTER TABLE "Redirection" ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "VerificationCode" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '10 minutes';

-- AddForeignKey
ALTER TABLE "Redirection" ADD CONSTRAINT "Redirection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
