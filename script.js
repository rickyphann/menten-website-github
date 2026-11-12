// =====================================================
// MENTEN WEBSITE JAVASCRIPT
// This file handles the product cards, size choices,
// inquiry bag, and email inquiry form.
// No payment or checkout is included.
// =====================================================

const products = [
  { id: 1, name: "MENTEN Don't Stop", category: "slides", image: "images/product-10.jpg", description: "Bold black slides with signature MENTEN graphics.", tag: "POPULAR" },
  { id: 2, name: "MENTEN Color Duo", category: "slides", image: "images/product-2.jpg", description: "A bright two-color look that stands out.", tag: "COLOR DROP" },
  { id: 3, name: "MENTEN Pink Slides", category: "slides", image: "images/product-7.jpg", description: "Playful pink slides for an everyday outfit.", tag: "FAVORITE" },
  { id: 4, name: "MENTEN Classic Black", category: "slides", image: "images/product-1.jpg", description: "A simple dark colorway with graphic details.", tag: "CLASSIC" },
  { id: 5, name: "MENTEN Clog — Pink", category: "clogs", image: "images/product-0.jpg", description: "Fun clog-style sandals in bright pink.", tag: "CLOGS" },
  { id: 6, name: "MENTEN Clog — Charcoal", category: "clogs", image: "images/product-6.jpg", description: "A darker clog style for everyday wear.", tag: "CLOGS" },
  { id: 7, name: "MENTEN Flip-Flops", category: "flipflops", image: "images/product-9.jpg", description: "Green and yellow flip-flops with a bold look.", tag: "SUMMER" },
  { id: 8, name: "MENTEN Signature Slides", category: "slides", image: "images/product-3.jpg", description: "Explore our signature slide colors.", tag: "SIGNATURE" }
];

// Sizes are inquiry options, not confirmed stock.
// Edit this list if your real size range is different.
const availableSizeChoices = ["EU 36", "EU 37", "EU 38", "EU 39", "EU 40", "EU 41", "EU 42", "EU 43", "EU 44", "EU 45"];
const storageKey = "menten-inquiry-bag-v1";
let bag = loadBag();
let toastTimeout;

function loadBag() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
    return Array.isArray(saved) ? saved.filter(item => products.some(p => p.id === item.id) && availableSizeChoices.includes(item.size)).slice(0, 30) : [];
  } catch (error) {
    return [];
  }
}

function saveBag() {
  try { localStorage.setItem(storageKey, JSON.stringify(bag)); } catch (error) { /* Browsers may disable local storage. */ }
  updateBagCount();
}

function renderProducts(category = "all") {
  const grid = document.getElementById("productGrid");
  grid.replaceChildren();
  const filteredProducts = products.filter(product => category === "all" || product.category === category);

  filteredProducts.forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";
    const sizes = availableSizeChoices.map(size => `<option value="${size}">${size}</option>`).join("");
    card.innerHTML = `
      <div class="product-photo">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <span class="product-tag">${product.tag}</span>
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <label for="size-${product.id}">SELECT YOUR SIZE</label>
        <select id="size-${product.id}" aria-label="Size for ${product.name}">
          <option value="">Choose size</option>${sizes}
        </select>
        <button type="button" class="add-button" data-product-id="${product.id}">Add to inquiry bag ↗</button>
      </div>`;
    grid.appendChild(card);
  });
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 2600);
}

function addToBag(productId) {
  const product = products.find(item => item.id === productId);
  const size = document.getElementById(`size-${productId}`).value;
  if (!product || !size) {
    showToast("Please select a size first.");
    document.getElementById(`size-${productId}`)?.focus();
    return;
  }
  if (bag.length >= 30) {
    showToast("Your inquiry bag is full.");
    return;
  }
  bag.push({ id: product.id, size: size });
  saveBag();
  renderBag();
  showToast(`${product.name} (${size}) added to your bag.`);
}

