"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Notebook } from "@/db/schema";
import { Link } from "react-router";
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
import { useDeleteNoteBookFetcher } from "@/src/routes/api.notebook.$notebookId";

interface NotebookCardProps {
  notebook: Notebook;
}

export default function NotebookCard({ notebook }: NotebookCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const deleteNoteBookFetcher = useDeleteNoteBookFetcher({
    notebookId: notebook.id,
  });
  useEffect(() => {
    if (!deleteNoteBookFetcher.data) {
      return;
    }
    if (deleteNoteBookFetcher.data.success) {
      toast.success("NoteBook deleted successfully");
    } else {
      toast.error("Failed to delete notebook");
    }
    setIsDeleting(false);
    setIsOpen(false);
  }, [deleteNoteBookFetcher.data]);

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteNoteBookFetcher.submit();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{notebook.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{notebook.notes?.length ?? 0} notes</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Link to={`/dashboard/notebook/${notebook.id}`}>
          <Button variant="outline">View</Button>
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
                This action cannot be undone. This will permanently delete the notebook and all its notes.
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
