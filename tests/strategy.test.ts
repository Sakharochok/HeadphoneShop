import { HeadphoneProduct } from '../src/core/models/HeadphoneProduct';
import { PriceAscendingStrategy, PriceDescendingStrategy } from '../src/core/patterns/behavioral/SortStrategy';

describe('Strategy Pattern', () => {
    const items = [
        new HeadphoneProduct("A", 200, false),
        new HeadphoneProduct("B", 100, false),
        new HeadphoneProduct("C", 300, false)
    ];

    test('PriceAscendingStrategy', () => {
        const strategy = new PriceAscendingStrategy();
        const sorted = strategy.sort(items);
        expect(sorted[0].getPrice()).toBe(100);
        expect(sorted[2].getPrice()).toBe(300);
    });

    test('PriceDescendingStrategy', () => {
        const strategy = new PriceDescendingStrategy();
        const sorted = strategy.sort(items);
        expect(sorted[0].getPrice()).toBe(300);
        expect(sorted[2].getPrice()).toBe(100);
    });
});