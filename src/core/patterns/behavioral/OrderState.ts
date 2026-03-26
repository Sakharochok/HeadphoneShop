export interface IOrderContext {
    setState(state: IOrderState): void;
}

export interface IOrderState {
    pay(order: IOrderContext): void;
    ship(order: IOrderContext): void;
}

export class NewState implements IOrderState {
    pay(order: IOrderContext): void {
        console.log("Оплата прийнята.");
        order.setState(new PaidState());
    }
    ship(order: IOrderContext): void {
        console.log("Помилка: не можна відправити неоплачене замовлення.");
    }
}

export class PaidState implements IOrderState {
    pay(order: IOrderContext): void {
        console.log("Замовлення вже оплачено.");
    }
    ship(order: IOrderContext): void {
        console.log("Замовлення відправлено.");
        order.setState(new ShippedState());
    }
}

export class ShippedState implements IOrderState {
    pay(order: IOrderContext): void {
        console.log("Замовлення вже оплачено та відправлено.");
    }
    ship(order: IOrderContext): void {
        console.log("Замовлення вже відправлено.");
    }
}