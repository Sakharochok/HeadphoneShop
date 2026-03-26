import { HeadphoneProduct } from '../src/core/models/HeadphoneProduct';
import { Category } from '../src/core/patterns/structural/CategoryComposite';

describe('Composite Pattern', () => {
    test('HeadphoneProduct returns correct values', () => {
        const product = new HeadphoneProduct("Test Product", 1000, true);
        expect(product.getName()).toBe("Test Product");
        expect(product.getPrice()).toBe(1000);
    });

    test('Category calculates total price of its components', () => {
        const category = new Category("Test Category");
        const product1 = new HeadphoneProduct("P1", 100, false);
        const product2 = new HeadphoneProduct("P2", 200, true);
        
        category.add(product1);
        category.add(product2);
        
        expect(category.getPrice()).toBe(300);
    });

    test('Category handles nested categories correctly', () => {
        const mainCategory = new Category("Main");
        const subCategory = new Category("Sub");
        
        const product1 = new HeadphoneProduct("P1", 500, false);
        const product2 = new HeadphoneProduct("P2", 1500, true);
        
        subCategory.add(product1);
        mainCategory.add(subCategory);
        mainCategory.add(product2);
        
        expect(mainCategory.getPrice()).toBe(2000);
    });
});