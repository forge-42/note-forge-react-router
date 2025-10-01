import { deleteNote } from "@/server/notes.server";
import type { Route } from "./+types/api.note.$noteId";
import { href, useFetcher } from "react-router";

export const action = async ({ request, params }: Route.ActionArgs) => {
  if (request.method !== "DELETE") {
    return { success: false, message: "Wrong method" };
  }

  const noteId = params.noteId;
  const response = await deleteNote(noteId);
  return response;
};

export function useDeleteNoteFetcher({ noteId }: { noteId: string }) {
  const fetcher = useFetcher<typeof action>({
    key: "/api/note/delete" + noteId,
  });

  return {
    ...fetcher,
    submit: () =>
      fetcher.submit(null, {
        method: "DELETE",
        action: href("/api/note/:noteId", {
          noteId,
        }),
      }),
  };
}