function updateBagCount() {
  document.getElementById("bagCount").textContent = bag.length;
}

function renderBag() {
  const container = document.getElementById("bagItems");
  container.replaceChildren();
  if (bag.length === 0) {
    const message = document.createElement("p");
    message.className = "empty-bag";
    message.textContent = "Your bag is empty. Choose a pair and select your size to get started.";
    container.appendChild(message);
    return;
  }

  bag.forEach((item, index) => {
    const product = products.find(product => product.id === item.id);
    if (!product) return;
    const row = document.createElement("div");
    row.className = "bag-item";
    row.innerHTML = `<img src="${product.image}" alt=""><div class="bag-item-main"><strong>${product.name}</strong><p>Size: ${item.size} · Quantity: 1</p><button type="button" class="remove-item" data-remove-index="${index}">Remove</button></div>`;
    container.appendChild(row);
  });
}

function openBag() {
  document.getElementById("bagDrawer").classList.add("open");
  document.getElementById("bagDrawer").setAttribute("aria-hidden", "false");
  document.getElementById("drawerBackdrop").hidden = false;
  document.body.style.overflow = "hidden";
  document.getElementById("closeBag").focus();
}

function closeBag() {
  document.getElementById("bagDrawer").classList.remove("open");
  document.getElementById("bagDrawer").setAttribute("aria-hidden", "true");
  document.getElementById("drawerBackdrop").hidden = true;
  document.body.style.overflow = "";
  document.getElementById("bagButton").focus();
}

function sendInquiry(event) {
  event.preventDefault();
  if (bag.length === 0) {
    showToast("Add a product to your inquiry bag first.");
    return;
  }

  const customerName = document.getElementById("customerName").value.trim();
  const customerContact = document.getElementById("customerContact").value.trim();
  const notes = document.getElementById("customerNotes").value.trim();
  if (!customerName || !customerContact) return;

  const lines = bag.map((item, index) => {
    const product = products.find(product => product.id === item.id);
    return `${index + 1}. ${product.name} | ${item.size} | Quantity: 1`;
  });
  const body = [
    "Hello MENTEN,",
    "",
    "I would like to ask about these products:",
    ...lines,
    "",
    `Name: ${customerName}`,
    `My contact: ${customerContact}`,
    `Questions / notes: ${notes || "None"}`,
    "",
    "Please confirm prices, sizes, colors, availability, and ordering details.",
    "Thank you!"
  ].join("\n");

  const subject = encodeURIComponent("MENTEN Product Inquiry");
  const emailBody = encodeURIComponent(body);
  window.location.href = `mailto:sivphengphann@gmail.com?subject=${subject}&body=${emailBody}`;
  showToast("Opening your email app. Please send the prepared message.");
}

// Connect buttons to their actions.
document.getElementById("productGrid").addEventListener("click", event => {
  const button = event.target.closest("[data-product-id]");
  if (button) addToBag(Number(button.dataset.productId));
});

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    renderProducts(button.dataset.filter);
  });
});

document.getElementById("bagItems").addEventListener("click", event => {
  const button = event.target.closest("[data-remove-index]");
  if (!button) return;
  bag.splice(Number(button.dataset.removeIndex), 1);
  saveBag();
  renderBag();
});

document.getElementById("bagButton").addEventListener("click", openBag);
document.getElementById("closeBag").addEventListener("click", closeBag);
document.getElementById("drawerBackdrop").addEventListener("click", closeBag);
document.getElementById("inquiryForm").addEventListener("submit", sendInquiry);
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && document.getElementById("bagDrawer").classList.contains("open")) closeBag();
});

document.getElementById("menuToggle").addEventListener("click", () => {
  const nav = document.getElementById("mainNav");
  const isOpen = nav.classList.toggle("open");
  document.getElementById("menuToggle").setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll("#mainNav a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("mainNav").classList.remove("open");
    document.getElementById("menuToggle").setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();
renderProducts();
renderBag();
updateBagCount();
