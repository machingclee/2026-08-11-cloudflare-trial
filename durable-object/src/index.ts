import { DurableObject, WorkerEntrypoint } from "cloudflare:workers";
import app from "./app";
import { MyDurableObject } from "./durable-object";

export { MyDurableObject };

export default class extends WorkerEntrypoint<Env> {
	async fetch(request: Request): Promise<Response> {
		return app.fetch(request, this.env, this.ctx)
	}
}
