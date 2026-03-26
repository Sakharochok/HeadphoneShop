export interface IObserver {
    update(totalPrice: number, itemCount: number): void;
}

export interface IObservable {
    addObserver(observer: IObserver): void;
    removeObserver(observer: IObserver): void;
    notifyObservers(): void;
}