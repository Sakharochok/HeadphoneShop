import { Category } from './CategoryComposite';
import { ShoppingCart } from '../creational/ShoppingCartSingleton';
import { ISortStrategy } from '../behavioral/SortStrategy';
import { ICatalogComponent } from '../../models/ICatalogComponent';
import { IObserver } from '../behavioral/Observer';

export class StoreFacade {
    private catalog: Category;
    private cart: ShoppingCart;

    constructor() {
        this.catalog = new Category("Головний каталог");
        this.cart = ShoppingCart.getInstance();
    }

    public initStore(products: ICatalogComponent[]): void {
        products.forEach(p => this.catalog.add(p));
    }

    public getCatalog(): Category {
        return this.catalog;
    }

    public applySorting(strategy: ISortStrategy): void {
        this.catalog.setSortStrategy(strategy);
    }

    public addToCart(item: ICatalogComponent): void {
        this.cart.addItem(item);
    }

    public displayCatalog(): void {
        this.catalog.displayInfo();
    }

    public subscribeToCart(observer: IObserver): void {
        this.cart.addObserver(observer);
    }
}