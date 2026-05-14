export interface SimulationResult {
    totalOrders: number;
    totalRevenue: number;
    mostPopularProduct: string;
    averageCartValue: number;
    executionTime: number;
}

export interface CustomerAction {
    productName: string;
    price: number;
}