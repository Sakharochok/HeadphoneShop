import { CustomerSimulator } from "./CustomerSimulator";
import { SimulationAnalytics } from "./SimulationAnalytics";
import { SimulationResult, CustomerAction } from "./SimulationTypes";

export class ParallelSimulation {
    constructor(
        private simulator: CustomerSimulator
    ) {}

    async run(
        customerCount: number,
        workers: number
    ): Promise<SimulationResult> {

        const start = performance.now();

        const promises: Promise<CustomerAction[]>[] = [];

        const chunkSize = Math.ceil(customerCount / workers);

        for (let i = 0; i < workers; i++) {
            promises.push(
                new Promise(resolve => {
                    setTimeout(() => {
                        const actions: CustomerAction[] = [];

                        for (let j = 0; j < chunkSize; j++) {
                            actions.push(
                                ...this.simulator.simulateCustomer()
                            );
                        }

                        resolve(actions);
                    }, 0);
                })
            );
        }

        const results = await Promise.all(promises);

        const allActions = results.flat();

        const analytics =
            SimulationAnalytics.calculate(allActions);

        const end = performance.now();

        return {
            ...analytics,
            executionTime: end - start
        };
    }
}