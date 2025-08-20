"use client";
import { NotePreview } from "@/components/Cards/NotePreview/NotePreview";
import { LabelArea } from "@/components/Inputs/LabelInput/LabelArea";
import { ElimItem } from "@/components/Modals/ElimItem/ElimItem";
import { Category, Notes } from "@prisma/client";
import fontColorContrast from "font-color-contrast";
import { Add, Edit, Trash } from "iconsax-react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import ReactModal from "react-modal";
import { NewItemForm } from "../NewItem/NewItemForm";
import { toast } from "react-toastify";
import { toastOptions } from "@/global/templates/general.template";
import { patchCategory } from "@/services/general.services";
import { LabelInput } from "@/components/Inputs/LabelInput/LabelInput";
import { ColorPicker } from "@/components/Inputs/ColorPicker/ColorPicker";
import { returnCategoryInitial } from "./editItemSetup";

export const EditCategory = ({
  category,
  notes,
}: {
  category: Category;
  notes?: Notes[];
  searchParams: Record<string, string>;
}) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState("");
  const [enableEdit, setEnableEdit] = useState(false);
  const [formData, setformData] = useState(returnCategoryInitial(category));
  const disableDelete = notes && notes.length > 0;
  const importants = notes?.filter((f) => !!f.isImportant);

  const closeModal = () => {
    setOpenModal("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await patchCategory(category.id, formData);
      setformData(returnCategoryInitial(res));
      setEnableEdit(false);
      toast.success(":)", toastOptions);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(">:(", toastOptions);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="main-container max-h-full overflow-auto h-full"
      >
        <header
          className={`flex-center justify-between px-6 py-3 bg-secondary rounded-2xl text-white font-bold`}
        >
          <div className="flex flex-col items-start gap-3">
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
            <div className="flex-center-3">
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
          </div>
          <div className="flex-center-3 justify-end">
            <button
              className={`text-white bg-info rounded-xl p-2 w-min relative outline hover:saturate-50 trans-3 ${
                enableEdit ? "outline-[#f00]" : "outline-transparent"
              }`}
              type="button"
              onClick={() => setEnableEdit(!enableEdit)}
            >
              <Add
                color="currentColor"
                size={48}
                className={`trans-3 absolute align-abs-middle text-danger rotate-45 ${
                  enableEdit ? "" : "opacity-0"
                }`}
              />
              <Edit color="currentColor" size={24} />
            </button>
            <button
              className="text-white bg-danger rounded-xl p-2 w-min"
              type="button"
              onClick={() => setOpenModal("elim")}
            >
              <Trash color="currentColor" size={24} />
            </button>
            <div
              className={`trans-3 rounded-xl overflow-hidden w-min ${
                enableEdit ? "max-w-[200px]" : "pointer-events-none max-w-[0px]"
              }`}
            >
              <button
                className={`trans-3 text-white bg-accent rounded-xl overflow-hidden p-2 w-min ${
                  enableEdit
                    ? "max-w-[200px]"
                    : "pointer-events-none max-w-[0px]"
                }`}
                type="submit"
              >
                Guardar
              </button>
            </div>
          </div>
        </header>
        <div className="grow flex flex-col gap-3">
          <div className="flex-center-3 justify-between">
            <h3 className="text-xl font-bold">Info general</h3>
            {/* <ToggleButton text="Ver terminadas" value={} /> */}
          </div>
          <div className="flex-center-3 flex-wrap w-full">
            <LabelArea
              readOnly={!enableEdit}
              value={formData.desc}
              onChange={(e) =>
                setformData(({ desc, ...rest }) => ({
                  desc: e.target.value,
                  ...rest,
                }))
              }
              containerClass="max-w-[550px] w-full"
              label="Descripción"
            />
            {enableEdit && (
              <>
                <LabelInput
                  readOnly={!enableEdit}
                  value={formData.title}
                  onChange={(e) =>
                    setformData(({ title, ...rest }) => ({
                      title: e.target.value,
                      ...rest,
                    }))
                  }
                  label="Titulo"
                />
                <ColorPicker
                  disable={!enableEdit}
                  color={formData.color}
                  onChange={(c) =>
                    setformData(({ color, ...rest }) => ({ color: c, ...rest }))
                  }
                />
              </>
            )}
          </div>
          {importants && importants.length > 0 && (
            <>
              <h2 className="text-xl font-bold skew-border text-white bg-danger w-min regular-btn-padding">
                Importantes!
              </h2>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3">
                {importants.map((m) => {
                  return <NotePreview note={m} key={m.id} />;
                })}
              </div>
            </>
          )}
          <div className="flex-center-3 justify-between">
            <h3 className="text-xl font-bold">Notas</h3>
            <button
              className={`trans-3 text-white bg-accent rounded-xl overflow-hidden p-2 w-min flex-center-3`}
              type="button"
              onClick={() => setOpenModal("note")}
            >
              <Add size={24} color="currentColor" />
              Nuevo
            </button>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3">
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
        isOpen={openModal !== ""}
        onRequestClose={closeModal}
      >
        {openModal === "elim" && (
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
        )}
        {openModal === "note" && (
          <NewItemForm
            category={category}
            onClose={closeModal}
            fullCats={[category]}
          />
        )}
      </ReactModal>
    </>
  );
};
