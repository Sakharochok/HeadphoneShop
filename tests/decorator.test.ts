import { HeadphoneProduct } from '../src/core/models/HeadphoneProduct';
import { DiscountDecorator } from '../src/core/patterns/structural/ProductDecorator';

describe('Decorator Pattern', () => {
    test('DiscountDecorator', () => {
        const product = new HeadphoneProduct("Test", 1000, true);
        const discountedProduct = new DiscountDecorator(product, 20);
        
        expect(discountedProduct.getPrice()).toBe(800);
        expect(discountedProduct.getName()).toContain("Знижка 20%");
    });
});