import { HeadphoneProduct } from "../src/core/catalog/HeadphoneProduct";
import { DiscountDecorator } from "../src/core/catalog/ProductDecorator";

describe("Decorator", () => {
    it("should apply discount correctly", () => {
        const product = new HeadphoneProduct("Test", 1000, true);
        const discounted = new DiscountDecorator(product, 10);

        expect(discounted.getPrice()).toBe(900);
    });
});