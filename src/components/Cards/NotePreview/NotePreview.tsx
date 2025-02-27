import { FullNote } from "@/global/interfaces/general.interface";
import { noteStatusSelect } from "@/global/templates/general.template";
import fontColorContrast from "font-color-contrast";
import { ArrowRight } from "iconsax-react";
import Link from "next/link";
import React from "react";

export const NotePreview = ({ note }: { note: FullNote }) => {
  const noteStats = noteStatusSelect.find((f) => f.value === note.status);
  return (
    <article className="min-w-[300px] max-w-[550px] bg-secondary p-3 skew-border flex flex-col gap-3">
      <header className="flex-center-3 justify-between">
        <div className="flex-center-3">
          {note.isImportant && (
            <label className="info-circle w-6 h-6 bg-danger text-white font-bold">
              !
            </label>
          )}
          <div className="flex flex-col">
            {note.category && (
              <Link
                href={`/${note.categoryId}`}
                className="text-sm skew-border regular-btn-padding w-min"
                style={{
                  backgroundColor: note.category.color ?? "transparent",
                  color: fontColorContrast(note.category.color ?? "#ffffff"),
                }}
              >
                {note.category.title}
              </Link>
            )}
            <h3>{note.title}</h3>
          </div>
        </div>
        <label
          className={`bg-primary rounded-xl p-1`}
          style={{
            ...(noteStats?.color && { backgroundColor: noteStats.color }),
          }}
        >
          {noteStats?.name ?? note.status}
        </label>
      </header>
      {note.desc && <p className="p-1 bg-accent rounded-xl">{note.desc}</p>}
      <footer className="flex-center justify-center p-3">
        <Link
          href={`/${note.categoryId}/${note.id}`}
          className="bg-accent rounded-xl px-3 py-1 flex-center-3"
        >
          Ver nota
          <ArrowRight size={24} color="currentColor" />
        </Link>
      </footer>
    </article>
  );
};
