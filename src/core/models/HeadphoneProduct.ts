import { ICatalogComponent } from './ICatalogComponent';

export class HeadphoneProduct implements ICatalogComponent {
    constructor(
        private name: string,
        private price: number,
        private isWireless: boolean
    ) {}

    getName(): string {
        return this.name;
    }

    getPrice(): number {
        return this.price;
    }

    displayInfo(): void {
        console.log(`🎧 Товар: ${this.name} | Ціна: ${this.price} грн | Бездротові: ${this.isWireless ? 'Так' : 'Ні'}`);
    }
}