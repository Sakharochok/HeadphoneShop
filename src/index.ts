import { HeadphoneProduct } from './core/models/HeadphoneProduct';
import { StoreFacade } from './core/patterns/structural/StoreFacade';
import { IObserver } from './core/patterns/behavioral/Observer';
import { DiscountDecorator } from './core/patterns/structural/ProductDecorator';
import { JsonFileAdapter } from './core/patterns/structural/StorageAdapter';
import { OrderBuilder } from './core/patterns/creational/OrderBuilder';
import { ShoppingCart } from './core/patterns/creational/ShoppingCartSingleton';

class CartUI implements IObserver {
    update(totalPrice: number, itemCount: number): void {
        console.log(`🔔 [UI Оновлено] Товарів: ${itemCount} | Сума: ${totalPrice} грн`);
    }
}

const store = new StoreFacade();
const ui = new CartUI();
store.subscribeToCart(ui);

const headphone1 = new HeadphoneProduct("Відлуння Pro", 1960, true);
const headphone2 = new HeadphoneProduct("Відлуння Bass", 2600, true);
const headphone3 = new DiscountDecorator(new HeadphoneProduct("Відлуння", 900, false), 10);

store.initStore([headphone1, headphone2, headphone3]);

store.addToCart(headphone1);
store.addToCart(headphone3);

const cart = ShoppingCart.getInstance();
const orderBuilder = new OrderBuilder();

const order = orderBuilder
    .setCustomer("Софія", "+380991234567")
    .setDeliveryAddress("Київ, вул. Хрещатик, 1")
    .setItems(cart.getItems(), cart.getTotalPrice())
    .build();

console.log("\n=== СФОРМОВАНЕ ЗАМОВЛЕННЯ ===");
console.log(order);

const db = new JsonFileAdapter('./src/data/database.json');
db.save(order);
console.log("\n💾 Замовлення збережено у базу даних (database.json)!");