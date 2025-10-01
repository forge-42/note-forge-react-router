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
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useCreateNoteFetcher } from "@/app/routes/api.note.create";

export const createNoteSchema = z.object({
  name: z.string().min(2).max(50),
  notebookId: z.string().min(1),
  content: z.object(),
});

export const CreateNoteButton = ({ notebookId }: { notebookId: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof createNoteSchema>>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      name: "",
      content: {},
      notebookId,
    },
  });
  const createNoteFetcher = useCreateNoteFetcher({
    onSuccess: () => {
      form.reset();
      toast.success("Note created successfully");
      setIsOpen(false);
      setIsLoading(false);
    },
    onError: (response) => {
      toast.error(response.message);
      setIsLoading(false);
    },
  });

  async function onSubmit(values: z.infer<typeof createNoteSchema>) {
    setIsLoading(true);
    createNoteFetcher.submit(values);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-max">Create Note</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Note</DialogTitle>
          <DialogDescription>Create a new note to store your notes.</DialogDescription>
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
                    <Input placeholder="My Note" {...field} />
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
