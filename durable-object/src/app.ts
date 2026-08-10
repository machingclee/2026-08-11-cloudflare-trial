import { Hono } from 'hono';

const app = new Hono<{ Bindings: Env }>()

app.get('/hello', (c) => {
    const stub = c.env.MY_DURABLE_OBJECT.getByName("foo");
    stub.sayHello("world");
    return c.json({ message: 'hi' })
})

export default app;
