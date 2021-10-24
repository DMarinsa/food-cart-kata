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
  discountedGrandTotal?: number;
  private currencySymbol: string;
  constructor(readonly currency: Currency) {
    this.currencySymbol =
      this.currency === Currency.EUR
        ? CurrencySymbols.EUR
        : CurrencySymbols.USD;
  }

  private sumGrandTotal(): number {
    return this.items.reduce((acc, curr) => {
      const usedValue = curr.discountedPrice ? 'discountedPrice' : 'totalPrice';
      const priceWithoutSymbol = curr[usedValue].substring(1);
      const castedPrice = Number.parseFloat(priceWithoutSymbol);
      return acc + castedPrice;
    }, 0);
  }

  addLine(item: OrderedProduct): void {
    this.items.push({
      id: item.id,
      cost: item.cost,
      individualPrice: `${this.currencySymbol}${item.customerPrice}`,
      name: item.name,
      totalPrice: `${this.currencySymbol}${item.customerPrice * item.quantity}`,
      quantity: item.quantity,
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
      item.name === 'Soup'
        ? (soupsCount += item.quantity)
        : (breadsCount += item.quantity);
    });

    const freeSoupLimit = Math.min(soupsCount, breadsCount, 3);

    for (let i = 0; i < freeSoupLimit; i++) {
      this.items.push({
        id: 1,
        name: 'Free Soup',
        individualPrice: `${this.currencySymbol}0`,
        totalPrice: `${this.currencySymbol}0`,
        cost: 0,
        quantity: 1,
      });
    }
  }

  private applySundaySoupSale(day: number): void {
    if (day !== 0) return;

    let soupsCount = 0;
    this.items.forEach((item) => {
      if (item.name === 'Soup') soupsCount++;
    });

    if (soupsCount) this.discountedGrandTotal = this.grandTotal * 0.9;
  }

  private applyDairyDelicious(): void {
    let cheeseCount = 0;
    let milkCount = 0;
    for (const item of this.items) {
      if (item.name === 'Free Soup') return;
      if (item.name === 'Cheese') ++cheeseCount;
      if (item.name === 'Milk') ++milkCount;
    }
    if (!cheeseCount && !milkCount) return;

    for (const item of this.items) {
      if (item.name === 'Milk') {
        item.discountedPrice = `${this.currencySymbol}${item.cost}`;
      }
    }
  }

  retrieveOrder(): Order {
    this.applyOffers();
    return {
      items: this.items.map((item) => {
        delete item.cost;
        return item;
      }),
      grandTotal: this.sumGrandTotal(),
    };
  }
}
