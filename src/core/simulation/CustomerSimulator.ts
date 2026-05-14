import { CustomerAction } from "./SimulationTypes";

export class CustomerSimulator {
    constructor(
        private products: { getName(): string; getPrice(): number }[]
    ) {}

    simulateCustomer(): CustomerAction[] {
        const actions: CustomerAction[] = [];

        const cartSize = Math.floor(Math.random() * 5) + 1;

        for (let i = 0; i < cartSize; i++) {
            const product =
                this.products[
                    Math.floor(Math.random() * this.products.length)
                ];

            actions.push({
                productName: product.getName(),
                price: product.getPrice()
            });
        }

        return actions;
    }

    simulateManyCustomers(count: number) {
        let revenue = 0;
        let orders = 0;

        const productStats: Record<string, number> = {};

        const cartValues: number[] = [];

        for (let i = 0; i < count; i++) {
            const actions = this.simulateCustomer();

            let cartTotal = 0;

            actions.forEach(action => {
                revenue += action.price;
                cartTotal += action.price;

                productStats[action.productName] =
                    (productStats[action.productName] || 0) + 1;
            });

            cartValues.push(cartTotal);
            orders++;
        }

        const mostPopularProduct =
            Object.entries(productStats).sort(
                (a, b) => b[1] - a[1]
            )[0]?.[0] || "None";

        const averageCartValue =
            cartValues.reduce((a, b) => a + b, 0) /
            cartValues.length;

        return {
            revenue,
            orders,
            mostPopularProduct,
            averageCartValue
        };
    }
}