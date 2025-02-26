"use client";

import { ArrowLeft } from "iconsax-react";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export const RedirectPage = ({ href }: { href?: string }) => {
  const router = useRouter();
  useEffect(() => {
    if (href) {
      redirect(href);
    }
  }, []);

  return (
    <div className="w-full h-full flex-col flex-center-3 justify-center">
      <h2 className="text-xl font-bold">Epale, ladronde?</h2>
      <button
        className="flex-center-3 skew-border bg-accent regular-btn-padding text-white"
        type="button"
        onClick={() => router.back()}
      >
        <ArrowLeft size={24} color="currentColor" />
        Regresar
      </button>
    </div>
  );
};
