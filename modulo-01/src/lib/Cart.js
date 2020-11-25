import find from 'lodash/find';
import lshRemove from 'lodash/remove';

export default class Cart {
  items = [];

  add(item) {
    const { product } = item;

    if (find(this.items, { product })) {
      lshRemove(this.items, { product });
    }

    this.items.push(item)
  }

  remove(product) {
    lshRemove(this.items, { product });
  }

  getTotal() {
    return this.items.reduce((acc, curr) => {
      return acc + curr.quantity * curr.product.price;
    }, 0);
  }
}
