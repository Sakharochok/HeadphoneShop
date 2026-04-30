import { ICatalogComponent } from "./ICatalogComponent";

export abstract class ProductDecorator implements ICatalogComponent {
    constructor(protected component: ICatalogComponent) {}

    getName(): string {
        return this.component.getName();
    }

    getPrice(): number {
        return this.component.getPrice();
    }

    displayInfo(): void {
        this.component.displayInfo();
    }
}

export class DiscountDecorator extends ProductDecorator {
    constructor(component: ICatalogComponent, private discount: number) {
        super(component);
    }

    getName(): string {
        return `${this.component.getName()} (${this.discount}% off)`;
    }

    getPrice(): number {
        const price = this.component.getPrice();
        return price - price * (this.discount / 100);
    }

    displayInfo(): void {
        console.log(
            `Discounted: ${this.getName()} | Price: ${this.getPrice()}`
        );
    }
}