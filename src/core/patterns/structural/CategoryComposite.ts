import { ICatalogComponent } from '../../models/ICatalogComponent';
import { ISortStrategy } from '../behavioral/SortStrategy';

export class Category implements ICatalogComponent {
    private components: ICatalogComponent[] = [];
    private sortStrategy?: ISortStrategy; // Поле для зберігання обраної стратегії

    constructor(private name: string) {}

    // Метод, яким ми будемо перемикати сортування (той самий патерн Strategy)
    setSortStrategy(strategy: ISortStrategy): void {
        this.sortStrategy = strategy;
    }

    add(component: ICatalogComponent): void {
        this.components.push(component);
    }

    remove(component: ICatalogComponent): void {
        const index = this.components.indexOf(component);
        if (index > -1) {
            this.components.splice(index, 1);
        }
    }

    getName(): string {
        return this.name;
    }

    getPrice(): number {
        return this.components.reduce((sum, component) => sum + component.getPrice(), 0);
    }

    displayInfo(): void {
        console.log(`\n📁 Категорія: ${this.name}`);
        
        // Якщо стратегія встановлена, сортуємо товари перед тим, як їх показати
        let itemsToDisplay = this.components;
        if (this.sortStrategy) {
            itemsToDisplay = this.sortStrategy.sort(this.components);
            console.log(`   [Застосовано фільтр сортування]`);
        }

        for (const component of itemsToDisplay) {
            component.displayInfo();
        }
    }
}