import { CustomerSimulator } from "../src/core/simulation/CustomerSimulator";
import { SequentialSimulation } from "../src/core/simulation/SequentialSimulation";
import { ParallelSimulation } from "../src/core/simulation/ParallelSimulation";

const products = [
    {
        getName: () => "Pro",
        getPrice: () => 2000
    },
    {
        getName: () => "Lite",
        getPrice: () => 1000
    }
];

describe("Simulation tests", () => {
    test("Customer simulator should generate actions", () => {
        const simulator = new CustomerSimulator(products);

        const actions = simulator.simulateCustomer();

        expect(actions.length).toBeGreaterThan(0);
    });

    test("Sequential simulation should return analytics", () => {
        const simulator = new CustomerSimulator(products);
                const simulation = new SequentialSimulation(simulator);

        const result = simulation.run(100);

        expect(result.totalOrders).toBeGreaterThan(0);
        expect(result.totalRevenue).toBeGreaterThan(0);
    });

    test("Parallel simulation should return analytics", async () => {
        const simulator = new CustomerSimulator(products);

        const simulation = new ParallelSimulation(simulator);

        const result = await simulation.run(100, 4);

        expect(result.totalOrders).toBeGreaterThan(0);
        expect(result.totalRevenue).toBeGreaterThan(0);
    });

    test("Simulation should calculate popular product", () => {
        const simulator = new CustomerSimulator(products);

        const simulation = new SequentialSimulation(simulator);

        const result = simulation.run(50);
        expect(result.mostPopularProduct).toBeDefined();
    });

    test("Simulation should calculate average cart value", () => {
        const simulator = new CustomerSimulator(products);

        const simulation = new SequentialSimulation(simulator);

        const result = simulation.run(50);

        expect(result.averageCartValue).toBeGreaterThan(0);
    });
});