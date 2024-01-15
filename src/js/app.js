const formRefs = document.querySelector(".calc__form");
const selectRef = document.getElementById("package");
const dropdownRef = document.querySelector(".calc__select");
const itemsRefs = [...document.querySelectorAll(".select__dropdown li")];
const summaryTotalRef = document.querySelector(".summary__total");

formRefs.addEventListener("input", (event) => {
  const target = event.target;
  const products = document.querySelector('[data-id="products"]');
  const orders = document.querySelector('[data-id="orders"]');
  const accounting = document.querySelector('[data-id="accounting"]');
  const terminal = document.querySelector('[data-id="terminal"]');
  const total = summaryTotalRef;

  if (target.id === "products") {
    products.classList.add("open");
    const value = parseFloat(target.value) || 0;
    const price = value * 0.5;
    products.querySelector(".item__calc").textContent = `${value} * $0.5`;
    products.querySelector(".item__price").textContent = `$${price}`;
    total.classList.add("open");
    total.querySelector(".total__price").textContent = `$${price}`;
  } else if (target.id === "orders") {
    orders.classList.add("open");
    const value = parseFloat(target.value) || 0;
    const price = value * 0.5;
    orders.querySelector(".item__calc").textContent = `${value} * $0.5`;
    orders.querySelector(".item__price").textContent = `$${price}`;
  } else if (target.id === "accounting") {
    accounting.classList.toggle("open");
  } else if (target.id === "terminal") {
    terminal.classList.toggle("open");
  }

  updateTotalPrice(); // Dodane odświeżanie total price
});

selectRef.addEventListener(
  "click",
  () => {
    dropdownRef.classList.toggle("open");
    updateTotalPrice(); // Dodane odświeżanie total price
  },
  false
);

itemsRefs.forEach((item) => {
  item.addEventListener(
    "click",
    (event) => {
      const target = event.target;
      document.querySelector("[data-id='package']").classList.toggle("open");
      updateTotalPrice(); // Dodane odświeżanie total price
    },
    true
  );
});

// Dodana funkcja do obliczenia total price
function updateTotalPrice() {
  const productsPrice =
    parseFloat(
      products.querySelector(".item__price").textContent.replace("$")
    ) || 0;
  const ordersPrice =
    parseFloat(orders.querySelector(".item__price").textContent.replace("$")) ||
    0;
  const packagePrice =
    parseFloat(
      selectRef.querySelector(".item__price").textContent.replace("$")
    ) || 0;
  const accountingPrice = accounting.classList.contains("open") ? 10 : 0;
  const terminalPrice = terminal.classList.contains("open") ? 10 : 0;

  const totalPrice =
    productsPrice +
    ordersPrice +
    packagePrice +
    accountingPrice +
    terminalPrice;

  summaryTotalRef.querySelector(".total__price").textContent = `$${totalPrice}`;
}
