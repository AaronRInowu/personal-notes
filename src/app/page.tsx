import { NotePreview } from "@/components/Cards/NotePreview/NotePreview";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-full p-6 max-w-full flex flex-col gap-3">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold skew-border text-white bg-danger w-min regular-btn-padding">
          Importantes!
        </h2>
        <div className="flex-center-3 max-w-full overflow-auto py-3">
          {Array.from({ length: 12 }).map((_, i) => {
            return <NotePreview key={i} />;
          })}
        </div>
      </div>
      <div className="flex flex-col">
        <h2 className="text-xl font-bold">Ultimas actualizaciones</h2>
        <div className="flex-center-3 max-w-full overflow-auto py-3">
          {Array.from({ length: 12 }).map((_, i) => {
            return <NotePreview key={i} />;
          })}
        </div>
      </div>
      <div className="flex flex-col">
        <h2 className="text-xl font-bold">Categorias</h2>
        <div className="grid grid-[repeat(auto-fill,minmax(250px,1fr))] gap-3 py-3">
          {Array.from({ length: 42 }).map((_, i) => {
            return (
              <Link
                key={i}
                href={"/link"}
                className="skew-border regular-btn-padding bg-accent text-center min-w-[120px] flex-center justify-center"
              >
                {i % 2 ? "Titulo de los proyecyos" : "Titulo corto"}
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
