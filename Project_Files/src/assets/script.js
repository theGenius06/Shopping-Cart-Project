/* Place stand out suggestions here (stand out suggestions can be found at the bottom of the project rubric.) */

/* The following is for running unit tests. 
   To fully complete this project, it is expected that all tests pass.
   Run the following command in terminal to run tests
   npm run test
*/

let products = [
  { name: "Cherries", 
  price: 3.99, 
  quantity: 0, 
  productId: 1, 
  image: "images/cherry.jpg"},
   
  { name: "Strawberries", 
  price: 4.99, 
  quantity: 0, 
  productId: 2, 
  image: "images/strawberry.jpg"},
  
  { name: "Oranges", 
  price: 9.99, 
  quantity: 0, 
  productId: 3, 
  image: "images/orange.jpg"}
];

// Cart array to hold added items
let cart = [];

// Add product to cart
function addProductToCart(productId) {
  let product = products.find(item => item.productId === productId);
  if (product) { 
      product.quantity += 1;
      if (!cart.includes(product)) cart.push(product);
  }
}

// Increase product quantity in cart
function increaseQuantity(productId) {
  let product = cart.find(item => item.productId === productId);
  if (product) product.quantity += 1;
}

// Decrease product quantity in cart
function decreaseQuantity(productId) {
  let product = cart.find(item => item.productId === productId);
  if (product && product.quantity > 0) {
      product.quantity -= 1;
      if (product.quantity === 0) removeProductFromCart(productId);
  }
}

// Remove product from cart
function removeProductFromCart(productId) {
  cart = cart.filter(item => item.productId !== productId);
}

// Calculate total cost of items in the cart
function cartTotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

let totalPaid = 0;

// Process payment and return change or remaining balance
function pay(amount) {
  const total = cartTotal();
  totalPaid = totalPaid + amount;
  let remaining = totalPaid - total;
  if (remaining > 0) {
    totalPaid = totalPaid - remaining;
  }
  return remaining;
}

// Empty the cart
function emptyCart() {
  cart = [];
  products.forEach(product => (product.quantity = 0));
}

module.exports = {
    products,
    cart,
    addProductToCart,
    increaseQuantity,
    decreaseQuantity,
    removeProductFromCart,
    cartTotal,
    pay,
    emptyCart
};