"use client";
import { NotePreview } from "@/components/Cards/NotePreview/NotePreview";
import { LabelArea } from "@/components/Inputs/LabelInput/LabelArea";
import { ToggleButton } from "@/components/Inputs/ToggleButton";
import { ElimItem } from "@/components/Modals/ElimItem/ElimItem";
import { Category, Notes } from "@prisma/client";
import fontColorContrast from "font-color-contrast";
import { Trash } from "iconsax-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ReactModal from "react-modal";

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
  const disableDelete = notes && notes.length > 0;

  const closeModal = () => {
    setOpenModal(false);
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
        <ElimItem
          item={{
            id: category.id,
            isActive: category.isActive,
            title: category.title,
          }}
          onComplete={() => router.push("/")}
          type="cat"
          closeModal={closeModal}
          disableDelete={disableDelete}
        />
      </ReactModal>
    </>
  );
};
