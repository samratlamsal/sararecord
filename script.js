const menuBtn = document.querySelector("[data-menu-btn]");
const navLinks = document.querySelector("[data-nav-links]");
const cartPanel = document.querySelector("[data-cart-panel]");
const cartItems = document.querySelector("[data-cart-items]");
const cartCount = document.querySelector("[data-cart-count]");
const cartTotal = document.querySelector("[data-cart-total]");
const cartOpenButtons = document.querySelectorAll("[data-cart-open]");
const cartCloseButtons = document.querySelectorAll("[data-cart-close]");
const addButtons = document.querySelectorAll("[data-add-cart]");
const checkoutForm = document.querySelector("[data-checkout-form]");
const formNote = document.querySelector("[data-form-note]");
const screenshotInput = document.querySelector("[data-payment-screenshot]");

const cart = [];
const whatsappNumber = "9779744528740";

const formatPrice = (price) => `NPR ${price.toLocaleString("en-IN")}`;

function renderCart() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  cartCount.textContent = count;
  cartTotal.textContent = formatPrice(total);

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
    return;
  }

  cartItems.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
          <div>
            <strong>${item.name}</strong>
            <span>Quantity: ${item.quantity}</span>
          </div>
          <strong>${formatPrice(item.price * item.quantity)}</strong>
        </div>
      `
    )
    .join("");
}

function openCart() {
  cartPanel.classList.add("is-open");
  cartPanel.setAttribute("aria-hidden", "false");
}

function closeCart() {
  cartPanel.classList.remove("is-open");
  cartPanel.setAttribute("aria-hidden", "true");
}

menuBtn?.addEventListener("click", () => {
  navLinks.classList.toggle("is-open");
});

navLinks?.addEventListener("click", () => {
  navLinks.classList.remove("is-open");
});

cartOpenButtons.forEach((button) => button.addEventListener("click", openCart));
cartCloseButtons.forEach((button) => button.addEventListener("click", closeCart));

cartPanel?.addEventListener("click", (event) => {
  if (event.target === cartPanel) closeCart();
});

addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const product = button.closest("[data-product]");
    const name = product.dataset.name;
    const price = Number(product.dataset.price);
    const existing = cart.find((item) => item.name === name);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    renderCart();
    openCart();
  });
});

checkoutForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (cart.length === 0) {
    formNote.textContent = "Please add at least one product to cart before sending an order.";
    openCart();
    return;
  }

  const formData = new FormData(checkoutForm);
  const name = formData.get("name");
  const phone = formData.get("phone");
  const address = formData.get("address");
  const payment = formData.get("payment");
  const screenshotFile = screenshotInput?.files?.[0];
  const needsScreenshot = payment !== "Cash on delivery";

  if (needsScreenshot && !screenshotFile) {
    formNote.textContent = "Please upload a payment screenshot for online payment before sending the order.";
    screenshotInput?.focus();
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const orderItems = cart
    .map((item) => `- ${item.name} x ${item.quantity} = ${formatPrice(item.price * item.quantity)}`)
    .join("\n");
  const screenshotText = screenshotFile
    ? `\nPayment Screenshot: ${screenshotFile.name}\nPlease attach this screenshot in WhatsApp after this message is sent.`
    : "";

  const message = `New ASTRA Nepal Order\n\nCustomer Details:\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\nPayment: ${payment}${screenshotText}\n\nOrder Items:\n${orderItems}\n\nTotal: ${formatPrice(total)}`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl, "_blank");
  formNote.textContent = "Your order details have been prepared for WhatsApp.";
});

renderCart();
