import { ICatalogComponent } from '../../models/ICatalogComponent';

// Базовий клас Декоратора (обгортка)
export abstract class ProductDecorator implements ICatalogComponent {
    // Декоратор зберігає посилання на товар, який він "обгортає"
    constructor(protected wrappedComponent: ICatalogComponent) {}

    getName(): string {
        return this.wrappedComponent.getName();
    }

    getPrice(): number {
        return this.wrappedComponent.getPrice();
    }

    displayInfo(): void {
        this.wrappedComponent.displayInfo();
    }
}

// Конкретний декоратор: Знижка
export class DiscountDecorator extends ProductDecorator {
    constructor(component: ICatalogComponent, private discountPercentage: number) {
        super(component);
    }

    // Змінюємо назву, додаючи інформацію про знижку
    getName(): string {
        return `${this.wrappedComponent.getName()} (Знижка ${this.discountPercentage}%)`;
    }

    // Рахуємо нову ціну
    getPrice(): number {
        const originalPrice = this.wrappedComponent.getPrice();
        return originalPrice - (originalPrice * (this.discountPercentage / 100));
    }

    // Змінюємо вивід в консоль
    displayInfo(): void {
        console.log(`🎁 АКЦІЯ: ${this.getName()} | Нова ціна: ${this.getPrice()} грн (Стара: ${this.wrappedComponent.getPrice()})`);
    }
}