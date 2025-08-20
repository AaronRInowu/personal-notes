import { NoteStatus } from "@prisma/client";

export const toastOptions = { autoClose: 700, hideProgressBar: true };

export const noteStatusSelect = [
  {
    value: NoteStatus.QUEUE,
    name: "Sin iniciar",
    color: "#a8a0a8",
  },
  {
    value: NoteStatus.IN_PROCESS,
    name: "En proceso",
    color: "#e6d755",
  },
  {
    value: NoteStatus.STARTED,
    name: "Iniciada",
    color: "#e69b55",
  },
  {
    value: NoteStatus.WAITING,
    name: "Esperando",
    color: "#618bc8",
  },
  {
    value: NoteStatus.FINISHED,
    name: "Terminada",
    color: "#83d999",
  },
];
