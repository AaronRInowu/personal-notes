import { RedirectPage } from "@/components/Displays/RedirectPage";
import { EditNote } from "@/components/Forms/EditItem/EditNote";
import { HeaderCrumbsSet } from "@/components/layout/HeaderCrumbsSet";
import { IserverPage } from "@/global/interfaces/general.interface";
import { prisma } from "@/global/lib/prisma-client";

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
      if (res?.categoryId === categoryId) {
        return res;
      }
      return;
    } catch (error) {
      console.error(error);
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
      console.error(error);
      return;
    }
  };
  const catRes = await tryCat();
  const noteRes = await tryNote();
  if (!noteRes) {
    return <RedirectPage />;
  }

  return (
    <>
      <HeaderCrumbsSet
        data={{ id: categoryId, name: catRes?.title ?? "Categoria" }}
      />
      <HeaderCrumbsSet data={{ id: notaId, name: noteRes?.title ?? "Nota" }} />
      <main className="h-full max-h-full overflow-auto">
        <EditNote note={noteRes} />
      </main>
    </>
  );
}
