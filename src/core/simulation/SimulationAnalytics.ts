import { CustomerAction } from "./SimulationTypes";

export class SimulationAnalytics {
    static calculate(actions: CustomerAction[]) {
        const productCount = new Map<string, number>();

        let totalRevenue = 0;

        for (const action of actions) {
            totalRevenue += action.price;

            productCount.set(
                action.productName,
                (productCount.get(action.productName) || 0) + 1
            );
        }

        let mostPopularProduct = "";
        let maxCount = 0;

        for (const [name, count] of productCount.entries()) {
            if (count > maxCount) {
                maxCount = count;
                mostPopularProduct = name;
            }
        }

        return {
            totalOrders: actions.length,
            totalRevenue,
            mostPopularProduct,
            averageCartValue:
                actions.length > 0
                    ? totalRevenue / actions.length
                    : 0
        };
    }
}