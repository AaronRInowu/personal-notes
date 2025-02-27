"use client";
import { ColorPicker } from "@/components/Inputs/ColorPicker/ColorPicker";
import { LabelArea } from "@/components/Inputs/LabelInput/LabelArea";
import { LabelInput } from "@/components/Inputs/LabelInput/LabelInput";
import { LabelSlect } from "@/components/Inputs/LabelInput/LabelSelect";
import { ToggleButton } from "@/components/Inputs/ToggleButton";
import { toastOptions } from "@/global/templates/general.template";
import { postCategory, postNote } from "@/services/general.services";
import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

export const NewItemForm = ({ categories }: { categories?: Category[] }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    itemType: "",
    color: "#ad8cbb",
    title: "",
    desc: "",
    isImportant: false,
    category: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const isCat = formData.itemType === "cat";

  const handleSubmit = async () => {
    if (isValidated()) {
      try {
        const baseForm = {
          title: formData.title,
          ...(formData.desc && { desc: formData.desc }),
        };
        if (formData.itemType === "cat") {
          await postCategory({
            color: formData.color,
            ...baseForm,
          });
          toast.success(":) Categoria", toastOptions);
          router.refresh();
        }
        if (formData.itemType === "note") {
          await postNote({
            categoryId: formData.category,
            isImportant: formData.isImportant,
            ...baseForm,
          });
          toast.success(":) Nota", toastOptions);
          router.refresh();
        }
      } catch (error) {
        console.error(error);
        toast.error(">:(", toastOptions);
      }
    }
  };
  const isValidated = () => {
    let isClean = true;
    const { title, itemType, category } = formData;
    if (!itemType) {
      setErrors((prev) => ({
        itemType: "Seleccione elemento a crear",
        ...prev,
      }));
      isClean = false;
    }
    if (!title) {
      setErrors((prev) => ({ title: "Ingrese titulo", ...prev }));
      isClean = false;
    }
    if (itemType === "note") {
      if (!category || !categories?.some((c) => c.id === category)) {
        setErrors((prev) => ({ category: "Seleccione categoria", ...prev }));
        isClean = false;
      }
    }
    if (isClean) {
      setErrors({});
    }
    return isClean;
  };
  return (
    <form action={handleSubmit} className="p-6 flex flex-col gap-3 h-full">
      <h2 className="text-xl font-bold">Nuevo elemento</h2>
      <div className="flex flex-col">
        <div className="flex-center-3">
          <ToggleButton
            text="Categoria"
            selected={formData.itemType === "cat"}
            onClick={() =>
              setFormData(({ itemType, ...rest }) => ({
                itemType: "cat",
                ...rest,
              }))
            }
          />
          <ToggleButton
            text="Nota"
            selected={formData.itemType === "note"}
            onClick={() =>
              setFormData(({ itemType, ...rest }) => ({
                itemType: "note",
                ...rest,
              }))
            }
          />
        </div>
        {errors.itemType && (
          <label className="text-danger">*{errors.itemType}</label>
        )}
      </div>
      <LabelInput
        label="Titulo"
        name="title"
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
        value={formData.desc}
        error={errors.desc}
        onChange={(e) =>
          setFormData(({ desc, ...rest }) => ({
            desc: e.target.value,
            ...rest,
          }))
        }
      />
      {!!formData.itemType && (
        <>
          {isCat ? (
            <ColorPicker
              color={formData.color}
              onChange={(c) =>
                setFormData(({ color, ...rest }) => ({
                  color: c,
                  ...rest,
                }))
              }
            />
          ) : (
            <div className="flex-center">
              <ToggleButton
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
              <LabelSlect
                options={
                  categories?.map((m) => ({ value: m.id, name: m.title })) ?? []
                }
                value={formData.category}
                onChange={(e) =>
                  setFormData(({ category, ...rest }) => ({
                    category: e.target.value,
                    ...rest,
                  }))
                }
              />
            </div>
          )}
        </>
      )}
      <div className="flex-center-3 justify-end mt-auto">
        <button
          type="submit"
          className="regular-btn-padding bg-accent rounded-xl text-white font-bold"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};
