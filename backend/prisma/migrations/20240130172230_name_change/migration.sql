-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'GUEST', 'USERS');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "refreshToken" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'GUEST';
