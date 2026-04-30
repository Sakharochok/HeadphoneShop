import { Category } from "../src/core/catalog/Category";
import { HeadphoneProduct } from "../src/core/catalog/HeadphoneProduct";

describe("Category (Composite)", () => {
    it("should calculate total price of all products", () => {
        const category = new Category("Test");

        const p1 = new HeadphoneProduct("A", 100, true);
        const p2 = new HeadphoneProduct("B", 200, false);

        category.add(p1);
        category.add(p2);

        expect(category.getPrice()).toBe(300);
    });
});