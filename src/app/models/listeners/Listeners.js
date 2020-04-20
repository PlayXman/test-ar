import Listener from "./Listener";

class Listeners {

    /** @type {Map<any, Listener[]>} */
    listeners = new Map();

    /**
     * @param {any} target to Target element for listener
     * @param {string} type type Type of event
     * @param {function} cb
     */
    add(target, type, cb) {
        let values = [];

        if (this.listeners.has(target)) {
            values = this.listeners.get(target);
        }

        values.push(new Listener(target, type, cb));

        this.listeners.set(target, values);
    }

    /**
     * Removes listeners of some type on targeted element
     * @param {any} target Target element for listener
     * @param {string} type Type of event
     */
    remove(target, type) {
        const newListeners = [];

        this.listeners.get(target).forEach((listener) => {
            if (listener.type === type) {
                listener.remove();
            } else {
                newListeners.push(listener);
            }
        });

        if (newListeners.length) {
            this.listeners.set(target, newListeners);
        } else {
            this.listeners.delete(target);
        }
    }

    /**
     * Removes all listeners on targeted element
     * @param {any} target Target element for listener
     */
    removeAll(target) {
        this.listeners.get(target).forEach((listener) => {
            listener.remove();
        });
        this.listeners.delete(target);
    }

}

export default Listeners;