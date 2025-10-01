import { PageWrapper } from "@/components/page-wrapper";
import RichTextEditor from "@/components/rich-text-editor";
import { getNoteById, updateNote } from "@/server/notes.server";
import { JSONContent } from "@tiptap/react";
import type { Route } from "./+types/_dashboard.dashboard_.notebook_.$notebookId.note.$noteId";
import { useSubmit } from "react-router";

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { noteId } = params;
  const { note } = await getNoteById(noteId);
  return { note: { ...note, content: note?.content as JSONContent[] } };
};

export const action = async ({ request, params }: Route.ActionArgs) => {
  if (request.method !== "PUT") {
    return { success: false, message: "Wrong method" };
  }
  const { noteId } = params;
  const formData = await request.formData();
  const content = formData.get("content") as string;
  const updated = await updateNote(noteId, { content: JSON.parse(content) });
  return updated;
};

export default function NotePage({ params, loaderData }: Route.ComponentProps) {
  const { noteId } = params;

  const { note } = loaderData;
  const submit = useSubmit();

  const handleEdit = (content: any) => {
    submit({ content: JSON.stringify(content) }, { method: "PUT" });
  };
  return (
    <PageWrapper
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        {
          label: note?.notebook?.name ?? "Notebook",
          href: `/dashboard/notebook/${note?.notebook?.id}`,
        },
        { label: note?.title ?? "Note", href: `/dashboard/note/${noteId}` },
      ]}
    >
      <h1>{note?.title}</h1>
      <RichTextEditor onEdit={handleEdit} content={note?.content} noteId={noteId} />
    </PageWrapper>
  );
}
