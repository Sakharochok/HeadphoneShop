import { ICatalogComponent } from "./ICatalogComponent";
import { ISortStrategy } from "./SortStrategy";

export class Category implements ICatalogComponent {
    private components: ICatalogComponent[] = [];
    private sortStrategy?: ISortStrategy;

    constructor(private name: string) {}

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
        return this.components.reduce(
            (sum, component) => sum + component.getPrice(),
            0
        );
    }

    getComponents(): ICatalogComponent[] {
        return this.components;
    }

    displayInfo(): void {
        let items = this.components;

        if (this.sortStrategy) {
            items = this.sortStrategy.sort(this.components);
        }

        for (const component of items) {
            component.displayInfo();
        }
    }
}