import { ICatalogComponent } from '../../models/ICatalogComponent';
import { IOrderState, IOrderContext, NewState } from '../behavioral/OrderState';

export class Order implements IOrderContext {
    public customerName: string = '';
    public phone: string = '';
    public address: string = '';
    public items: ICatalogComponent[] = [];
    public total: number = 0;
    private state: IOrderState;

    constructor() {
        this.state = new NewState();
    }

    setState(state: IOrderState): void {
        this.state = state;
    }

    pay(): void {
        this.state.pay(this);
    }

    ship(): void {
        this.state.ship(this);
    }
}

export class OrderBuilder {
    private order: Order;

    constructor() {
        this.order = new Order();
    }

    setCustomer(name: string, phone: string): this {
        this.order.customerName = name;
        this.order.phone = phone;
        return this;
    }

    setDeliveryAddress(address: string): this {
        this.order.address = address;
        return this;
    }

    setItems(items: ICatalogComponent[], total: number): this {
        this.order.items = items;
        this.order.total = total;
        return this;
    }

    build(): Order {
        return this.order;
    }
}