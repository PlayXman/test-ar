class Listener {

    /**
     * @param {any} target Target element for listener
     * @param {string} type Type of event
     * @param {function} cb
     */
    constructor(target, type, cb) {
        this.el = target;
        this.type = type;
        this.cb = cb;

        this.el.addEventListener(type, cb);
    }

    /**
     * Removes the listener
     */
    remove() {
        this.el.removeEventListener(this.type, this.cb);
    }

}

export default Listener;