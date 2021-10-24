import {
  Item,
  Currency,
  CurrencySymbols,
  OrderedProduct,
  Order,
  Offer,
  OfferName,
  OfferDescription,
} from './interfaces';

export class Cart {
  readonly items: Item[] = [];
  grandTotal: number;
  discountedGrandTotal?: number;
  private currencySymbol: string;
  appliedOffers: Offer[] = [];
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

    if (!freeSoupLimit) return;

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

    this.appliedOffers.push({
      name: OfferName.SoupAndBreadBOGOF,
      description: OfferDescription.SoupAndBreadBOGOF,
    });
  }

  private applySundaySoupSale(day: number): void {
    if (day !== 0) return;

    let soupsCount = 0;
    this.items.forEach((item) => {
      if (item.name === 'Soup') {
        const priceWithoutSymbol = item.totalPrice.substring(1);
        const castedPrice = Number.parseFloat(priceWithoutSymbol);
        item.discountedPrice = `${this.currencySymbol}${castedPrice * 0.9}`;
        soupsCount++;
      }
    });

    if (!soupsCount) return;
    this.appliedOffers.push({
      name: OfferName.SundaySoupSale,
      description: OfferDescription.SundaySoupSale,
    });
  }

  private applyDairyDelicious(): void {
    let cheeseCount = 0;
    let milkCount = 0;

    if (this.sundaySaleSoupOfferIsApplied()) {
      return;
    }

    for (const item of this.items) {
      if (item.name === 'Cheese') ++cheeseCount;
      if (item.name === 'Milk') ++milkCount;
    }
    if (!cheeseCount && !milkCount) return;

    for (const item of this.items) {
      if (item.name === 'Milk') {
        item.discountedPrice = `${this.currencySymbol}${item.cost}`;
      }
    }

    this.appliedOffers.push({
      name: OfferName.DairyDelicious,
      description: OfferDescription.DairyDelicious,
    });
  }

  retrieveOrder(): Order {
    this.applyOffers();

    const order: Order = {
      items: this.items.map((item) => {
        delete item.cost;
        return item;
      }),
      grandTotal: this.sumGrandTotal(),
    };

    if (this.appliedOffers.length) order.appliedOffers = this.appliedOffers;

    return order;
  }

  private sundaySaleSoupOfferIsApplied(): boolean {
    const sundaySoupSaleOffer = this.appliedOffers.find(
      (offer) => offer.name === OfferName.SundaySoupSale
    );

    return sundaySoupSaleOffer ? true : false;
  }
}
