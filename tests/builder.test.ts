import { OrderBuilder } from "../src/core/orders/OrderBuilder";
import { HeadphoneProduct } from "../src/core/catalog/HeadphoneProduct";

describe("OrderBuilder", () => {
    it("should build order correctly", () => {
        const item = new HeadphoneProduct("Test", 1000, true);

        const order = new OrderBuilder()
            .setCustomer("Sofia", "+3800000000")
            .setDeliveryAddress("Kyiv")
            .setItems([item], 1000)
            .build();

        expect(order.customerName).toBe("Sofia");
        expect(order.phone).toBe("+3800000000");
        expect(order.address).toBe("Kyiv");
        expect(order.items.length).toBe(1);
        expect(order.total).toBe(1000);
    });
});