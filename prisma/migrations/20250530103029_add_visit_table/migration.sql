-- AlterTable
ALTER TABLE "VerificationCode" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '10 minutes';

-- CreateTable
CREATE TABLE "Visit" (
    "id" SERIAL NOT NULL,
    "redirectionId" INTEGER NOT NULL,
    "ipAddress" VARCHAR(45),
    "browser" VARCHAR(255),
    "os" VARCHAR(255),
    "platform" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Visit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_redirectionId_fkey" FOREIGN KEY ("redirectionId") REFERENCES "Redirection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
