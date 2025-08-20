"use client";
import { ModalTitle } from "@/components/Displays/ModalTitle";
import { toastOptions } from "@/global/templates/general.template";
import { deleteItem, toggleItem } from "@/services/general.services";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface IelimItem {
  closeModal?: () => void;
  item: { title: string; id: string; isActive: boolean };
  type: "cat" | "note";
  disableDelete?: boolean;
  onComplete?: () => void;
}

export const ElimItem = (props: IelimItem) => {
  const { type, closeModal, item, disableDelete, onComplete } = props;
  const router = useRouter();
  const [sureElim, setSureElim] = useState(false);

  const checkClose = () => {
    if (closeModal) {
      closeModal();
    }
  };

  const handleDelete = async () => {
    if (sureElim) {
      try {
        await deleteItem(item.id, type);
        router.refresh();
        toast.success(":)", toastOptions);
        if (onComplete) {
          onComplete();
        }
      } catch (error) {
        console.error(error);
        toast.error(">:(", toastOptions);
      }
    }
  };

  const handleActive = async () => {
    try {
      await toggleItem(item.id, type, item.isActive);
      router.refresh();
      checkClose();
      toast.success(":)", toastOptions);
      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      console.error(error);
      toast.error(">:(", toastOptions);
    }
  };

  return (
    <div className="p-3 flex flex-col gap-3">
      <ModalTitle title="Eliminar categoria" onClose={checkClose} />
      <p className="max-w-[320px] self-center text-center py-3">
        {sureElim ? (
          "Presiona eliminar de nuevo para confirmar eliminación."
        ) : (
          <>
            Quiere eliminar o desactivar <b>{item.title}</b>?
          </>
        )}
      </p>
      {disableDelete && (
        <p className="text-danger text-sm">
          *Elimina las notas relacionadas para habilitar la eliminacion
        </p>
      )}
      {sureElim ? (
        <div className="flex-center justify-between">
          <button
            type="button"
            disabled={!!disableDelete}
            onClick={handleDelete}
            className="regular-btn-padding bg-danger text-white rounded-xl"
          >
            Eliminar
          </button>
          <button
            type="button"
            onClick={() => setSureElim(false)}
            className="regular-btn-padding bg-neutral-200 rounded-xl"
          >
            Cancelar
          </button>
        </div>
      ) : (
        <div className="flex-center-3 justify-between">
          <button
            type="button"
            onClick={closeModal}
            className="regular-btn-padding bg-neutral-200 rounded-xl"
          >
            Cancelar
          </button>
          <div className="flex-center-3">
            <button
              type="button"
              onClick={handleActive}
              className="regular-btn-padding bg-warning rounded-xl"
            >
              {item.isActive ? "Desactivar" : "Activar"}
            </button>
            <button
              disabled={!!disableDelete}
              type="button"
              onClick={() => setSureElim(true)}
              className="regular-btn-padding bg-danger disabled:opacity-50 text-white rounded-xl"
            >
              Eliminar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
