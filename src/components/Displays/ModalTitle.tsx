import { Add } from "iconsax-react";
import React from "react";

interface ImodTitle {
  title: string;
  titleClasse?: string;
  onClose?: () => void;
}

export const ModalTitle = ({ title, onClose }: ImodTitle) => {
  return (
    <header className="flex-center-3 justify-between">
      <label className="font-bold">{title}</label>
      {onClose && (
        <button
          type="submit"
          onClick={onClose}
          className="bg-danger rounded-xl p-1"
        >
          <Add
            size={24}
            color="currentColor"
            className="rotate-45 text-white"
          />
        </button>
      )}
    </header>
  );
};
