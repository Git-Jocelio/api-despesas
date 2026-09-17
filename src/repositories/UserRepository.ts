import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";

const publicColumns = {
    id: users.id,
    name: users.name,
    email: users.email,
};

export class UserRepository{
    async findAll() {
        return await db.select(publicColumns).from(users);
    }

    async findById(id: number) {
        const result = await db
            .select(publicColumns)
            .from(users)
            .where(eq(users.id, id));

        return result[0];
    }

    async findByemail(email: string) {
        const result = await db.select().from(users).where(eq(users.email, email));

        return result[0];
    }

    async create(name: string, email: string, password: string) {
        const result = await db
        .insert(users)
        .values({name, email, password})
        .returning(publicColumns);

        return result[0];
    }

}
