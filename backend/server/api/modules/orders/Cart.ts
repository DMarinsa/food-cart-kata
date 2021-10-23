import {
  Item,
  Currency,
  CurrencySymbols,
  OrderedProduct,
  Order,
} from './interfaces';

export class Cart {
  readonly items: Item[] = [];
  grandTotal: number;
  readonly discountedGrandTotal?: number;
  private currencySymbol: string;
  constructor(readonly currency: Currency) {
    this.currencySymbol =
      this.currency === Currency.EUR
        ? CurrencySymbols.EUR
        : CurrencySymbols.USD;
  }

  private sumGrandTotal(): number {
    return this.items.reduce((acc, curr) => {
      const priceWithoutSymbol = curr.totalPrice.substring(1);
      const castedPrice = Number.parseFloat(priceWithoutSymbol);
      return acc + castedPrice;
    }, 0);
  }

  addLine(item: OrderedProduct): void {
    this.items.push({
      id: item.id,
      name: item.name,
      individualPrice: `${this.currencySymbol}${item.cost}`,
      totalPrice: `${this.currencySymbol}${item.cost * item.quantity}`,
    });
  }

  applyOffers(): void {
    const day = new Date().getDay();
    this.applySoupAndBreadBOGOF();
    this.applySundaySoupSale(day);
    this.applyDairyDelicious();
  }

  private applySoupAndBreadBOGOF(): void {
    let soupsCount = 0;
    let breadsCount = 0;

    this.items.forEach((item) => {
      if (!['Soup', 'Bread'].includes(item.name)) return;
      item.name === 'Soup' ? ++soupsCount : ++breadsCount;
    });

    const freeSoupLimit = Math.min(soupsCount, breadsCount, 3);

    for (let i = 0; i < freeSoupLimit; i++) {
      this.items.push({
        id: 1,
        name: 'Free Soup',
        individualPrice: `${this.currencySymbol}0`,
        totalPrice: `${this.currencySymbol}0`,
      });
    }
  }

  private applySundaySoupSale(day: number): void {
    if (day !== 0) return;

    let soupsCount = 0;
    let breadsCount = 0;

    this.items.forEach((item) => {
      if (!['Soup', 'Bread'].includes(item.name)) return;
      item.name === 'Soup' ? ++soupsCount : ++breadsCount;
    });
  }

  private applyDairyDelicious(): void {
    for (const item of this.items) {
      if (item.name === 'Free Soup') return;
    }
    let soupsCount = 0;
    let breadsCount = 0;

    this.items.forEach((item) => {
      if (!['Soup', 'Bread'].includes(item.name)) return;
      item.name === 'Soup' ? ++soupsCount : ++breadsCount;
    });
  }

  retrieveOrder(): Order {
    return {
      items: this.items,
      grandTotal: this.sumGrandTotal(),
    };
  }
}
