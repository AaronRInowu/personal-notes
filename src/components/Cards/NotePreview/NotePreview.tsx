import { ArrowRight } from "iconsax-react";
import Link from "next/link";
import React from "react";

export const NotePreview = () => {
  return (
    <article className="min-w-[300px] max-w-[550px] bg-secondary p-3 skew-border">
      <header className="flex-center-3 justify-between">
        <div>
          <label className="text-sm">Proyecto</label>
          <h3>Titulo</h3>
        </div>
        <label className="bg-primary rounded-xl p-1">Estado</label>
      </header>
      <section>
        <p className="p-1 bg-accent rounded-xl">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad ut nam
          consequuntur, fugiat id, illum accusamus repellat, sapiente magnam
          aperiam ipsum enim.
        </p>
      </section>
      <footer className="flex-center justify-center p-3">
        <Link
          href={"/lik"}
          className="bg-accent rounded-xl px-3 py-1 flex-center-3"
        >
          Ver nota
          <ArrowRight size={24} color="currentColor" />
        </Link>
      </footer>
    </article>
  );
};
