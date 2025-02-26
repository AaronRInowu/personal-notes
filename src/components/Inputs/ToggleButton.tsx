import { TickSquare } from "iconsax-react";
import React, { ButtonHTMLAttributes, HTMLAttributes } from "react";

interface ItgBtn extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  text: string;
}

export const ToggleButton = (props: ItgBtn) => {
  const { selected, text, className = "", type = "button", ...rest } = props;
  return (
    <button
      className={`trans-3 flex-center-3 ${
        selected ? "hover:bg-[#0000001a]" : "hover:bg-[#00000040]"
      } regular-btn-padding rounded-xl ${className}`}
      type={type}
      {...rest}
    >
      <div
        className={`trans-3 rounded-lg ${
          selected ? "" : "border-neutral-600"
        } border `}
      >
        <TickSquare
          size={24}
          variant="Bold"
          color="currentColor"
          className={`text-black trans-3 ${selected ? "" : "opacity-0"}`}
        />
      </div>
      <label className={`${props.disabled ? "" : "cursor-pointer"}`}>
        {text}
      </label>
    </button>
  );
};
