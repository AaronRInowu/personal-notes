/*
  Warnings:

  - Made the column `createdAt` on table `Category` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `Notes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "createdAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Notes" ALTER COLUMN "createdAt" SET NOT NULL;
