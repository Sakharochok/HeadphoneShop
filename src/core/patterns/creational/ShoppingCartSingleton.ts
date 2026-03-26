import { ICatalogComponent } from '../../models/ICatalogComponent';

export class ShoppingCart {
    private static instance: ShoppingCart;
    private items: ICatalogComponent[] = [];

    // Приватний конструктор (особливість Singleton)
    private constructor() {}

    public static getInstance(): ShoppingCart {
        if (!ShoppingCart.instance) {
            ShoppingCart.instance = new ShoppingCart();
        }
        return ShoppingCart.instance;
    }

    public addItem(item: ICatalogComponent): void {
        this.items.push(item);
        console.log(`🛒 Додано в кошик: ${item.getName()}`);
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