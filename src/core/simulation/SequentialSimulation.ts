import { CustomerSimulator } from "./CustomerSimulator";
import { SimulationAnalytics } from "./SimulationAnalytics";
import { SimulationResult, CustomerAction } from "./SimulationTypes";

export class SequentialSimulation {
    constructor(
        private simulator: CustomerSimulator
    ) {}

    run(customerCount: number): SimulationResult {
        const start = performance.now();

        const actions: CustomerAction[] = [];

        for (let i = 0; i < customerCount; i++) {
            actions.push(...this.simulator.simulateCustomer());
        }

        const analytics = SimulationAnalytics.calculate(actions);

        const end = performance.now();

        return {
            ...analytics,
            executionTime: end - start
        };
    }
}