import { RedirectPage } from "@/components/Displays/RedirectPage";
import { EditCategory } from "@/components/Forms/EditItem/EditCategory";
import { HeaderCrumbsSet } from "@/components/layout/HeaderCrumbsSet";
import { ModalElementSet } from "@/components/layout/ModalElementSet";
import { IserverPage } from "@/global/interfaces/general.interface";
import { prisma } from "@/global/lib/prisma-client";

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
      console.error(error);
      return;
    }
  };
  const tryNotes = async () => {
    try {
      const res = await prisma.notes.findMany({
        where: { category: { id: categoryId } },
      });
      return res;
    } catch (error) {
      console.error(error);
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
      <ModalElementSet />
      <main>
        <EditCategory notes={notesRes} category={catRes} />
      </main>
    </>
  );
}
