import { relations, sql } from "drizzle-orm";
import { boolean, jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    emailVerified: boolean('email_verified').$defaultFn(() => false).notNull(),
    image: text('image'),
    createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
    updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull()
});

export const session = pgTable("session", {
    id: text('id').primaryKey(),
    expiresAt: timestamp('expires_at').notNull(),
    token: text('token').notNull().unique(),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' })
});

export const account = pgTable("account", {
    id: text('id').primaryKey(),
    accountId: text('account_id').notNull(),
    providerId: text('provider_id').notNull(),
    userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    idToken: text('id_token'),
    accessTokenExpiresAt: timestamp('access_token_expires_at'),
    refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
    scope: text('scope'),
    password: text('password'),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull()
});

export const verification = pgTable("verification", {
    id: text('id').primaryKey(),
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()),
    updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date())
});

export const notebooks = pgTable("notebooks", {
    id: text('id').primaryKey().default(sql`gen_random_uuid()`),
    name: text('name').notNull(),
    userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()),
    updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date())
});

export const notebookRelations = relations(notebooks, ({ many, one }) => ({
    notes: many(notes),
    user: one(user, {
        fields: [notebooks.userId],
        references: [user.id]
    })
}));

export type Notebook = typeof notebooks.$inferSelect & {
    notes: Note[];
};
export type InsertNotebook = typeof notebooks.$inferInsert;

export const notes = pgTable("notes", {
    id: text('id').primaryKey().default(sql`gen_random_uuid()`),
    title: text('title').notNull(),
    content: jsonb('content').notNull(),
    notebookId: text('notebook_id').notNull().references(() => notebooks.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()),
    updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date())
});

export const noteRelations = relations(notes, ({ one }) => ({
    notebook: one(notebooks, {
        fields: [notes.notebookId],
        references: [notebooks.id]
    })
}));

export type Note = typeof notes.$inferSelect;
export type InsertNote = typeof notes.$inferInsert;

export const schema = { user, session, account, verification, notebooks, notes, notebookRelations, noteRelations };