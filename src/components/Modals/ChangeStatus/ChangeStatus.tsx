import { ModalTitle } from "@/components/Displays/ModalTitle";
import {
  noteStatusSelect,
  toastOptions,
} from "@/global/templates/general.template";
import { patchNote } from "@/services/general.services";
import { NoteStatus } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

export const ChangeStatus = ({
  id,
  onClose,
  status,
}: {
  id: string;
  status: { prev: NoteStatus; new: string };
  onClose?: () => void;
}) => {
  const router = useRouter();
  const closeModal = () => {
    if (onClose) {
      onClose();
    }
  };
  const handleChange = async () => {
    try {
      await patchNote(id, { status: status.new as NoteStatus });
      closeModal();
      toast.error(">:(", toastOptions);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(">:(", toastOptions);
    }
  };

  return (
    <div className="p-3 flex flex-col gap-3">
      <ModalTitle title="Cambiar estado" onClose={onClose} />
      <p>
        Esta seguro que desea pasar esta nota a{" "}
        {noteStatusSelect.find((f) => f.value === status.new)?.name ??
          "otro estado"}
        ?
      </p>
      <div className="flex-center justify-between">
        <button
          type="button"
          onClick={closeModal}
          className="regular-btn-padding bg-neutral-200 rounded-xl"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={handleChange}
          className="regular-btn-padding bg-success text-white rounded-xl"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
};
