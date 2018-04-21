export default class Dispatcher {
    constructor() {
        this.subs = {};
    }

    attach(eventName, listener) {
        if (!this.subs[eventName]) {
            this.subs[eventName] = [];
        }
        this.subs[eventName].push(listener);
    }

    notify(eventName, ...args) {
        if (this.subs[eventName]) {
            this.subs[eventName].forEach(listener => listener(...args));
        }
    }
}
