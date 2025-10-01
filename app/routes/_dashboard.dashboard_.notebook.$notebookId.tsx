import { CreateNoteButton } from "@/components/create-note-button";
import NoteCard from "@/components/note-card";
import { PageWrapper } from "@/components/page-wrapper";
import { getNotebookById } from "@/server/notebooks.server";
import type { Route } from "./+types/_dashboard.dashboard_.notebook.$notebookId";

export const loader = async ({ params }: Route.LoaderArgs) => {
  const notebookId = params.notebookId;
  const { notebook } = await getNotebookById(notebookId);
  return { notebook };
};

export default function NotebookPage({ loaderData }: Route.ComponentProps) {
  const { notebook } = loaderData;
  const notebookId = notebook?.id || "unknown";

  return (
    <PageWrapper
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        {
          label: notebook?.name ?? "Notebook",
          href: `/dashboard/notebook/${notebookId}`,
        },
      ]}
    >
      <h1>{notebook?.name}</h1>

      <CreateNoteButton notebookId={notebookId} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {notebook?.notes?.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </PageWrapper>
  );
}
