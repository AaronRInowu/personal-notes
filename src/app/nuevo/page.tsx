import { NewItemForm } from "@/components/Forms/NewItem/NewItemForm";
import { prisma } from "@/global/lib/prisma-client";

export default async function NewItemPage() {
  const tryCats = async () => {
    try {
      return await prisma.category.findMany();
    } catch (error) {
      console.error(error);
      return;
    }
  };
  const catsRes = await tryCats();
  return <NewItemForm categories={catsRes} />;
}
