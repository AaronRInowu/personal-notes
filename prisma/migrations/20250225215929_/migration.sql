-- CreateEnum
CREATE TYPE "NoteStatus" AS ENUM ('QUEUE', 'STARTED', 'WAITING', 'IN_PROCESS', 'FINISHED');

-- AlterTable
ALTER TABLE "Notes" ADD COLUMN     "status" "NoteStatus" NOT NULL DEFAULT 'QUEUE';
