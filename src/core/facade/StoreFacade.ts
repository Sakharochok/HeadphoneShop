import { Category } from "../catalog/Category";
import { ICatalogComponent } from "../catalog/ICatalogComponent";
import { ISortStrategy } from "../catalog/SortStrategy";
import { ShoppingCart, ICartObserver } from "../cart/ShoppingCart";
import { OrderBuilder, Order } from "../orders/OrderBuilder";
import { IStorage } from "../storage/StorageAdapter";

export class StoreFacade {
    private catalog: Category;
    private cart: ShoppingCart;
    private storage?: IStorage;

    constructor(storage?: IStorage) {
        this.catalog = new Category("Catalog");
        this.cart = ShoppingCart.getInstance();
        this.storage = storage;
    }

    initCatalog(products: ICatalogComponent[]): void {
        products.forEach(p => this.catalog.add(p));
    }

    getCatalog(): Category {
        return this.catalog;
    }

    applySorting(strategy: ISortStrategy): void {
        this.catalog.setSortStrategy(strategy);
    }

    addToCart(item: ICatalogComponent): void {
        this.cart.addItem(item);
    }

    removeFromCart(item: ICatalogComponent): void {
        this.cart.removeItem(item);
    }

    getCartItems(): ICatalogComponent[] {
        return this.cart.getItems();
    }

    getCartTotal(): number {
        return this.cart.getTotalPrice();
    }

    subscribeToCart(observer: ICartObserver): void {
        this.cart.addObserver(observer);
    }

    createOrder(
        customerName: string,
        phone: string,
        address: string
    ): Order {
        const builder = new OrderBuilder();

        const order = builder
            .setCustomer(customerName, phone)
            .setDeliveryAddress(address)
            .setItems(this.cart.getItems(), this.cart.getTotalPrice())
            .build();

        return order;
    }

    saveOrder(order: Order): void {
        if (this.storage) {
            this.storage.save(order);
        }
    }
}