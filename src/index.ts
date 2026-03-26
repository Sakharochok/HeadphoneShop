import { HeadphoneProduct } from './core/models/HeadphoneProduct';
import { Category } from './core/patterns/structural/CategoryComposite';
import { ShoppingCart } from './core/patterns/creational/ShoppingCartSingleton';
import { PriceAscendingStrategy, PriceDescendingStrategy } from './core/patterns/behavioral/SortStrategy';

// 1. Створюємо товари з різними цінами
const headphone1 = new HeadphoneProduct("Відлуння", 900, false);
const headphone2 = new HeadphoneProduct("Відлуння Pro", 1960, true);
const headphone3 = new HeadphoneProduct("Відлуння Bass", 2600, true);
const headphone4 = new HeadphoneProduct("Відлуння Lite", 500, true);

// 2. Створюємо категорію
const wirelessCategory = new Category("Бездротові навушники");
wirelessCategory.add(headphone2); // 1960
wirelessCategory.add(headphone3); // 2600
wirelessCategory.add(headphone4); // 500

console.log("=== ЗВИЧАЙНИЙ ВИВІД (як додали) ===");
wirelessCategory.displayInfo();

// 3. Застосовуємо Стратегію: Від дешевих до дорогих
console.log("\n=== СОРТУВАННЯ: ВІД ДЕШЕВИХ ДО ДОРОГИХ ===");
wirelessCategory.setSortStrategy(new PriceAscendingStrategy());
wirelessCategory.displayInfo();

// 4. Змінюємо Стратегію на льоту: Від дорогих до дешевих
console.log("\n=== СОРТУВАННЯ: ВІД ДОРОГИХ ДО ДЕШЕВИХ ===");
wirelessCategory.setSortStrategy(new PriceDescendingStrategy());
wirelessCategory.displayInfo();