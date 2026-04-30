import { ICatalogComponent } from "./ICatalogComponent";

export interface ISortStrategy {
    sort(items: ICatalogComponent[]): ICatalogComponent[];
}

export class PriceAscendingStrategy implements ISortStrategy {
    sort(items: ICatalogComponent[]): ICatalogComponent[] {
        return [...items].sort((a, b) => a.getPrice() - b.getPrice());
    }
}

export class PriceDescendingStrategy implements ISortStrategy {
    sort(items: ICatalogComponent[]): ICatalogComponent[] {
        return [...items].sort((a, b) => b.getPrice() - a.getPrice());
    }
}