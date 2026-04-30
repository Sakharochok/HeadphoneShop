import { ICatalogComponent } from "../catalog/ICatalogComponent";

export class ParallelAnalytics {
    static async totalPrice(items: ICatalogComponent[]): Promise<number> {
        return new Promise((resolve) => {
            const prices = items.map(i => i.getPrice());

            const worker = new Worker(
                new URL("./worker.ts", import.meta.url),
                { type: "module" }
            );

            worker.postMessage(prices);

            worker.onmessage = (e) => {
                resolve(e.data);
                worker.terminate();
            };
        });
    }
}