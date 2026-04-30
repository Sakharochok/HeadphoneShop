import { ICatalogComponent } from "../catalog/ICatalogComponent";

export interface ICartObserver {
    update(data: {
        totalPrice: number;
        itemCount: number;
        items: ICatalogComponent[];
    }): void;
}