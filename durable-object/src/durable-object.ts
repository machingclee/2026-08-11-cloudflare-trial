import { DurableObject } from "cloudflare:workers";

/** A Durable Object's behavior is defined in an exported Javascript class */
export class MyDurableObject extends DurableObject<Env> {
    private sql: SqlStorage

    constructor(ctx: DurableObjectState, env: Env) {
        super(ctx, env);

        this.sql = this.ctx.storage.sql;
        ctx.blockConcurrencyWhile(async () => {
            this.sql.exec(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT NOT NULL UNIQUE
        )`);
        });
    }

    async createUser(username: string): Promise<number> {
        const result = this.sql.exec<{ id: number }>(
            "INSERT INTO users (username) VALUES (?) RETURNING id",
            username
        );
        return result.one().id;
    }

    async getUser(id: number): Promise<{ id: number; username: string } | null> {
        const result = this.sql.exec<{ id: number; username: string }>(
            "SELECT id, username FROM users WHERE id = ?",
            id
        );
        return result.toArray()[0] ?? null;
    }
}