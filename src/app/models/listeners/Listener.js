class Listener {

    /**
     * @param {string} to Target element for listener
     * @param {string} type Type of event
     * @param {function} cb
     */
    constructor(to, type, cb) {
        this.el = this._getEl(to);
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

    /**
     * @param {string} to Target element for listener
     * @returns {Node|Window|Document}
     * @private
     */
    _getEl(to) {
        switch (to) {
            case 'document':
                return document;
            case 'window':
                return window;
            default:
                return document.getElementById(to);
        }
    }

}

export default Listener;