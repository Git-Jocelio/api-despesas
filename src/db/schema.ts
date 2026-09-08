import {
    pgTable,
    serial,
    varchar,
    decimal,
    integer,
    timestamp
  } from "drizzle-orm/pg-core";

  export const users = pgTable("users",{
    id : serial("id").primaryKey(),
    name : varchar("name",{ length: 100}).notNull(),
    email : varchar("email",{ length: 150}).notNull().unique(),
    password : varchar("password",{ length: 255}).notNull(),
  });

  export const expenses = pgTable("expenses",{
    id : serial("id").primaryKey(),
    description : varchar("description",{ length: 255}).notNull(),
    amount : decimal("amount",{ precision: 10, scale: 2}).notNull(),
    userId : integer("userId")
      .notNull()
      .references( () => users.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),  
  });