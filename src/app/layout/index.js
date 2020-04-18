class Layout {

    buttonsState = new Map();

    constructor() {
        this.root = document.createElement('div');
        this.root.classList.add('layout');
    }

    createAddButton(onCb, offCb) {
        const btn = this._createButton('add', onCb, offCb);

        this._setNewBtn('add', btn);
    }

    render() {
        return this.root;
    }

    _createButton(name, onCb, offCb) {
        const button = document.createElement('button');
        button.classList.add('layout__button');
        button.classList.add('layout__button--' + name);
        button.innerText = name;
        button.dataset.name = name;
        button.addEventListener('click', (e) => {
            e.preventDefault();

            const name = e.target.dataset.name;
            const active = this.buttonsState.get(name)

            if (active) {
                e.target.classList.remove('layout__button--active');
                offCb();
            } else {
                e.target.classList.add('layout__button--active');
                onCb();
            }

            this.buttonsState.set(name, !active);
        });

        return button;
    }

    _setNewBtn(name, button) {
        this.root.appendChild(button);
        this.buttonsState.set(name, false);
    }

}

export default Layout;