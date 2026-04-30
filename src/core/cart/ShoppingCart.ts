import { ICatalogComponent } from "../catalog/ICatalogComponent";

export interface ICartObserver {
    update(data: {
        totalPrice: number;
        itemCount: number;
        items: ICatalogComponent[];
    }): void;
}

export class ShoppingCart {
    private static instance: ShoppingCart;
    private items: ICatalogComponent[] = [];
    private observers: ICartObserver[] = [];

    private constructor() {}

    static getInstance(): ShoppingCart {
        if (!ShoppingCart.instance) {
            ShoppingCart.instance = new ShoppingCart();
        }
        return ShoppingCart.instance;
    }

    addObserver(observer: ICartObserver): void {
        this.observers.push(observer);
    }

    removeObserver(observer: ICartObserver): void {
        this.observers = this.observers.filter(o => o !== observer);
    }

    private notify(): void {
        const data = {
            totalPrice: this.getTotalPrice(),
            itemCount: this.items.length,
            items: [...this.items]
        };

        this.observers.forEach(o => o.update(data));
    }

    addItem(item: ICatalogComponent): void {
        this.items.push(item);
        this.notify();
    }

    removeItem(item: ICatalogComponent): void {
        const index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
            this.notify();
        }
    }

    getItems(): ICatalogComponent[] {
        return this.items;
    }

    getTotalPrice(): number {
        return this.items.reduce((sum, i) => sum + i.getPrice(), 0);
    }

    clear(): void {
        this.items = [];
        this.notify();
    }
}