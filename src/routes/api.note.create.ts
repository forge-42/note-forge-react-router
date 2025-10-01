import { zodResolver } from "@hookform/resolvers/zod";
import type { Route } from "./+types/api.notebook.create";
import { createFormData, getValidatedFormData } from "remix-hook-form";
import { createNoteSchema } from "@/components/create-note-button";
import { createNote } from "@/server/notes.server";
import { href, useFetcher } from "react-router";
import z from "zod";
import { useEffect } from "react";

export const action = async ({ request }: Route.ActionArgs) => {
  const { errors, data } = await getValidatedFormData(
    request,
    zodResolver(createNoteSchema)
  );
  if (errors) {
    return {
      success: false,
      message: "Invalid data sent!",
    };
  }
  const response = await createNote({
    ...data,
    title: data.name,
  });
  return response;
};

export function useCreateNoteFetcher(params?: {
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
    submit: (data: z.infer<typeof createNoteSchema>) => {
      const formData = createFormData(data);
      fetcher.submit(formData, {
        method: "POST",
        action: href("/api/note/create"),
      });
    },
  };
}
