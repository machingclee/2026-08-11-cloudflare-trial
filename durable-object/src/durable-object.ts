import { DurableObject } from "cloudflare:workers";

/** A Durable Object's behavior is defined in an exported Javascript class */
export class MyDurableObject extends DurableObject<Env> {
    constructor(ctx: DurableObjectState, env: Env) {
        super(ctx, env);
    }
    async sayHello(name: string): Promise<string> {
        return `Hello, ${name}!`;
    }

    async createAlarm() {
        const alarm = await this.ctx.storage.getAlarm();
        if (!alarm) {
            this.ctx.storage.setAlarm(Date.now() + 1000 * 60 * 5); // Set an alarm for 5 minutes from now
        }
    }

    async alarm(_alarmInfo?: AlarmInvocationInfo): Promise<void> {
        // no-op
    }
}