"use client";
import { LabelArea } from "@/components/Inputs/LabelInput/LabelArea";
import { LabelInput } from "@/components/Inputs/LabelInput/LabelInput";
import { LabelSlect } from "@/components/Inputs/LabelInput/LabelSelect";
import { ToggleButton } from "@/components/Inputs/ToggleButton";
import {
  noteStatusSelect,
  toastOptions,
} from "@/global/templates/general.template";
import { NoteStatus, Prisma } from "@prisma/client";
import fontColorContrast from "font-color-contrast";
import React, { useState } from "react";
import { returnNoteInitial } from "./editItemSetup";
import { ArrowDown2 } from "iconsax-react";
import { patchNote } from "@/services/general.services";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export const EditNote = ({
  note,
}: {
  note: Prisma.NotesGetPayload<{ include: { category: true } }>;
}) => {
  const router = useRouter();
  const [enableEdit, setEnableEdit] = useState(false);
  const [newUpdate, setNewUpdate] = useState(false);
  const [showAllUpdates, setShowAllUpdates] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState(returnNoteInitial(note));

  const handleEdit = () => {
    setEnableEdit(!enableEdit);
    setFormData(returnNoteInitial(note));
  };

  const handleSubmit = async () => {
    const { update, ...rest } = formData;
    try {
      if (validateSubmit()) {
        throw { msg: "Fallo validacion" };
      }
      const res = await patchNote(note.id, rest);
      if (!!res) {
        router.refresh();
      }
      toast.success(":)", toastOptions);
    } catch (error) {
      console.error(error);
      toast.error(">:(", toastOptions);
    }
  };

  const validateSubmit = () => {
    let isBad = false;
    const { title } = formData;
    if (!title) {
      setErrors((prev) => ({ title: "Ingrese titulo", ...prev }));
      isBad = true;
    }
    if (!isBad) {
      setErrors({});
    }
    return isBad;
  };

  return (
    <form action={handleSubmit} className="main-container grow">
      <header className="flex-center justify-between">
        <div className="flex-center-3">
          <ToggleButton
            selectedColor={"danger"}
            className="w-min"
            text="Editar"
            selected={enableEdit}
            onClick={handleEdit}
          />
          {note.category && (
            <div className="flex-center-3">
              <label
                className={`skew-border regular-btn-padding ${
                  note.category.color ? "" : "bg-accent"
                }`}
                style={{
                  backgroundColor: note.category.color ?? "transparent",
                  color: fontColorContrast(note.category.color ?? "#ffffff"),
                }}
              >
                {note.category.title}
              </label>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <ToggleButton
            selectedColor={"accent"}
            disabled={!enableEdit}
            className="w-min"
            text="Importante"
            selected={formData.isImportant}
            onClick={() =>
              setFormData(({ isImportant, ...rest }) => ({
                isImportant: !isImportant,
                ...rest,
              }))
            }
          />
          <div className="flex-center">
            <div className="border rounded-s-xl border-black aspect-square w-[37px] p-1">
              <div
                className="rounded-full h-full"
                style={{
                  backgroundColor: noteStatusSelect.find(
                    (f) => formData.status === f.value
                  )?.color,
                }}
              />
            </div>
            <LabelSlect
              disabled={!enableEdit}
              className="!rounded-s-none"
              options={noteStatusSelect}
              value={formData.status}
              onChange={(e) =>
                setFormData(({ status, ...rest }) => ({
                  status: e.target.value as NoteStatus,
                  ...rest,
                }))
              }
            />
          </div>
          <label>
            Creado: {new Date(note.createdAt).toLocaleDateString("es")}
          </label>
          <label>
            Ultima actualización:{" "}
            {new Date(note.updatedAt ?? note.createdAt).toLocaleDateString(
              "es"
            )}
          </label>
        </div>
      </header>
      <div className="grow flex flex-col gap-3">
        <LabelInput
          label="Titulo"
          name="title"
          readOnly={!enableEdit}
          value={formData.title}
          error={errors.title}
          onChange={(e) =>
            setFormData(({ title, ...rest }) => ({
              title: e.target.value,
              ...rest,
            }))
          }
        />
        <LabelArea
          label="Descripción"
          name="desc"
          error={errors.desc}
          readOnly={!enableEdit}
          value={formData.desc}
          onChange={(e) =>
            setFormData(({ desc, ...rest }) => ({
              desc: e.target.value,
              ...rest,
            }))
          }
        />
        <div className="flex flex-col gap-3 border-t border-b border-neutral-600 py-3">
          <div className="flex-center-3">
            <ToggleButton
              disabled={!enableEdit}
              text="Nueva actualizacion"
              selected={newUpdate && enableEdit}
              onClick={() => setNewUpdate(!newUpdate)}
            />
          </div>
          {newUpdate && enableEdit && (
            <LabelArea
              readOnly={!enableEdit}
              name="update"
              error={errors.update}
              value={formData.update}
              onChange={(e) =>
                setFormData(({ update, ...rest }) => ({
                  update: e.target.value,
                  ...rest,
                }))
              }
            />
          )}
        </div>
        <div className="flex flex-col gap-3 grow">
          <div className=" flex-center-3">
            <h4 className="text-xl font-bold">Actualizaciones</h4>
            <button
              type="button"
              onClick={() => setShowAllUpdates(!showAllUpdates)}
              className={`rounded-xl trans-3 p-2  ${
                showAllUpdates ? "bg-[#00000040]" : "hover:bg-[#00000020]"
              }`}
            >
              <ArrowDown2
                size={24}
                color="currentColor"
                className={`trans-3 text-black ${
                  showAllUpdates ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
          <div
            className={`flex flex-col gap-3 trans-3 overflow-auto ${
              showAllUpdates ? "max-h-[450px]" : "max-h-[0px]"
            }`}
          >
            {Array.from({ length: 12 }).map((_, i) => {
              return (
                <div key={i} className="p-3 bg-secondary-fade rounded-lg">
                  <div className="flex-center justify-between">
                    <label>
                      Creado:{" "}
                      {new Date(note.createdAt).toLocaleDateString("es")}
                    </label>
                    <label>
                      Ultima actualización:{" "}
                      {new Date(
                        note.updatedAt ?? note.createdAt
                      ).toLocaleDateString("es")}
                    </label>
                  </div>
                  <p className="border border-black rounded-xl px-3 py-2">
                    {formData.update}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {enableEdit && (
        <div className="flex-center-3 justify-end mt-auto">
          <button
            key={"submitBtn"}
            type="submit"
            className="regular-btn-padding bg-accent rounded-xl text-white font-bold"
          >
            Guardar
          </button>
        </div>
      )}
    </form>
  );
};
