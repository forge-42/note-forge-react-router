
import type { Route } from "../../app/routes/+types/api.notebook.$notebookId";
import { href, useFetcher } from "react-router";
import { deleteNotebook } from "@/server/notebooks.server";

export const action = async ({ request, params }: Route.ActionArgs) => {
  if (request.method !== "DELETE") {
    return { success: false, message: "Wrong method" };
  }

  const notebookId = params.notebookId;
  const response = await deleteNotebook(notebookId);
  return response;
};

export function useDeleteNoteBookFetcher({
  notebookId,
}: {
  notebookId: string;
}) {
  const fetcher = useFetcher<typeof action>({
    key: "/api/notebook/delete" + notebookId,
  });

  return {
    ...fetcher,
    submit: () =>
      fetcher.submit(null, {
        method: "DELETE",
        action: href("/api/notebook/:notebookId", {
          notebookId,
        }),
      }),
  };
}
