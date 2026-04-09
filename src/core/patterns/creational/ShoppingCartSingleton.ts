import { ICatalogComponent } from '../../models/ICatalogComponent';
import { IObservable, IObserver } from '../behavioral/Observer';

export class ShoppingCart implements IObservable {
    private static instance: ShoppingCart;
    private items: ICatalogComponent[] = [];
    private observers: IObserver[] = [];

    private constructor() {}

    public static getInstance(): ShoppingCart {
        if (!ShoppingCart.instance) {
            ShoppingCart.instance = new ShoppingCart();
        }
        return ShoppingCart.instance;
    }

    public addObserver(observer: IObserver): void {
        this.observers.push(observer);
    }

    public removeObserver(observer: IObserver): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    public notifyObservers(): void {
        const data = {
            totalPrice: this.getTotalPrice(),
            itemCount: this.items.length,
            items: [...this.items]
        };
        this.observers.forEach(obs => obs.update(data));
    }

    public addItem(item: ICatalogComponent): void {
        this.items.push(item);
        this.notifyObservers();
    }

    public removeItem(item: ICatalogComponent): void {
        const index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
            this.notifyObservers();
        }
    }

    public getItems(): ICatalogComponent[] {
        return this.items;
    }

    public getTotalPrice(): number {
        return this.items.reduce((total, item) => total + item.getPrice(), 0);
    }
}