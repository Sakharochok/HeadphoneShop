import { ShoppingCart } from '../src/core/patterns/creational/ShoppingCartSingleton';
import { HeadphoneProduct } from '../src/core/models/HeadphoneProduct';

describe('ShoppingCart (Singleton Pattern)', () => {
    
    test('повинен завжди повертати один і той самий екземпляр (Singleton)', () => {
        const cart1 = ShoppingCart.getInstance();
        const cart2 = ShoppingCart.getInstance();
        
        // Перевіряємо, чи cart1 і cart2 — це буквально один і той самий об'єкт у пам'яті
        expect(cart1).toBe(cart2);
    });

    test('повинен правильно рахувати загальну суму товарів', () => {
        const cart = ShoppingCart.getInstance();
        
        // Фіксуємо початкову суму (на випадок, якщо в кошику вже щось є з попередніх тестів)
        const initialTotal = cart.getTotalPrice();
        
        // Створюємо тестовий товар
        const testHeadphone = new HeadphoneProduct("Тестові навушники", 1500, true);
        
        // Додаємо в кошик
        cart.addItem(testHeadphone);
        
        // Перевіряємо, чи сума збільшилась рівно на 1500
        expect(cart.getTotalPrice()).toBe(initialTotal + 1500);
    });
});