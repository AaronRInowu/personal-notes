import { NotePreview } from "@/components/Cards/NotePreview/NotePreview";
import { RedirectPage } from "@/components/Displays/RedirectPage";
import { LabelArea } from "@/components/Inputs/LabelInput/LabelArea";
import { HeaderCrumbsSet } from "@/components/layout/HeaderCrumbsSet";
import { IserverPage } from "@/global/interfaces/general.interface";
import { prisma } from "@/global/lib/prisma-client";
import fontColorContrast from "font-color-contrast";

export default async function NoteRedirect({
  params,
}: IserverPage<{ categoryId: string }>) {
  const { categoryId } = await params;
  const tryCat = async () => {
    try {
      const res = await prisma.category.findUnique({
        where: { id: categoryId },
      });
      return res;
    } catch (error) {
      return;
    }
  };
  const tryNotes = async () => {
    try {
      const res = await prisma.notes.findMany({
        where: { category: { id: { equals: categoryId } } },
        include: { category: true },
      });
      return res;
    } catch (error) {
      return;
    }
  };
  const catRes = await tryCat();
  const notesRes = await tryNotes();

  if (!catRes) {
    return <RedirectPage />;
  }

  return (
    <>
      <HeaderCrumbsSet
        data={{ id: categoryId, name: catRes?.title ?? "Categoria" }}
      />
      <main className="p-6 flex flex-col gap-3">
        <header className="flex-center justify-between">
          <h2
            className={`skew-border regular-btn-padding ${
              catRes.color ? "" : "bg-accent"
            } italic font-bold text-xl`}
            style={{
              backgroundColor: catRes.color ?? "transparent",
              color: fontColorContrast(catRes.color ?? "#ffffff"),
            }}
          >
            {catRes.title}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <label>
              Creado: {new Date(catRes.createdAt).toLocaleDateString("es")}
            </label>
            <label>
              Ultima actualización:{" "}
              {new Date(
                catRes.updatedAt ?? catRes.createdAt
              ).toLocaleDateString("es")}
            </label>
          </div>
        </header>
        <div className="grow flex flex-col gap-3">
          <LabelArea
            readOnly
            value={catRes.desc ?? ""}
            containerClass="max-w-[550px]"
            label="Descripción"
          />
          <h3 className="text-xl font-bold">Notas</h3>
          <div className="max-w-full flex-center-3 overflow-auto">
            {notesRes && notesRes.length > 0 ? (
              notesRes.map((m) => {
                return <NotePreview note={m} />;
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
      </main>
    </>
  );
}
