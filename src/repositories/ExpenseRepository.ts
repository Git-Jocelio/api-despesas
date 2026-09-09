import { eq } from "drizzle-orm";
import { db } from "../db";
import { expenses } from "../db/schema";
import { Result } from "pg";

export class ExpenseRepository {
    async findAll() {
        return await db.select().from(expenses);
    }

    async findByById(id: number) {
        const result = await db
            .select()
            .from(expenses)
            .where(eq(expenses.id, id));

        return result[0];
    }

    async findByUserId(userId: number) {
        return await db
            .select()
            .from(expenses)
            .where(eq(expenses.userId, userId));
    }
    async create(
        description: string,
        amount: string,
        userId: number
    ) { 
        const result = await db
        .insert(expenses)
        .values({description, amount, userId,})
        .returning();

       return result[0]; 
    }

}//fim classe