import { OrderBuilder } from '../src/core/patterns/creational/OrderBuilder';
import { HeadphoneProduct } from '../src/core/models/HeadphoneProduct';

describe('Builder Pattern', () => {
    test('OrderBuilder', () => {
        const builder = new OrderBuilder();
        const items = [new HeadphoneProduct("A", 1000, false)];
        
        const order = builder
            .setCustomer("John Doe", "+3800000000")
            .setDeliveryAddress("Kyiv")
            .setItems(items, 1000)
            .build();
            
        expect(order.customerName).toBe("John Doe");
        expect(order.phone).toBe("+3800000000");
        expect(order.address).toBe("Kyiv");
        expect(order.total).toBe(1000);
        expect(order.items.length).toBe(1);
    });
});