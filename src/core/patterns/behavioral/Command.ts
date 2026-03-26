import { ShoppingCart } from '../creational/ShoppingCartSingleton';
import { ICatalogComponent } from '../../models/ICatalogComponent';

export interface ICommand {
    execute(): void;
    undo(): void;
}

export class AddToCartCommand implements ICommand {
    constructor(
        private cart: ShoppingCart,
        private item: ICatalogComponent
    ) {}

    execute(): void {
        this.cart.addItem(this.item);
    }

    undo(): void {
        this.cart.removeItem(this.item);
    }
}