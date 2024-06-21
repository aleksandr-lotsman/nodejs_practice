export class EventEmitter {
    listeners: Listener = {}; // key-value pair

    addListener(eventName: string, fn: Function): void {
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(fn);
    }

    on(eventName: string, fn: (msg: string, code?: number) => void): void {
        this.addListener(eventName, fn);
    }

    removeListener(eventName: string, fn: Function): void {
        if (this.listeners[eventName]) {
            this.listeners[eventName] = this.listeners[eventName].filter(
                (listener: Listener) => listener !== fn
            );
        }
    }

    off(eventName: string, fn: Function): void {
        this.removeListener(eventName, fn);
    }

    once(eventName: string, fn: Function): void {
        let wrapperFn = (...args):void => {
            fn.apply(args);
            this.removeListener(eventName, wrapperFn);
        }
        this.addListener(eventName, wrapperFn);
    }

    emit(eventName: string, ...args): void {
        let fns: Function[] = this.listeners[eventName];
        if (fns) {
            fns.forEach((fn: Function) => {
                fn(...args);
            });
        }
    }

    listenerCount(eventName: string): number {
        let listeners = this.listeners[eventName] || [];
        return listeners.length;
    }

    rawListeners(eventName: string): string[] {
        return this.listeners[eventName] ? Array.from(this.listeners[eventName]) : [];
    }
}

interface Listener {
    eventName?: string
    fn?: Function[]
}

const myEmitter: EventEmitter = new EventEmitter();

function c1() {
    console.log("an event occurred!");
}

function c2() {
    console.log("yet another event occurred!");
}

myEmitter.on("eventOne", c1); // Register for eventOne
myEmitter.on("eventOne", c2); // Register for eventOne

// Register eventOnce for one time execution
myEmitter.once("eventOnce", () => console.log("eventOnce once fired"));
myEmitter.once("init", () => console.log("init once fired"));

// Register for 'status' event with parameters
myEmitter.on("status", (msg, code) => console.log(`Got ${code} and ${msg}`));

myEmitter.emit("eventOne");

// Emit 'eventOnce' -> After this the eventOnce will be
// removed/unregistered automatically
myEmitter.emit("eventOnce");

myEmitter.emit("eventOne");
myEmitter.emit("init");
myEmitter.emit("init"); // Will not be fired
myEmitter.emit("eventOne");
myEmitter.emit("status",  "ok", 200);

// Get listener's count
console.log(myEmitter.listenerCount("eventOne"));

// Get array of rawListeners//
// Event registered with 'once()' will not be available here after the
// emit has been called
console.log(myEmitter.rawListeners("eventOne"));

// Get listener's count after remove one or all listeners of 'eventOne'
myEmitter.off("eventOne", c1);
console.log(myEmitter.listenerCount("eventOne"));
myEmitter.off("eventOne", c2);
console.log(myEmitter.listenerCount("eventOne"));
