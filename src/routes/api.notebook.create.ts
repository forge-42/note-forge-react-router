import { zodResolver } from "@hookform/resolvers/zod";
import type { Route } from "./+types/api.notebook.create";
import { createFormData, getValidatedFormData } from "remix-hook-form";
import { href, useFetcher } from "react-router";
import z from "zod";
import { useEffect } from "react";
import { createNotebookSchema } from "@/components/create-notebook-button";
import { createNotebook } from "@/server/notebooks.server";
import { auth } from "@/lib/auth";

export const action = async ({ request }: Route.ActionArgs) => {
  const { errors, data } = await getValidatedFormData(
    request,
    zodResolver(createNotebookSchema)
  );
  if (errors) {
    return {
      success: false,
      message: "Invalid data sent!",
    };
  }
  const session = await auth.api.getSession(request);

  const response = await createNotebook({
    ...data,
    userId: session?.user.id!,
  });
  return response;
};

export function useCreateNoteBookFetcher(params?: {
  onSuccess?: (data: Awaited<ReturnType<typeof action>>) => void;
  onError?: (data: Awaited<ReturnType<typeof action>>) => void;
}) {
  const { onSuccess, onError } = params ?? {};

  const fetcher = useFetcher<typeof action>();
  useEffect(() => {
    if (!fetcher.data) {
      return;
    }
    if (fetcher.data.success) {
      onSuccess?.(fetcher.data);
    }
    if (!fetcher.data.success) {
      onError?.(fetcher.data);
    }
  }, [fetcher.data]);

  return {
    ...fetcher,
    submit: (data: z.infer<typeof createNotebookSchema>) => {
      const formData = createFormData(data);
      fetcher.submit(formData, {
        method: "POST",
        action: href("/api/notebook/create"),
      });
    },
  };
}
