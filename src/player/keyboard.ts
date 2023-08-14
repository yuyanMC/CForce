let keyListeners: KeyListener[] = [];

class KeyListener {
    readonly k: string;
    private _op: ((e: KeyboardEvent) => void)[] = [];
    private _or: ((e: KeyboardEvent) => void)[] = [];
    holding: boolean = false;

    constructor(k: string) {
        this.k = k.toLowerCase();
    }

    set onPress(f: ((e: KeyboardEvent) => void)) {
        this._op.push(f);
    }

    get onPress(): ((e: KeyboardEvent) => void)[] {
        return this._op;
    }

    set onRelease(f: ((e: KeyboardEvent) => void)) {
        this._or.push(f);
    }

    get onRelease(): ((e: KeyboardEvent) => void)[] {
        return this._or;
    }
}

function registerKeyListener(keyListener: KeyListener) {
    keyListeners.push(keyListener);
}

document.addEventListener("keydown", (ev) => {
    keyListeners.forEach((e) => {
        if (ev.key.toLowerCase() == e.k) {
            if (!e.holding) {
                e.holding = true;
                e.onPress.forEach((e1) => e1(ev));
            }
        }
    })
});
document.addEventListener("keyup", (ev) => {
    keyListeners.forEach((e) => {
        if (ev.key.toLowerCase() == e.k) {
            if (e.holding) {
                e.holding = false;
                e.onRelease.forEach((e1) => e1(ev));
            }
        }
    })
});

export {KeyListener, registerKeyListener};