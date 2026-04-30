import { HeadphoneProduct } from "./core/catalog/HeadphoneProduct";
import { DiscountDecorator } from "./core/catalog/ProductDecorator";
import { StoreFacade } from "./core/facade/StoreFacade";
import { JsonFileStorage } from "./core/storage/StorageAdapter";
import { Order } from "./core/orders/OrderBuilder";
import { CatalogIterator } from "./core/catalog/Iterator";
import { AddToCartCommand } from "./core/cart/AddToCartCommand";
import { ShoppingCart, ICartObserver } from "./core/cart/ShoppingCart";

class ConsoleCartUI implements ICartObserver {
    update(data: { totalPrice: number; itemCount: number }): void {
        console.log(
            `Cart updated → items: ${data.itemCount}, total: ${data.totalPrice}`
        );
    }
}

const storage = new JsonFileStorage("./src/data/database.json");
const store = new StoreFacade(storage);

const ui = new ConsoleCartUI();
store.subscribeToCart(ui);

const p1 = new HeadphoneProduct("Echo Pro", 2000, true);
const p2 = new HeadphoneProduct("Bass Boost", 3000, true);
const p3 = new DiscountDecorator(
    new HeadphoneProduct("Lite", 1000, false),
    10
);

store.initCatalog([p1, p2, p3]);

const iterator = new CatalogIterator([p1, p2, p3]);
while (iterator.hasNext()) {
    const item = iterator.next();
    if (item) {
        console.log(item.getName());
    }
}

const cart = ShoppingCart.getInstance();

const cmd1 = new AddToCartCommand(cart, p1);
const cmd2 = new AddToCartCommand(cart, p3);

cmd1.execute();
cmd2.execute();
cmd2.undo();

const order: Order = store.createOrder(
    "Sofia",
    "+3800000000",
    "Kyiv"
);

order.pay();
order.ship();

store.saveOrder(order);

import { ProductAnalytics } from "./core/analytics/ProductAnalytics";
import { ParallelAnalytics } from "./core/analytics/ParallelAnalytics";

const items = store.getCatalog().getComponents();

console.time("sequential");
const total1 = ProductAnalytics.totalPrice(items);
console.timeEnd("sequential");

console.time("parallel");
ParallelAnalytics.totalPrice(items).then(total2 => {
    console.timeEnd("parallel");

    console.log("Sequential:", total1);
    console.log("Parallel:", total2);
});