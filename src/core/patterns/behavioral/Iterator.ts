import { ICatalogComponent } from '../../models/ICatalogComponent';

export interface IIterator<T> {
    hasNext(): boolean;
    next(): T | null;
}

export class CatalogIterator implements IIterator<ICatalogComponent> {
    private position: number = 0;

    constructor(private collection: ICatalogComponent[]) {}

    hasNext(): boolean {
        return this.position < this.collection.length;
    }

    next(): ICatalogComponent | null {
        if (this.hasNext()) {
            return this.collection[this.position++];
        }
        return null;
    }
}