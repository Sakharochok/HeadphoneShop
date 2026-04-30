export interface IOrderContext {
    setState(state: IOrderState): void;
}

export interface IOrderState {
    pay(order: IOrderContext): void;
    ship(order: IOrderContext): void;
}

export class NewState implements IOrderState {
    pay(order: IOrderContext): void {
        order.setState(new PaidState());
    }

    ship(order: IOrderContext): void {}
}

export class PaidState implements IOrderState {
    pay(order: IOrderContext): void {}

    ship(order: IOrderContext): void {
        order.setState(new ShippedState());
    }
}

export class ShippedState implements IOrderState {
    pay(order: IOrderContext): void {}

    ship(order: IOrderContext): void {}
}