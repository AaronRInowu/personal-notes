import { ModalTitle } from "@/components/Displays/ModalTitle";
import { toastOptions } from "@/global/templates/general.template";
import { patchNote } from "@/services/general.services";
import { Slash } from "iconsax-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ReactModal from "react-modal";
import { toast } from "react-toastify";

export const ToggleImportant = ({
  item,
}: {
  item: { id: string; title: string; isImportant: boolean };
}) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
  };
  const handleImportance = async () => {
    try {
      await patchNote(item.id, { isImportant: !item.isImportant });
      router.refresh();
      closeModal();
      toast.success(":)", toastOptions);
    } catch (error) {
      console.error(error);
      toast.error(">:(", toastOptions);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpenModal(true)}
        className="relative bg-warning flex-center justify-center rounded-xl p-2 w-8 h-8"
      >
        {item.isImportant && (
          <Slash size={24} className="align-abs-middle" color="currentColor" />
        )}
        !
      </button>
      <ReactModal isOpen={openModal} className={"default-modal sm"}>
        <div className="main-container !p-3">
          <ModalTitle title="Importante" onClose={closeModal} />
          <p>
            {item.isImportant
              ? "Quitar importancia "
              : "Marcar como importante "}{" "}
            de <b>{item.title}</b>?
          </p>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="regular-btn-padding bg-neutral-200 rounded-xl"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleImportance}
              className="regular-btn-padding bg-warning rounded-xl"
            >
              Aceptar
            </button>
          </div>
        </div>
      </ReactModal>
    </>
  );
};
