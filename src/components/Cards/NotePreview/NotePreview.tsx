"use client";
import { LabelSlect } from "@/components/Inputs/LabelInput/LabelSelect";
import { ToggleImportant } from "@/components/Inputs/ToggleImportant/ToggleImportant";
import { ChangeStatus } from "@/components/Modals/ChangeStatus/ChangeStatus";
import { ElimItem } from "@/components/Modals/ElimItem/ElimItem";
import { FullNote } from "@/global/interfaces/general.interface";
import { noteStatusSelect } from "@/global/templates/general.template";
import fontColorContrast from "font-color-contrast";
import { ArrowRight, Trash } from "iconsax-react";
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
  const [noteStat, setNoteStat] = useState<string>(note.status);
  const [openModal, setOpenModal] = useState(false);

  const noteStats = noteStatusSelect.find((f) => f.value === note.status);
  const closeModal = () => {
    setOpenModal(false);
    setNoteStat(note.status);
  };

  return (
    <>
      <article
        className={`min-w-[300px] max-w-[550px] bg-secondary px-5 py-3 skew-border h-full flex flex-col gap-3 ${containerClass}`}
      >
        <header className="flex-center-3 justify-between">
          <div className="flex-center gap-1 truncate">
            {note.isImportant && (
              <label className="info-tag w-8 h-8 bg-danger text-white font-bold">
                !
              </label>
            )}
            <div className="flex flex-col truncate">
              <h3 className="text-xl font-bold truncate" title={note.title}>
                {note.title}
              </h3>
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
          <LabelSlect
            value={noteStat}
            options={noteStatusSelect}
            containerClass="no-border"
            onChange={(e) => setNoteStat(e.target.value)}
            className={`bg-primary rounded-xl px-3 py-1 text-sm whitespace-nowrap`}
            style={{
              ...(noteStats?.color && { backgroundColor: noteStats.color }),
            }}
          />
        </header>
        {note.desc && (
          <p className="p-1 bg-accent rounded-xl whitespace-pre-wrap max-h-[200px] overflow-auto">
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
        isOpen={openModal || noteStat !== note.status}
        onRequestClose={closeModal}
      >
        {openModal && (
          <ElimItem
            type="note"
            closeModal={closeModal}
            item={{ id: note.id, title: note.title, isActive: note.isActive }}
          />
        )}
        {noteStat !== note.status && (
          <ChangeStatus
            status={{ prev: note.status, new: noteStat }}
            id={note.id}
            onClose={closeModal}
          />
        )}
      </ReactModal>
    </>
  );
};
