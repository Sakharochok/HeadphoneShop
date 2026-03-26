import { HeadphoneProduct } from './core/models/HeadphoneProduct';
import { StoreFacade } from './core/patterns/structural/StoreFacade';
import { IObserver } from './core/patterns/behavioral/Observer';
import { DiscountDecorator } from './core/patterns/structural/ProductDecorator';
import { JsonFileAdapter } from './core/patterns/structural/StorageAdapter';
import { OrderBuilder } from './core/patterns/creational/OrderBuilder';
import { ShoppingCart } from './core/patterns/creational/ShoppingCartSingleton';
import { AddToCartCommand } from './core/patterns/behavioral/Command';
import { CatalogIterator } from './core/patterns/behavioral/Iterator';

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

console.log("=== КАТАЛОГ (Ітератор) ===");
const iterator = new CatalogIterator([headphone1, headphone2, headphone3]);
while (iterator.hasNext()) {
    const item = iterator.next();
    if (item) console.log(`- ${item.getName()}`);
}

console.log("\n=== ДІЇ КОРИСТУВАЧА (Команда) ===");
const cart = ShoppingCart.getInstance();
const command1 = new AddToCartCommand(cart, headphone1);
const command2 = new AddToCartCommand(cart, headphone3);

command1.execute();
command2.execute();
command2.undo(); 

const orderBuilder = new OrderBuilder();
const order = orderBuilder
    .setCustomer("Софія", "+380991234567")
    .setDeliveryAddress("Київ, вул. Хрещатик, 1")
    .setItems(cart.getItems(), cart.getTotalPrice())
    .build();

console.log("\n=== СТАТУСИ ЗАМОВЛЕННЯ (Стан) ===");
order.ship(); 
order.pay(); 
order.ship(); 

const db = new JsonFileAdapter('./src/data/database.json');
db.save(order);