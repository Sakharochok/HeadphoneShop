import { HeadphoneProduct } from './core/models/HeadphoneProduct';
import { StoreFacade } from './core/patterns/structural/StoreFacade';
import { IObserver } from './core/patterns/behavioral/Observer';
import { DiscountDecorator } from './core/patterns/structural/ProductDecorator';

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

console.log("=== КАТАЛОГ МАГАЗИНУ ===");
store.displayCatalog();

console.log("\n=== ДІЇ КОРИСТУВАЧА ===");
store.addToCart(headphone1);
store.addToCart(headphone3);