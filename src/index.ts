import { HeadphoneProduct } from './core/models/HeadphoneProduct';
import { ShoppingCart } from './core/patterns/creational/ShoppingCartSingleton';
import { DiscountDecorator } from './core/patterns/structural/ProductDecorator';

// 1. Створюємо звичайні товари
const standardHeadphone = new HeadphoneProduct("Відлуння Pro", 2000, true);
const basicHeadphone = new HeadphoneProduct("Відлуння", 1000, false);

// 2. Застосовуємо Декоратор (робимо знижку 15% на Відлуння Pro)
const discountedHeadphone = new DiscountDecorator(standardHeadphone, 15);
// Застосовуємо Декоратор (знижка 50% на базове Відлуння)
const blackFridayHeadphone = new DiscountDecorator(basicHeadphone, 50);

console.log("=== КАТАЛОГ ТОВАРІВ ===");
standardHeadphone.displayInfo();
discountedHeadphone.displayInfo(); // Цей об'єкт поводиться як товар, але ціна вже інша!
blackFridayHeadphone.displayInfo();

// 3. Додаємо в кошик товар зі знижкою
const cart = ShoppingCart.getInstance();
cart.addItem(standardHeadphone); // Додаємо за повну ціну
cart.addItem(blackFridayHeadphone); // Додаємо зі знижкою

cart.showCart();