// Product list is kept on localStorage and is set to AllProducts (2b)
if (!localStorage.getItem("AllProducts")) {

    // Array of product objects with id, name, price, image, description (requirement 2a)
    const PRODUCTS = [
        { id: 1, name: "iPhone 15", price: 799.99, image: "../Resources/iphone_15.png", description: "Latest iPhone with advanced camera and A16 Bionic chip." },
        { id: 2, name: "Lenovo Laptop", price: 1099.99, image: "../Resources/lenovo.png", description: "Powerful laptop for work and entertainment." },
        { id: 3, name: "AirPods Pro", price: 249.99, image: "../Resources/airpods_pro.png", description: "Wireless earbuds with noise cancellation." },
        { id: 4, name: "Apple Watch", price: 399.99, image: "../Resources/apple_watch.png", description: "Smartwatch with fitness tracking and notifications." },
        { id: 5, name: "iPad Pro", price: 1099.99, image: "../Resources/ipad.png", description: "High-performance tablet for creatives." },
        { id: 6, name: "Canon Camera", price: 1499.99, image: "../Resources/camera.png", description: "Professional camera with 8K video recording." },
        { id: 7, name: "PlayStation 5", price: 499.99, image: "../Resources/ps5.png", description: "Next-gen gaming console with 4K gaming." },
        { id: 8, name: "Dell Monitor", price: 249.99, image: "../Resources/monitor.png", description: "27-inch monitor with crisp visuals." },
        { id: 9, name: "Bose Speaker", price: 149.99, image: "../Resources/speaker.png", description: "Portable Bluetooth speaker with deep sound." }
    ];

    // Store products in localStorage as AllProducts for constant access
    localStorage.setItem("AllProducts", JSON.stringify(PRODUCTS));
}

// Set empty cart in localStorage (2e)
if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify([]));
}

// Load cart from localStorage, default is set to empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Dynamically list products on the page  (2c)
function loadProducts() {

    // Get the products from localStorage
    const products = JSON.parse(localStorage.getItem("AllProducts"));
    const productList = document.getElementById("productList");
    productList.innerHTML = ""; // Clear existing content

    
    // Iterate through products to create HTML for each
    products.forEach(product => {
        let productHTML = `
            <div class="product">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Price: $${product.price.toFixed(2)}</p>


                <!-- Add to Cart button which shows addToCart with product... showing my cart (2d, 2e) -->
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productList.innerHTML += productHTML; // Append product card
    });
}

// Handle adding products to the cart (2e)
function addToCart(productId) {

    // Load products from localStorage to find the selected product
    const products = JSON.parse(localStorage.getItem("AllProducts"));
    const product = products.find(p => p.id === productId);
    
    // Validate product exists
    if (!product) {
        alert("Product not found!");
        return;
    }
    
    // Check if product is already in cart
    const existingProduct = cart.find(item => item.id === productId);

    // Calculate 5% discount per item 
    const discount = product.price * 0.05;
    
    // Update quantity if product exists, else add new item with quantity 1
    if (existingProduct) {
        existingProduct.qty += 1;
    } else {
        cart.push({ ...product, qty: 1, discount }); // Include discount in cart item
    }
    
    // Save updated cart to localStorage for persistence
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`); // User feedback
    updateCartCount(); // Refresh cart counter
}

// Update the cart counter in the header  
function updateCartCount() {
    // Sum quantities of all cart items
    const totalItems = cart.reduce((total, item) => total + item.qty, 0);
    const cartCounter = document.getElementById("cartCounter");
    
    // Update counter if element exists
    if (cartCounter) {
        cartCounter.textContent = totalItems;
    }
}

// Navigate to Cart.html, with empty cart check
function goToCart() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }
    window.location.href = "Cart.html"; // Link to full cart view
}

// Navigate to MyCart.html, with empty cart check
function goToMyCart() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }
    window.location.href = "MyCart.html"; // Link to simplified cart view
}

// Clear cart 
function cancelSelection() {
    if (confirm("Are you sure you want to clear your cart?")) {
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        alert("Cart cleared!");
    }
}

// Logout function (for login.html)
function logout() {
    window.location.href = "login.html";
}

// Set page by loading products and updating cart count
loadProducts();
updateCartCount();