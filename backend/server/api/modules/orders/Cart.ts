import {
  Item,
  OrderDto,
  Currency,
  CurrencySymbols,
  OrderedProduct,
  Order,
} from './interfaces';

export class Cart {
  readonly items: Item[] = [];
  grandTotal: number;
  readonly discountedGrandTotal?: number;
  constructor(readonly currency: Currency) {}

  private sumGrandTotal(): number {
    return this.items.reduce((acc, curr) => {
      const priceWithoutSymbol = curr.totalPrice.substring(1);
      const castedPrice = Number.parseFloat(priceWithoutSymbol);
      return acc + castedPrice;
    }, 0);
  }

  addLine(item: OrderedProduct): void {
    const currencySymbol =
      this.currency === Currency.EUR
        ? CurrencySymbols.EUR
        : CurrencySymbols.USD;
    this.items.push({
      id: item.id,
      name: item.name,
      individualPrice: `${currencySymbol}${item.cost}`,
      totalPrice: `${currencySymbol}${item.cost * item.quantity}`,
    });
  }

  retrieveOrder(): Order {
    return {
      items: this.items,
      grandTotal: this.sumGrandTotal(),
    };
  }
}
