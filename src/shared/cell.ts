

export class Cell {
    private _isOpen: boolean = false;
    private _id: number;
    private _isBomb: boolean;
    private _count: number;

    constructor(id, isBomb, count ) {
        this._id = id;
        this._isBomb = isBomb;
        this._count = count;
    }

    get isOpen(): boolean {
        return this._isOpen;
    }

    set isOpen(newIsOpen: boolean){
        this._isOpen = newIsOpen;
    }

    get id(): number {
        return this._id;
    }

    set id(newId: number) {
        this._id = newId;
    }

    get isBomb(): boolean {
        return this._isBomb;
    }

    set isBomb(newIsBomb: boolean) {
        this._isBomb = newIsBomb;
    }

    get count(): number {
        return this._count;
    }

    set count(newCount) {
        this._count = newCount;
    }
}