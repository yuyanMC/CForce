type Handler<T = any> = (val: T) => void;
class EventBus<Events extends Record<string, any>> {
    private map: Map<string, Set<Handler>> = new Map();

    on<EventName extends keyof Events>(
        name: EventName,
        handler: Handler<Events[EventName]>
    ) {
        let set: Set<Handler<Events[EventName]>> | undefined = this.map.get(
            name as string
        );
        if (!set) {
            set = new Set();
            this.map.set(name as string, set);
        }
        set.add(handler);
    }

    emit<EventName extends keyof Events>(
        name: EventName,
        value: Events[EventName]
    ) {
        const set: Set<Handler<Events[EventName]>> | undefined = this.map.get(
            name as string
        );
        if (!set) return;
        const copied = [...set];
        copied.forEach((fn) => fn(value));
    }
}
export {EventBus};
export type {Handler};