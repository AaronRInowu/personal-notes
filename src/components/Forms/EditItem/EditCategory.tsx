"use client";
import { NotePreview } from "@/components/Cards/NotePreview/NotePreview";
import { ModalTitle } from "@/components/Displays/ModalTitle";
import { LabelArea } from "@/components/Inputs/LabelInput/LabelArea";
import { ToggleButton } from "@/components/Inputs/ToggleButton";
import { toastOptions } from "@/global/templates/general.template";
import { deleteItem, patchCategory } from "@/services/general.services";
import { Category, Notes } from "@prisma/client";
import fontColorContrast from "font-color-contrast";
import { Trash } from "iconsax-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ReactModal from "react-modal";
import { toast } from "react-toastify";

export const EditCategory = ({
  category,
  notes,
}: {
  category: Category;
  notes?: Notes[];
}) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [enableEdit, setEnableEdit] = useState(false);
  const [sureElim, setSureElim] = useState(false);
  const disableDelete = notes && notes.length > 0;

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleActive = async () => {
    try {
      await patchCategory(category.id, { isActive: !category.isActive });
      router.refresh();
      closeModal();
      toast.success(":)", toastOptions);
    } catch (error) {
      console.error(error);
      toast.error(">:(", toastOptions);
    }
  };

  const handleDelete = async () => {
    if (sureElim) {
      try {
        await deleteItem(category.id, "cat");
        router.refresh();
        router.push("/");
        toast.success(":)", toastOptions);
      } catch (error) {
        console.error(error);
        toast.error(">:(", toastOptions);
      }
    }
  };

  return (
    <>
      <form action={"POST"} className="main-container">
        <header className="flex-center justify-between">
          <h2
            className={`skew-border regular-btn-padding ${
              category.color ? "" : "bg-accent"
            } italic font-bold text-xl`}
            style={{
              backgroundColor: category.color ?? "transparent",
              color: fontColorContrast(category.color ?? "#ffffff"),
            }}
          >
            {category.title}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <ToggleButton
              text="Editar"
              className="w-min"
              selected={enableEdit}
              selectedColor={"accent"}
              onClick={() => setEnableEdit(!enableEdit)}
            />
            <div className="flex-center justify-end">
              <button
                className="text-white bg-danger rounded-xl p-2 w-min"
                type="button"
                onClick={() => setOpenModal(true)}
              >
                <Trash color="currentColor" size={24} />
              </button>
            </div>
            <label>
              Creado: {new Date(category.createdAt).toLocaleDateString("es")}
            </label>
            <label>
              Ultima actualización:{" "}
              {new Date(
                category.updatedAt ?? category.createdAt
              ).toLocaleDateString("es")}
            </label>
          </div>
        </header>
        <div className="grow flex flex-col gap-3">
          <LabelArea
            readOnly
            value={category.desc ?? ""}
            containerClass="max-w-[550px]"
            label="Descripción"
          />
          <h3 className="text-xl font-bold">Notas</h3>
          <div className="max-w-full flex-center-3 overflow-auto">
            {notes && notes.length > 0 ? (
              notes.map((m) => {
                return <NotePreview note={m} key={m.id} />;
              })
            ) : (
              <div className="flex-center justify-center">
                <label className="italic text-xl font-bold">
                  No se encontraron notas
                </label>
              </div>
            )}
          </div>
        </div>
      </form>
      <ReactModal
        className={"default-modal sm"}
        isOpen={openModal}
        onRequestClose={closeModal}
      >
        <div className="p-3 flex flex-col gap-3">
          <ModalTitle title="Eliminar categoria" onClose={closeModal} />
          <p className="max-w-[320px] self-center text-center py-3">
            {sureElim ? (
              "Presiona eliminar de nuevo para confirmar eliminación."
            ) : (
              <>
                Quiere eliminar o desactivar <b>{category.title}</b>?
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
                disabled={disableDelete}
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
                  {category.isActive ? "Desactivar" : "Activar"}
                </button>
                <button
                  disabled={disableDelete}
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
      </ReactModal>
    </>
  );
};
