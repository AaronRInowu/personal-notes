"use server";
import { prisma } from "@/global/lib/prisma-client";
import { Prisma } from "@prisma/client";

export const postCategory = async (temp: Prisma.CategoryCreateInput) => {
  return await prisma.category.create({ data: temp });
};
export const postNote = async (temp: Prisma.NotesUncheckedCreateInput) => {
  return await prisma.notes.create({ data: temp });
};
