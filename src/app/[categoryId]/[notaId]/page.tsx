import { RedirectPage } from "@/components/Displays/RedirectPage";
import { HeaderCrumbsSet } from "@/components/layout/HeaderCrumbsSet";
import { IserverPage } from "@/global/interfaces/general.interface";
import { prisma } from "@/global/lib/prisma-client";
import { noteStatusSelect } from "@/global/templates/general.template";
import fontColorContrast from "font-color-contrast";

export default async function NoteIdPage({
  params,
}: IserverPage<{ categoryId: string; notaId: string }>) {
  const { categoryId, notaId } = await params;

  const tryNote = async () => {
    try {
      const res = await prisma.notes.findUnique({
        where: { id: notaId },
        include: { category: true },
      });
      return res;
    } catch (error) {
      return;
    }
  };
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
  const catRes = await tryCat();
  const noteRes = await tryNote();
  const noteStatus = noteStatusSelect.find((n) => n.value === noteRes?.status);

  if (!noteRes) {
    return <RedirectPage />;
  }

  return (
    <>
      <HeaderCrumbsSet
        data={{ id: categoryId, name: catRes?.title ?? "Categoria" }}
      />
      <HeaderCrumbsSet data={{ id: notaId, name: noteRes?.title ?? "Nota" }} />
      <main className="p-6 flex flex-col gap-3">
        <header className="flex-center justify-between">
          <div>
            {noteRes.category && (
              <div className="flex-center-3">
                {noteRes.isImportant && (
                  <label className="info-circle w-6 h-6 bg-danger text-white font-bold">
                    !
                  </label>
                )}
                <label
                  className={`skew-border regular-btn-padding ${
                    noteRes.category.color ? "" : "bg-accent"
                  }`}
                  style={{
                    backgroundColor: noteRes.category.color ?? "transparent",
                    color: fontColorContrast(
                      noteRes.category.color ?? "#ffffff"
                    ),
                  }}
                >
                  {noteRes.category.title}
                </label>
              </div>
            )}
            <h2 className="italic font-bold text-xl">{noteRes.title}</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 flex-center justify-end">
              <label
                className={`text-center w-min truncate p-1 rounded-xl ${
                  noteStatus ? "" : "bg-accent"
                }`}
                style={{
                  ...(noteStatus && { backgroundColor: noteStatus.color }),
                }}
              >
                {noteStatus?.name ?? noteRes.status}
              </label>
            </div>
            <label>
              Creado: {new Date(noteRes.createdAt).toLocaleDateString("es")}
            </label>
            <label>
              Ultima actualización:{" "}
              {new Date(
                noteRes.updatedAt ?? noteRes.createdAt
              ).toLocaleDateString("es")}
            </label>
          </div>
        </header>
        <div className="grow">
          <p>{noteRes.desc}</p>
        </div>
      </main>
    </>
  );
}
