"use client";

import { Trash } from "iconsax-react";
import React from "react";

export const LayoutNav = () => {
  //   const path = usePathname();

  return (
    <div className="bg-secondary p-6">
      <label className="text-2xl font-bold flex-center-3">
        <Trash color="currentColor" size={32} className="-skew-x-[10deg]" />
        <i>Trash</i>
      </label>
    </div>
  );
};
