import { HeadphoneProduct } from "../src/core/catalog/HeadphoneProduct";
import { PriceAscendingStrategy, PriceDescendingStrategy } from "../src/core/catalog/SortStrategy";

describe("SortStrategy", () => {
    const p1 = new HeadphoneProduct("A", 300, true);
    const p2 = new HeadphoneProduct("B", 100, true);
    const p3 = new HeadphoneProduct("C", 200, true);

    const items = [p1, p2, p3];

    it("should sort ascending", () => {
        const strategy = new PriceAscendingStrategy();
        const sorted = strategy.sort(items);

        expect(sorted[0].getPrice()).toBe(100);
    });

    it("should sort descending", () => {
        const strategy = new PriceDescendingStrategy();
        const sorted = strategy.sort(items);

        expect(sorted[0].getPrice()).toBe(300);
    });
});