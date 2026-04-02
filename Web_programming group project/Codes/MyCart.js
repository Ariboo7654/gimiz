// Load cart from localStorage, default to empty array (2e)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Get DOM elements for cart items and totals
const cartItems = document.getElementById("cartItems");
const cartTotals = document.getElementById("cartTotals");

// Display cart items and calculate totals
function displayCart() {

    // Check if cart is empty, redirect to products.html if it is
    if (cart.length === 0) {
        alert("Your cart is empty!");
        window.location.href = "products.html";
        return;
    }
    cartItems.innerHTML = ""; // Clear existing table content
    let totalPrice = 0; // Track grand total


    // Repeat going through cart items to load rows
    cart.forEach(item => {

        // Calculate subtotal (price * quantity)
        const subtotal = item.price * item.qty;

        // Apply 5% discount, use stored discount or calculate if missing
        const discount = (item.discount || item.price * 0.05) * item.qty;

        // Calculate 15% tax on discounted subtotal
        const tax = (subtotal - discount) * 0.15;

        // Total per item (subtotal - discount + tax)
        const total = subtotal - discount + tax;
        totalPrice += total; // Add to grand total

        // Create table row for item
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td> <!-- Price -->
            <td>${item.qty}</td> <!--quantity-->
            <td>$${total.toFixed(2)}</td> <!-- Total-->
        `;
        cartItems.appendChild(row); // Add row to table
    });

    // Display grand total (2e)
    cartTotals.innerHTML = `<span>Total: $${totalPrice.toFixed(2)}</span>`;
}

// Navigate back to products.html without modifying cart
function cancelCart() {
    window.location.href = "products.html";
}

// Set cart display
displayCart();