"use server"
import { db } from "@/app/db/drizzle";
import { cafeTable, dish, orderItem, tableSession } from "@/app/db/schema/schema";
import { and, eq, gte, lt, sql } from "drizzle-orm";
import { refresh, revalidatePath } from "next/cache";

export const getTables = async () => {
    try {
        const res = await db.select().from(cafeTable);
        return res;
        // return [];
    } catch (error) {
        console.error("error: ", error)
        return [];
    }
};

export const getTodayTableSessions = async (tableId: number) => {
    const now = new Date();

    const startOfToday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0, 0, 0, 0
    );
    const endOfToday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        23, 59, 59, 999
    );

    endOfToday.setDate(endOfToday.getDate() + 1);
    try {
        const tableSessionOfTheDay = await db
            .select()
            .from(tableSession)
            .where(
                and(
                    eq(tableSession.tableId, tableId),
                    gte(tableSession.openedAt, startOfToday),
                    lt(tableSession.openedAt, endOfToday)
                )
            );
        return tableSessionOfTheDay;
    } catch (error) {
        console.log("error: ", error)
        return [];
    }
}

export const getTableInfoById = async (id: number) => {
    try {
        const res = await db.select().from(cafeTable).where(eq(cafeTable.id, id));
        return res;
        // return [];
    } catch (error) {
        console.error("error: ", error)
        return [];
    }
};

export const getCurrentTableSession = async (id: number) => {
    try {
        const res = await db.select().from(tableSession).where(and(eq(tableSession.status, "open"), eq(tableSession.tableId, id)));
        return res;
    } catch (error) {
        console.error("error: ", error)
        return [];
    }
};

export const startTable = async (tableId: number) => {
    try {
        const res = await db.insert(tableSession).values({
            tableId,
            status: "open",
            openedAt: new Date(),
        })
        refresh();
        return res;
    } catch (error) {
        console.error("error: ", error)
        return [];
    }
}

export const closeTable = async (tableSessionId: number) => {
    const [result] = await db
        .select({
            totalAmount: sql<number>`
      COALESCE(
        SUM(${orderItem.priceAtOrder} * ${orderItem.quantity}),
        0
      )
    `,
        })
        .from(orderItem)
        .where(eq(orderItem.tableSessionId, tableSessionId));

    try {
        const res = await db.update(tableSession).set({ status: "closed", closedAt: new Date(), totalAmount: result.totalAmount }).where(eq(tableSession.id, tableSessionId));
        refresh();
        return res;
    } catch (error) {
        console.error("error: ", error)
        return [];
    }
}

export const getOrdersBySessionId = async (tableSessionId: number) => {
    try {
        const res = await db.select({
            quantity: orderItem.quantity,
            priceAtOrder: orderItem.priceAtOrder,
            dishName: dish.name
        }).from(orderItem).where(eq(orderItem.tableSessionId, tableSessionId)).leftJoin(dish, eq(orderItem.dishId, dish.id));
        return res;
    } catch (error) {
        console.error("error: ", error)
        return [];
    }
}

export const getAllDishes = async () => {
    try {
        const res = await db.select().from(dish);
        return res;
    } catch (error) {
        console.error("error: ", error)
        return [];
    }
}
export const addOrderItem = async (data: any) => {
    try {
        const res = await db.insert(orderItem).values(data);
        revalidatePath(`/${data.tableSessionId}`);
        refresh();
        return res;
    } catch (error) {
        console.error("error: ", error)
        return [];
    }
}