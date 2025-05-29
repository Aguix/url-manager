-- AlterTable
ALTER TABLE "VerificationCode" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '10 minutes';

-- CreateTable
CREATE TABLE "Redirection" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "alias" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Redirection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Redirection_alias_key" ON "Redirection"("alias");

-- AddForeignKey
ALTER TABLE "Redirection" ADD CONSTRAINT "Redirection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
