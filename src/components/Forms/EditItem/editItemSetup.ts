import { Category, Notes } from "@prisma/client";

export const returnNoteInitial = (note: Notes) => {
  return {
    title: note.title,
    desc: note.desc ?? "",
    update: "",
    status: note.status,
    isImportant: note.isImportant,
  };
};
export const returnCategoryInitial = (note: Category) => {
  return {
    title: note.title,
    desc: note.desc ?? "",
    color: note.color ?? "#fff",
  };
};
