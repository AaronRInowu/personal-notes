"use client";

import { useHeaderTagContext } from "@/contexts/HeaderContext";
import { Add, ArrowRight2, Trash } from "iconsax-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Fragment } from "react";

export const LayoutNav = () => {
  const path = usePathname();
  const loaf = path.split("/").filter((f) => !!f);
  const { nameCollection } = useHeaderTagContext();

  return (
    <div className="bg-secondary p-6 flex-center-3 justify-between">
      <div className="flex-center-3">
        <Link href={"/"} className="text-2xl font-bold flex-center-3">
          <Trash color="currentColor" size={32} className="-skew-x-[10deg]" />
          <i>Trash</i>
        </Link>
        {loaf.length > 0 &&
          loaf.map((l, i) => {
            return (
              <Fragment key={l + "_" + i}>
                <ArrowRight2
                  color="currentColor"
                  size={24}
                  className="bg-[#ffffff20] p-1 rounded-lg"
                />
                {i === loaf.length - 1 ? (
                  <label className="trans-3 font-bold italic p-1 rounded-xl bg-[#ffffff1a]">
                    {l === "editar" || l === "nuevo"
                      ? l === "editar"
                        ? "Editar"
                        : "Nuevo"
                      : nameCollection.find((f) => f.id === l)?.name ??
                        "Elemento"}
                  </label>
                ) : (
                  <Link
                    className="trans-3 font-bold italic p-1 rounded-xl hover:bg-[#ffffff1a]"
                    href={`/${loaf.slice(0, i + 1).join("/")}`}
                  >
                    {l === "editar" || l === "nuevo"
                      ? l === "editar"
                        ? "Editar"
                        : "Nuevo"
                      : nameCollection.find((f) => f.id === l)?.name ??
                        "Elemento"}
                  </Link>
                )}
              </Fragment>
            );
          })}
      </div>
      {path === "/" && (
        <Link
          href={"/nuevo"}
          className="flex-center-3 regular-btn-padding-xl bg-accent rounded-xl"
        >
          <Add color="currentColor" size={24} />
          <label>Nuevo</label>
        </Link>
      )}
    </div>
  );
};
