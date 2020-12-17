import find from 'lodash/find';
import lshRemove from 'lodash/remove';
import Dinero from 'dinero.js';

Dinero.defaultCurrency = 'BRL';
Dinero.defaultPrecision = 2;

const calculatePercentageDiscount = (amount, item) => {
  if (item.quantity > item.condition.minimum) {
    return amount.percentage(item.condition.percentage);
  }

  return Dinero({ amount: 0 });
};

const calculateQuantityDiscount = (amount, item) => {
  if (item.quantity > item.condition.quantity) {
    const isEven = item.quantity % 2 === 0;
    return amount.percentage(isEven ? 50 : 40);
  }

  return Dinero({ amount: 0 });
};

const calculateDiscount = (amount, quantity, condition) => {
  const list = Array.isArray(condition) ? condition : [condition];

  const [highterDiscount] = list
    .map(cond => {
      const item = { quantity, condition: cond };

      if (cond.percentage) {
        return calculatePercentageDiscount(amount, item).getAmount();
      } else if (cond.quantity) {
        return calculateQuantityDiscount(amount, item).getAmount();
      }
    })
    .sort((a, b) => b - a);

  return Dinero({ amount: highterDiscount });
};

export default class Cart {
  constructor() {
    this.items = [];
  }

  add(item) {
    const { product } = item;

    if (find(this.items, { product })) {
      lshRemove(this.items, { product });
    }

    this.items.push(item);
  }

  remove(product) {
    lshRemove(this.items, { product });
  }

  getTotal() {
    return this.items.reduce((acc, item) => {
      const amount = Dinero({ amount: item.quantity * item.product.price });
      let discount = Dinero({ amount: 0 });

      if (item.condition) {
        discount = calculateDiscount(amount, item.quantity, item.condition);
      }

      return acc.add(amount).subtract(discount);
    }, Dinero({ amount: 0 }));
  }

  sumary() {
    return {
      total: this.getTotal().getAmount(),
      items: this.items,
    };
  }

  checkout() {
    const sumary = this.sumary();

    this.items = [];

    return sumary;
  }
}
