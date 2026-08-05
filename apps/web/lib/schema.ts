import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  createdAt: timestamp("created_at").defaultNow(),
  email: text("email").notNull().unique(),
  id: text("id").primaryKey(),
  name: text("name"),
});
