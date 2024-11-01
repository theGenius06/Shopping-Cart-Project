let currencySymbol = "$";

// Draws the product list
function drawProducts() {
    const productList = document.querySelector(".products");
    if (!productList) {
        console.error("No .products element found in the DOM");
        return;
    }

    let productItems = products.map(product => `
        <div class="product-card" data-productId="${product.productId}">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: ${currencySymbol}${product.price}</p>
            <button class="add-to-cart">Add to Cart</button>
        </div>
    `).join("");

    productList.innerHTML = productItems;
}

// Call the function on page load to render the products

// Draws the cart
function drawCart() {
    const cartList = document.querySelector(".cart");
    let cartItems = cart.map(item => `
        <div data-productId="${item.productId}">
            <h3>${item.name}</h3>
            <p>Price: ${currencySymbol}${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
            <p>Total: ${currencySymbol}${(item.price * item.quantity).toFixed(2)}</p>
            <button class="qup">+</button>
            <button class="qdown">-</button>
            <button class="remove">Remove</button>
        </div>
    `).join("");
    cartList.innerHTML = cartItems || "Cart Empty";
}

// Draws the checkout summary
function drawCheckout() {
    const checkout = document.querySelector(".cart-total");
    checkout.innerHTML = `<p>Cart Total: ${currencySymbol}${cartTotal().toFixed(2)}</p>`;
}

// Event Listeners
document.querySelector(".products").addEventListener("click", e => {
    if (e.target.classList.contains("add-to-cart")) {
        const productId = +e.target.closest("div").dataset.productid;
        addProductToCart(productId);
        drawCart();
        drawCheckout();
    }
});

document.querySelector(".cart").addEventListener("click", e => {
    const productId = +e.target.closest("div").dataset.productid;

    if (e.target.classList.contains("remove")) removeProductFromCart(productId);
    if (e.target.classList.contains("qup")) increaseQuantity(productId);
    if (e.target.classList.contains("qdown")) decreaseQuantity(productId);

    drawCart();
    drawCheckout();
});

// Handle payment submission
document.querySelector(".pay").addEventListener("click", e => {
    e.preventDefault();
    const amountReceived = +document.querySelector(".received").value;
    const change = pay(amountReceived);
    const summary = document.querySelector(".pay-summary");
    
    summary.innerHTML = `
        <p>Cash Received: ${currencySymbol}${amountReceived.toFixed(2)}</p>
        ${change >= 0 ? `<p>Change: ${currencySymbol}${change.toFixed(2)}</p><p>Thank you!</p>` 
                        : `<p>Remaining Balance: ${currencySymbol}${(-change).toFixed(2)}</p><p>Please pay additional amount.</p>`}
    `;
    if (change >= 0) emptyCart();
    drawCart();
    drawCheckout();
});

// Initial draws
drawProducts();
drawCart();
drawCheckout();
