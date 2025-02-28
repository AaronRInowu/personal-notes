"use server";
import { prisma } from "@/global/lib/prisma-client";
import { Prisma } from "@prisma/client";

export const postCategory = async (temp: Prisma.CategoryCreateInput) => {
  return await prisma.category.create({ data: temp });
};
export const postNote = async (temp: Prisma.NotesUncheckedCreateInput) => {
  return await prisma.notes.create({ data: temp });
};
export const patchNote = async (id: string, temp: Prisma.NotesUpdateInput) => {
  return await prisma.notes.update({ data: temp, where: { id: id } });
};
export const patchCategory = async (
  id: string,
  temp: Prisma.CategoryUpdateInput
) => {
  return await prisma.category.update({ data: temp, where: { id: id } });
};
export const deleteItem = async (id: string, type: "note" | "cat") => {
  if (type === "note") {
    return await prisma.notes.delete({ where: { id: id } });
  }
  if (type === "cat") {
    return await prisma.category.delete({ where: { id: id } });
  }
  return { status: 404, msg: "no table" };
};
export const toggleItem = async (
  id: string,
  type: "note" | "cat",
  isActive: boolean
) => {
  if (type === "note") {
    return await prisma.notes.update({
      data: { isActive: !isActive },
      where: { id: id },
    });
  }
  if (type === "cat") {
    return await prisma.category.update({
      data: { isActive: !isActive },
      where: { id: id },
    });
  }
  return { status: 404, msg: "no table" };
};
