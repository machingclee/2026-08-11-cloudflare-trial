import { Hono } from 'hono';

const app = new Hono<{ Bindings: Env }>()

app.get("/register/:username", async (c) => {
    const username = c.req.param("username");
    const stub = c.env.MY_DURABLE_OBJECT.getByName("foo");
    const result = await stub.createUser(username);
    return c.json({ result: { id: result } })
})

app.get("/user/:id", async (c) => {
    const id = c.req.param("id");
    const stub = c.env.MY_DURABLE_OBJECT.getByName("foo");
    const result = await stub.getUser(parseInt(id));
    return c.json({ result: { user: result } })
})


export default app;
