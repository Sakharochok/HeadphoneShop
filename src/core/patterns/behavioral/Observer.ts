import { ICatalogComponent } from '../../models/ICatalogComponent';

export interface IObserver {
    update(cartData: { totalPrice: number, itemCount: number, items: ICatalogComponent[] }): void;
}

export interface IObservable {
    addObserver(observer: IObserver): void;
    removeObserver(observer: IObserver): void;
    notifyObservers(): void;
}