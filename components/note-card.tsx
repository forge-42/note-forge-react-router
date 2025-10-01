"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Note } from "@/db/schema";
import { href, Link } from "react-router";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useDeleteNoteFetcher } from "@/app/routes/api.note.$noteId";

interface NotebookCardProps {
  note: Note;
}

export default function NoteCard({ note }: NotebookCardProps) {
  const deleteNoteFetcher = useDeleteNoteFetcher({ noteId: note.id });
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!deleteNoteFetcher.data) {
      return;
    }
    if (deleteNoteFetcher.data.success) {
      toast.success("Note deleted successfully");
    } else {
      toast.error("Failed to delete note");
    }
    setIsDeleting(false);
    setIsOpen(false);
  }, [deleteNoteFetcher.data]);

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteNoteFetcher.submit();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Link
          to={href("/dashboard/notebook/:notebookId/note/:noteId", {
            notebookId: note.notebookId,
            noteId: note.id,
          })}
        >
          <Button type="button" variant="outline">
            View
          </Button>
        </Link>

        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" disabled={isDeleting}>
              {isDeleting ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the note.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
