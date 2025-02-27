import { Notes } from "@prisma/client";

export const returnNoteInitial = (note: Notes) => {
  return {
    title: note.title,
    desc: note.desc ?? "",
    update: "",
    status: note.status,
    isImportant: note.isImportant,
  };
};
