import { NotePreview } from "@/components/Cards/NotePreview/NotePreview";
import { prisma } from "@/global/lib/prisma-client";
import fontColorContrast from "font-color-contrast";
import Link from "next/link";

export default async function Home() {
  const tryCats = async () => {
    try {
      return await prisma.category.findMany();
    } catch (error) {
      console.error(error);
      return;
    }
  };
  const tryImportant = async () => {
    try {
      const res = await prisma.notes.findMany({
        where: {
          isImportant: { equals: true },
        },
        include: {
          category: true,
        },
        orderBy: {
          updatedAt: {
            sort: "asc",
          },
        },
      });
      return res;
    } catch (error) {
      console.error(error);
      return;
    }
  };
  const tryLatest = async () => {
    try {
      return await prisma.notes.findMany({
        orderBy: {
          updatedAt: {
            sort: "asc",
          },
        },
        include: {
          category: true,
        },
      });
    } catch (error) {
      console.error(error);
      return;
    }
  };
  const catsRes = await tryCats();
  const latestRes = await tryLatest();
  const importantRes = await tryImportant();

  return (
    <main className="h-full p-6 max-w-full flex flex-col gap-3">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold skew-border text-white bg-danger w-min regular-btn-padding">
          Importantes!
        </h2>
        <div className="flex-center-3 max-w-full overflow-auto py-3">
          {importantRes && importantRes.length > 0 ? (
            importantRes.map((n) => {
              return <NotePreview note={n} key={n.id} />;
            })
          ) : (
            <div className="flex-center justify-center w-full p-6">
              <label className="text-xl font-bold italic">
                No se encontraron notas
              </label>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <h2 className="text-xl font-bold">Ultimas actualizaciones</h2>
        <div className="flex-center-3 max-w-full overflow-auto py-3">
          {latestRes && latestRes.length > 0 ? (
            latestRes.map((n) => {
              return <NotePreview note={n} key={n.id} />;
            })
          ) : (
            <div className="flex-center justify-center w-full p-6">
              <label className="text-xl font-bold italic">
                No se encontraron notas
              </label>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <h2 className="text-xl font-bold">Categorias</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3 py-3">
          {catsRes && catsRes?.length > 0 ? (
            catsRes.map((c) => {
              const bg = c.color ?? "#ad8cbb";
              return (
                <Link
                  key={c.id}
                  href={`/${c.id}`}
                  style={{ backgroundColor: bg, color: fontColorContrast(bg) }}
                  className="trans-3 skew-border regular-btn-padding text-center min-w-[120px] flex-center font-bold text-xl justify-center hover:scale-[1.06]"
                >
                  {c.title}
                </Link>
              );
            })
          ) : (
            <div className="flex-center justify-center w-full p-6">
              <label className="text-xl font-bold italic">
                No se encontraron categorias
              </label>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
