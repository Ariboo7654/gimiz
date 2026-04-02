// Load invoice cart and shipping info from localStorage (requirement 2e.i.1)
let cart = JSON.parse(localStorage.getItem("invoiceCart")) || [];
let shippingInfo = JSON.parse(localStorage.getItem("shippingInfo")) || {};

// Generate unique invoice number using random digits (5a)
function generateInvoiceNumber() {
    return 'INV-' + Date.now().toString().slice(-6) + '-' + Math.floor(Math.random() * 1000);
}

// Format date as DD Month YYYY to show current date (eg, 13 April 2025) (5a)
function formatDate(date) {
    return date.toLocaleDateString("en-GB", { 
        day: "2-digit", 
        month: "long", 
        year: "numeric" 
    });
}

// Load and render invoice details (2e, 5a-c)
function loadInvoice() {

    // Check if cart is empty and redirect to products.html if so
    if (cart.length === 0) {
        alert("No items in invoice.");
        window.location.href = "products.html";
        return;
    }

    // Calculate financials
    let subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    let discountTotal = cart.reduce((acc, item) => acc + (item.discount || item.price * 0.05) * item.qty, 0);
    let tax = (subtotal - discountTotal) * 0.15;
    let total = subtotal - discountTotal + tax;

    // Generate invoice 
    let currentDate = new Date();
    let formattedDate = formatDate(currentDate);
    let invoiceNumber = generateInvoiceNumber();

    // Display invoice number and date (5a)
    document.getElementById("invoiceNumber").textContent = invoiceNumber;
    document.getElementById("invoiceDate").textContent = formattedDate;

    // shipping information
    let shippingHTML = "";
    if (Object.keys(shippingInfo).length > 0) {
        shippingHTML = `
            <p><strong>Name:</strong> ${shippingInfo.customerName || 'N/A'}</p>
            <p><strong>Address:</strong> ${shippingInfo.address || 'N/A'}</p>
        `;
    } else {
        shippingHTML = "<p>No shipping information available.</p>";
    }
    document.getElementById("shippingDetails").innerHTML = shippingHTML;


    // show cart items in table 
    let itemsHTML = "";
    cart.forEach(item => {
        const itemDiscount = (item.discount || item.price * 0.05) * item.qty;
        const itemTotal = (item.price * item.qty) - itemDiscount; // Total excludes tax
        itemsHTML += `<tr>
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>${item.qty}</td>
            <td>$${itemDiscount.toFixed(2)}</td>
            <td>$${itemTotal.toFixed(2)}</td>
        </tr>`;
    });

    // Show financial summary 
    let summaryHTML = `
        <p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>
        <p><strong>Discount (5%):</strong> -$${discountTotal.toFixed(2)}</p>
        <p><strong>Tax (15%):</strong> $${tax.toFixed(2)}</p>
        <p><strong>Total:</strong> $${total.toFixed(2)}</p>
    `;

    // Update DOM with items and summary which changes what is being shown on the webpage
    document.getElementById("invoiceItems").innerHTML = itemsHTML;
    document.getElementById("invoiceSummary").innerHTML = summaryHTML;

    // Create invoice object for storage (5b)
    let invoice = {
        invoiceNumber: invoiceNumber,
        date: formattedDate,
        rawDate: currentDate.toISOString(), // Stores ISO date for sorting
        items: cart.map(item => ({
            name: item.name,
            price: item.price,
            qty: item.qty,
            discount: item.discount || item.price * 0.05
        })),
        shipping: { ...shippingInfo },
        subtotal: subtotal,
        discount: discountTotal,
        tax: tax,
        total: total,
        trn: "123-456-789",
        company: "TechGizmo Inc."
    };

    // Save invoice to localStorage
    saveInvoice(invoice);

    // Show email confirmation message (5c)
    document.getElementById("emailMessage").style.display = "block";
}

// Save invoice to localstorage storage, AllInvoices  (5b)
function saveInvoice(invoice) {
    let allInvoices = JSON.parse(localStorage.getItem("AllInvoices")) || [];
    const userId = localStorage.getItem("currentUser") || "guest";
    let userInvoices = JSON.parse(localStorage.getItem(`invoices_${userId}`)) || [];

    // Avoid duplicate invoices
    if (!allInvoices.some(inv => inv.invoiceNumber === invoice.invoiceNumber)) {
        allInvoices.push(invoice);
        userInvoices.push(invoice);
        localStorage.setItem("AllInvoices", JSON.stringify(allInvoices));
        localStorage.setItem(`invoices_${userId}`, JSON.stringify(userInvoices));
    }
}

// Clear invoice data and redirect to products.html
function completeInvoice() {
    localStorage.removeItem("invoiceCart"); // Clear invoice cart
    localStorage.removeItem("shippingInfo"); // Clear shipping info
    window.location.href = "products.html"; // Return to products
}

// Set invoice on page load
window.onload = loadInvoice;