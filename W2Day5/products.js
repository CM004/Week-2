// minimal selectors
const main = document.querySelector("main");
const search = document.querySelector("#search");
const sort = document.querySelector("#sort");

let products = [];

// simple helper
const clear = () => main.innerHTML = "";

// show message
const showMsg = (txt) => main.innerHTML = `<p>${txt}</p>`;

// add a product card
function addCard(p) {
  main.innerHTML += `
    <div class="card">
      <img src="${p.images[0]}" alt="">
      <h3>${p.title}</h3>
      <p class="price">$${p.price}</p>
    </div>
  `;
}

// debounce
function debounce(fn, delay = 300) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}

// search
const doSearch = debounce((text) => {
  const q = text.toLowerCase();
  const filtered = products.filter(p => p.title.toLowerCase().includes(q));
  clear();
  filtered.length ? filtered.forEach(addCard) : showMsg("No results.");
});

// sort high → low
function sortHigh() {
  const sorted = [...products].sort((a, b) => b.price - a.price);
  clear();
  sorted.forEach(addCard);
}

// fetch data
async function load() {
  try {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    products = data.products;
    products.forEach(addCard);
  } catch (err) {
    showMsg("Failed to load products.");
  }
}

// listeners
search.addEventListener("input", e => doSearch(e.target.value));
sort.addEventListener("change", () => sortHigh());

// init
load();
