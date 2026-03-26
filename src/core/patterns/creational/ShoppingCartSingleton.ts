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
        const total = this.getTotalPrice();
        const count = this.items.length;
        this.observers.forEach(obs => obs.update(total, count));
    }

    public addItem(item: ICatalogComponent): void {
        this.items.push(item);
        this.notifyObservers();
    }

    public getTotalPrice(): number {
        return this.items.reduce((total, item) => total + item.getPrice(), 0);
    }

    public showCart(): void {
        console.log("\n--- Ваш кошик ---");
        if (this.items.length === 0) {
            console.log("Кошик порожній.");
            return;
        }
        this.items.forEach(item => console.log(`- ${item.getName()}: ${item.getPrice()} грн`));
        console.log(`Загальна сума: ${this.getTotalPrice()} грн`);
        console.log("-----------------\n");
    }
}