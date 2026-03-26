import { ICatalogComponent } from '../../models/ICatalogComponent';

// Спільний інтерфейс для всіх видів сортування
export interface ISortStrategy {
    sort(items: ICatalogComponent[]): ICatalogComponent[];
}

// Стратегія: Від дешевих до дорогих
export class PriceAscendingStrategy implements ISortStrategy {
    sort(items: ICatalogComponent[]): ICatalogComponent[] {
        // Робимо копію масиву і сортуємо за зростанням ціни
        return [...items].sort((a, b) => a.getPrice() - b.getPrice());
    }
}

// Стратегія: Від дорогих до дешевих
export class PriceDescendingStrategy implements ISortStrategy {
    sort(items: ICatalogComponent[]): ICatalogComponent[] {
        // Робимо копію масиву і сортуємо за спаданням ціни
        return [...items].sort((a, b) => b.getPrice() - a.getPrice());
    }
}