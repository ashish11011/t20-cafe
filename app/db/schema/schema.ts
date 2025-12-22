import { boolean, integer, pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const tableSessionStatusEnum = pgEnum("table_session_status", [
    "open",
    "closed",
    "cancelled",
]);

export const orderStatusEnum = pgEnum("order_status", [
    "active",
    "cancelled",
]);

export const paymentStatusEnum = pgEnum("payment_status", [
    "pending",
    "paid",
    "failed",
]);


export const cafeTable = pgTable("cafe_table", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    tableName: varchar("table_name").notNull(),
    capacity: integer("capacity").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});


export const dish = pgTable("dish", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("name").notNull(),
    description: text("description"),
    price: integer("price").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});


export const tableSession = pgTable("table_session", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

    tableId: integer("table_id")
        .references(() => cafeTable.id)
        .notNull(),

    status: tableSessionStatusEnum("status").default("open"),

    openedAt: timestamp("opened_at").defaultNow().notNull(),
    closedAt: timestamp("closed_at"),

    totalAmount: integer("total_amount").default(0),
    createdAt: timestamp("created_at").defaultNow(),
});




export const orderItem = pgTable("order_item", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

    tableSessionId: integer("table_session_id")
        .references(() => tableSession.id)
        .notNull(),

    dishId: integer("dish_id")
        .references(() => dish.id)
        .notNull(),

    quantity: integer("quantity").notNull(),
    priceAtOrder: integer("price_at_order").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});


export const payment = pgTable("payment", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

    tableSessionId: integer("table_session_id")
        .references(() => tableSession.id)
        .notNull(),

    amount: integer("amount").notNull(),

    paymentMethod: text("payment_method"), // cash, upi, card
    status: paymentStatusEnum("status").default("pending"),
    paidAt: timestamp("paid_at"),

    createdAt: timestamp("created_at").defaultNow(),
});
