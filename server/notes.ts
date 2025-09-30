"use server";

import { db } from "@/db/drizzle";
import { InsertNote, notes } from "@/db/schema";
import { eq } from "drizzle-orm";

export const createNote = async (values: InsertNote) => {
    try {
        await db.insert(notes).values(values);
        return { success: true, message: "Note created successfully" };
    } catch {
        return { success: false, message: "Failed to create notebook" };
    }
};

export const getNoteById = async (id: string) => {
    try {
        const note = await db.query.notes.findFirst({
            where: eq(notes.id, id),
            with: {
                notebook: true
            }
        });

        return { success: true, note };
    } catch {
        return { success: false, message: "Failed to get notebook" };
    }
};

export const updateNote = async (id: string, values: Partial<InsertNote>) => {
    try {
        await db.update(notes).set(values).where(eq(notes.id, id));
        return { success: true, message: "Notebook updated successfully" };
    } catch {
        return { success: false, message: "Failed to update notebook" };
    }
};

export const deleteNote = async (id: string) => {
    try {
        await db.delete(notes).where(eq(notes.id, id));
        return { success: true, message: "Notebook deleted successfully" };
    } catch {
        return { success: false, message: "Failed to delete notebook" };
    }
};