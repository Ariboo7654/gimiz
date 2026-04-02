<!DOCTYPE html>
<head>
  <title>TechGizmo - Checkout</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="design.css">
</head>
<body>
  <header>
    <img src="../Resources/logo.png" alt="TechGizmo Logo">
    <h1>TechGizmo</h1>
    <p>Empowering Your Tech Future</p>
  </header>
  <div class="container">
    <h2>Order Summary</h2>
    <table id="summaryTable" class="cart-table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Qty</th>
          <th>Price (JMD)</th>
          <th>Subtotal</th>
          <th>Discount (5%)</th>
          <th>Tax (15%)</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
    <div class="totals" id="grandTotal"></div>
    <form id="checkoutForm">
      <label>Full Name</label>
      <input type="text" id="customerName" required>
      <label>Shipping Address</label>
      <textarea id="address" rows="3" required></textarea>
      <label>Amount Being Paid (JMD)</label>
      <input type="number" id="paymentAmount" min="1" step="0.01" required>
      <div style="text-align:center;">
        <button type="submit" class="btn btn-confirm">Confirm Checkout</button>
        <button type="button" class="btn btn-cancel" onclick="window.location.href='Cart.html'">Cancel</button>
      </div>
    </form>
  </div>
  <script>
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const tableBody = document.querySelector("#summaryTable tbody");
    const grandTotalDiv = document.getElementById("grandTotal");
    const checkoutForm = document.getElementById("checkoutForm");

    if (cart.length === 0) {
      alert("Your cart is empty!");
      window.location.href = "Cart.html";
    }

    function renderSummary() {
      let subtotal = 0;
      let discountTotal = 0;
      let taxTotal = 0;
      let grandTotal = 0;
      tableBody.innerHTML = "";

      cart.forEach(item => {
        const itemSubtotal = item.price * item.qty;
        const itemDiscount = (item.discount || item.price * 0.05) * item.qty;
        const itemTax = (itemSubtotal - itemDiscount) * 0.15;
        const itemTotal = itemSubtotal - itemDiscount + itemTax;
        subtotal += itemSubtotal;
        discountTotal += itemDiscount;
        taxTotal += itemTax;
        grandTotal += itemTotal;

        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${item.name}</td>
          <td>${item.qty}</td>
          <td>${item.price.toFixed(2)}</td>
          <td>${itemSubtotal.toFixed(2)}</td>
          <td>${itemDiscount.toFixed(2)}</td>
          <td>${itemTax.toFixed(2)}</td>
          <td>${itemTotal.toFixed(2)}</td>
        `;
        tableBody.appendChild(row);
      });

      grandTotalDiv.innerHTML = `
        <p><strong>Subtotal:</strong> JMD ${subtotal.toFixed(2)}</p>
        <p><strong>Discount (5%):</strong> -JMD ${discountTotal.toFixed(2)}</p>
        <p><strong>Tax (15%):</strong> JMD ${taxTotal.toFixed(2)}</p>
        <p><strong>Grand Total:</strong> JMD ${grandTotal.toFixed(2)}</p>
      `;
      return grandTotal;
    }

    const finalTotal = renderSummary();

    checkoutForm.addEventListener("submit", function(e) {
      e.preventDefault();

      const customerName = document.getElementById("customerName").value.trim();
      const address = document.getElementById("address").value.trim();
      const paymentAmount = parseFloat(document.getElementById("paymentAmount").value);

      if (paymentAmount < finalTotal) {
        alert("Amount paid must cover the total cost.");
        return;
      }

      const shippingInfo = { customerName, address };
      localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo));

      const invoice = {
        invoiceNumber: "INV" + Date.now(),
        date: new Date().toLocaleString(),
        rawDate: new Date().toISOString(),
        items: cart.map(item => ({
          name: item.name,
          price: item.price,
          qty: item.qty,
          discount: item.discount || item.price * 0.05
        })),
        shipping: shippingInfo,
        subtotal: cart.reduce((acc, item) => acc + item.price * item.qty, 0),
        discount: cart.reduce((acc, item) => acc + (item.discount || item.price * 0.05) * item.qty, 0),
        tax: cart.reduce((acc, item) => acc + ((item.price - (item.discount || item.price * 0.05)) * item.qty * 0.15), 0),
        total: finalTotal,
        amountPaid: paymentAmount,
        balance: paymentAmount - finalTotal,
        trn: "123456789",
        company: "TechGizmo Inc."
      };

      const allInvoices = JSON.parse(localStorage.getItem("AllInvoices")) || [];
      allInvoices.push(invoice);
      localStorage.setItem("AllInvoices", JSON.stringify(allInvoices));

      const userId = localStorage.getItem("currentUser") || "guest";
      const userInvoices = JSON.parse(localStorage.getItem(`invoices_${userId}`)) || [];
      userInvoices.push(invoice);
      localStorage.setItem(`invoices_${userId}`, JSON.stringify(userInvoices));

      localStorage.removeItem("cart");
      alert("✅ Checkout successful! Invoice generated.");
      window.location.href = "invoice.html";
    });
  </script>
</body>
</html>