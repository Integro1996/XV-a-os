// Intentionally empty by default.
// Add Drizzle tables here when the site actually needs a database.
// See examples/d1/db/schema.ts for an opt-in example.
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const confirmations = sqliteTable('confirmations', {
  id: text('id').primaryKey(),
  editToken: text('edit_token').notNull(),
  name: text('name').notNull(),
  attendance: text('attendance').notNull(),
  guests: integer('guests').notNull(),
  dietary: text('dietary').notNull(),
  message: text('message').notNull(),
  submittedAt: text('submitted_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});
