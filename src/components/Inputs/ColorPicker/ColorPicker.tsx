"use client";
import { ArrowDown2 } from "iconsax-react";
import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";

export const ColorPicker = ({
  color,
  onChange,
}: {
  color?: string;
  onChange: (c: string) => void;
}) => {
  const [openColor, setOpenColor] = useState(false);

  return (
    <div className="relative">
      <button
        className="p-2 border border-black flex-center-3 rounded-xl"
        type="button"
        onClick={() => setOpenColor(!openColor)}
      >
        <div
          style={{ backgroundColor: color }}
          className="w-8 aspect-square rounded-full border border-neutral-600"
        />
        <ArrowDown2 size={24} color="currentColor" className="text-black" />
      </button>
      <div
        className={`trans-3 absolute top-[100%] ${
          openColor ? "" : "opacity-0 pointer-events-none"
        }`}
      >
        <HexColorPicker color={color} onChange={(c) => onChange(c)} />
      </div>
    </div>
  );
};
