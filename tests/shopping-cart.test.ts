import { ShoppingCart } from "../src/core/cart/ShoppingCart";
import { HeadphoneProduct } from "../src/core/catalog/HeadphoneProduct";

describe("ShoppingCart", () => {
    it("should add items and calculate total", () => {
        const cart = ShoppingCart.getInstance();
        cart.clear();

        const item = new HeadphoneProduct("Test", 500, true);

        cart.addItem(item);

        expect(cart.getItems().length).toBe(1);
        expect(cart.getTotalPrice()).toBe(500);
    });
});