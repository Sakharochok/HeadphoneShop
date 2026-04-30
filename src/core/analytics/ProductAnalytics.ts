import { ICatalogComponent } from "../catalog/ICatalogComponent";

export class ProductAnalytics {
    static totalPrice(items: ICatalogComponent[]): number {
        return items.reduce((sum, i) => sum + i.getPrice(), 0);
    }

    static averagePrice(items: ICatalogComponent[]): number {
        if (items.length === 0) return 0;
        return this.totalPrice(items) / items.length;
    }

    static maxPrice(items: ICatalogComponent[]): number {
        return Math.max(...items.map(i => i.getPrice()));
    }
}