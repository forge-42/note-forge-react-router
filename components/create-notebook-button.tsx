"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useCreateNoteBookFetcher } from "@/src/routes/api.notebook.create";

export const createNotebookSchema = z.object({
  name: z.string().min(2).max(50),
  userId: z.string().optional(),
});

export const CreateNotebookButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof createNotebookSchema>>({
    resolver: zodResolver(createNotebookSchema),
    defaultValues: {
      name: "",
    },
  });
  const createNoteFetcher = useCreateNoteBookFetcher({
    onSuccess: () => {
      form.reset();
      toast.success("Notebook created successfully");
      setIsOpen(false);
      setIsLoading(false);
    },
    onError: (response) => {
      toast.error(response.message);
      setIsLoading(false);
    },
  });

  async function onSubmit(values: z.infer<typeof createNotebookSchema>) {
    setIsLoading(true);
    const userId = (await authClient.getSession()).data?.user.id;

    if (!userId) {
      toast.error("You must be logged in to create a notebook");
      return;
    }
    createNoteFetcher.submit({ ...values, userId });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-max">Create Notebook</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Notebook</DialogTitle>
          <DialogDescription>Create a new notebook to store your notes.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My Notebook" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} type="submit">
              {isLoading ? <Loader2 className="size-4 animate-spin" /> : "Create"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
