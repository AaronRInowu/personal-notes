"use client";
import { ToggleImportant } from "@/components/Inputs/ToggleImportant/ToggleImportant";
import { ElimItem } from "@/components/Modals/ElimItem/ElimItem";
import { FullNote } from "@/global/interfaces/general.interface";
import { noteStatusSelect } from "@/global/templates/general.template";
import fontColorContrast from "font-color-contrast";
import { ArrowRight, Slash, Trash } from "iconsax-react";
import Link from "next/link";
import React, { useState } from "react";
import ReactModal from "react-modal";

export const NotePreview = ({
  note,
  containerClass = "",
}: {
  note: FullNote;
  containerClass?: string;
}) => {
  const [openModal, setOpenModal] = useState(false);

  const noteStats = noteStatusSelect.find((f) => f.value === note.status);
  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <article
        className={`min-w-[300px] max-w-[550px] bg-secondary px-5 py-3 skew-border h-full flex flex-col gap-3 ${containerClass}`}
      >
        <header className="flex-center-3 justify-between">
          <div className="flex-center">
            {note.isImportant && (
              <label className="info-circle w-6 h-6 bg-danger text-white font-bold">
                !
              </label>
            )}
            <div className="flex flex-col">
              <h3 className="text-xl font-bold">{note.title}</h3>
              {note.category && (
                <Link
                  href={`/${note.categoryId}`}
                  className="text-sm skew-border regular-btn-padding w-min capitalize"
                  style={{
                    backgroundColor: note.category.color ?? "transparent",
                    color: fontColorContrast(note.category.color ?? "#ffffff"),
                  }}
                >
                  {note.category.title}
                </Link>
              )}
            </div>
          </div>
          <label
            className={`bg-primary rounded-xl px-3 py-1 text-sm`}
            style={{
              ...(noteStats?.color && { backgroundColor: noteStats.color }),
            }}
          >
            {noteStats?.name ?? note.status}
          </label>
        </header>
        {note.desc && (
          <p className="p-1 bg-accent rounded-xl whitespace-prewrap">
            {note.desc}
          </p>
        )}
        <footer
          className={`flex-center-3 py-3 overflow-hidden mt-auto trans-3`}
        >
          <ToggleImportant
            item={{
              id: note.id,
              isImportant: note.isImportant,
              title: note.title,
            }}
          />
          <button
            type="button"
            className="bg-danger rounded-xl p-2"
            onClick={() => setOpenModal(true)}
          >
            <Trash size={24} color="currentColor" className="text-white" />
          </button>
          <Link
            href={`/${note.categoryId}/${note.id}`}
            className="bg-info rounded-xl text-white p-2 flex-center gap-1 w-fit ms-auto"
          >
            Ver
            <ArrowRight size={24} color="currentColor" />
          </Link>
        </footer>
      </article>
      <ReactModal
        className={"default-modal sm"}
        isOpen={openModal}
        onRequestClose={closeModal}
      >
        <ElimItem
          type="note"
          closeModal={closeModal}
          item={{ id: note.id, title: note.title, isActive: note.isActive }}
        />
      </ReactModal>
    </>
  );
};
