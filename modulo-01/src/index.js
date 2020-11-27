const Cart = require('./lib/Cart');

const cart = new Cart()

cart.add({
  product: {
    title: 'Kindle',
    price: 26900,
  },
  quantity: 1,
});

console.log(cart.sumary());
