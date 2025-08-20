-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Notes" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
