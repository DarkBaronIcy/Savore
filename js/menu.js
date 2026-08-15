const menuData = [
 {cat:"nigerian", section:"Nigerian Classics", items:[
  ["Jollof Royale","Smoky party jollof with signature grilled chicken.","₦6,500"],
  ["Ofada Experience","Ofada rice, ayamase sauce and your choice of protein.","₦5,500"],
  ["Fried Rice & Chicken","Fragrant fried rice with house-seasoned chicken.","₦5,800"],
  ["Coconut Rice Bowl","Coconut-infused rice, vegetables and grilled protein.","₦6,200"]]},
 {cat:"grills", section:"Grills & Suya", items:[
  ["Savoré Suya","Charcoal-grilled beef, house spice blend, onions and peppers.","₦4,800"],
  ["Chicken Suya","Spiced chicken skewers finished over charcoal.","₦4,500"],
  ["Grilled Croaker","Whole grilled croaker with pepper relish and chips.","₦8,500"],
  ["Savoré Mixed Grill","Beef, chicken and suya with house sides.","₦10,500"]]},
 {cat:"soups", section:"Soups & Swallows", items:[
  ["Egusi Soup","Melon seed soup with assorted meat and pounded yam.","₦4,200"],
  ["Afang Soup","Leafy vegetable soup with seafood and assorted protein.","₦4,800"],
  ["Efo Riro","Rich spinach stew with assorted protein.","₦4,500"],
  ["Pepper Soup","Aromatic Nigerian broth with your choice of protein.","₦3,800"]]},
 {cat:"seafood", section:"Seafood", items:[
  ["Seafood Pepper Soup","Fresh seafood in a fragrant Nigerian pepper broth.","₦7,200"],
  ["Prawn Coconut Curry","Prawns in a rich coconut and pepper sauce.","₦8,200"],
  ["Grilled Prawns","Charcoal-grilled prawns with citrus herb butter.","₦8,500"],
  ["Seafood Rice","Jollof-style rice with prawns, calamari and fish.","₦9,000"]]},
 {cat:"international", section:"International", items:[
  ["Creamy Chicken Pasta","Penne, grilled chicken, herbs and parmesan cream.","₦7,500"],
  ["Savoré Smash Burger","Beef patty, cheddar, caramelized onions and house sauce.","₦7,000"],
  ["Truffle Mushroom Pasta","Mushrooms, parmesan and a delicate truffle finish.","₦8,000"],
  ["Mediterranean Chicken Bowl","Herbed chicken, grains, greens and tahini dressing.","₦7,800"]]},
 {cat:"desserts", section:"Desserts", items:[
  ["Chin Chin Sundae","Crunchy chin chin, vanilla ice cream and caramel.","₦3,500"],
  ["Puff-Puff & Ice Cream","Warm puff-puff with vanilla ice cream.","₦3,200"],
  ["Chocolate Fondant","Warm chocolate cake with vanilla cream.","₦4,000"],
  ["Tropical Fruit Plate","Seasonal fruit, lime and mint.","₦2,800"]]},
 {cat:"drinks", section:"Drinks", items:[
  ["Zobo Spritz","House zobo, citrus and sparkling water.","₦2,500"],
  ["Pineapple Ginger Cooler","Fresh pineapple, ginger and lime.","₦2,800"],
  ["Chapman","Classic Nigerian cocktail-style soft drink.","₦2,500"],
  ["Mango & Passionfruit Cooler","Tropical fruit blend served chilled.","₦3,000"]]}
];

const validCategories = new Set(["all", ...menuData.map(g => g.cat)]);
const escapeHTML = value => String(value).replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]));

function renderMiniMenu(filter = "nigerian") {
  const root = document.getElementById("miniMenu");
  if (!root) return;
  const group = menuData.find(x => x.cat === filter) || menuData[0];
  root.innerHTML = group.items.map(i => `<article class="mini-item"><span class="price">${escapeHTML(i[2])}</span><h3>${escapeHTML(i[0])}</h3><p>${escapeHTML(i[1])}</p></article>`).join("");
}

function renderFullMenu(filter = "all") {
  const root = document.getElementById("fullMenu");
  if (!root) return;
  const groups = filter === "all" ? menuData : menuData.filter(x => x.cat === filter);
  root.innerHTML = groups.map(g => `<section class="menu-section"><h2>${escapeHTML(g.section)}</h2><div class="menu-list">${g.items.map(i => `<article class="menu-row"><div class="menu-row-title"><h3>${escapeHTML(i[0])}</h3><strong>${escapeHTML(i[2])}</strong></div><p>${escapeHTML(i[1])}</p></article>`).join("")}</div></section>`).join("");
}

function setCategoryInURL(category) {
  const url = new URL(window.location.href);
  if (category === "nigerian" && !document.getElementById("fullMenuFilters")) return;
  if (category === "nigerian") url.searchParams.delete("category");
  else url.searchParams.set("category", category);
  history.replaceState(null, "", url.pathname + (url.search ? `?${url.searchParams.toString()}` : ""));
}

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const requested = params.get("category");
  const initial = validCategories.has(requested) ? requested : "nigerian";

  const miniRoot = document.getElementById("miniMenu");
  if (miniRoot) {
    renderMiniMenu(initial === "all" ? "nigerian" : initial);
    document.querySelectorAll(".menu-preview .pill").forEach(btn => btn.addEventListener("click", () => {
      document.querySelectorAll(".menu-preview .pill").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderMiniMenu(btn.dataset.filter);
    }));
  }

  const full = document.getElementById("fullMenuFilters");
  if (full) {
    full.innerHTML = `<button class="pill" type="button" data-filter="all">All</button>` + menuData.map(g => `<button class="pill" type="button" data-filter="${g.cat}">${escapeHTML(g.section)}</button>`).join("");
    const activeFilter = requested === "all" ? "all" : (validCategories.has(requested) ? requested : "all");
    full.querySelectorAll(".pill").forEach(btn => {
      const active = btn.dataset.filter === activeFilter;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", String(active));
      btn.addEventListener("click", () => {
        full.querySelectorAll(".pill").forEach(b => { b.classList.remove("active"); b.setAttribute("aria-pressed", "false"); });
        btn.classList.add("active");
        btn.setAttribute("aria-pressed", "true");
        renderFullMenu(btn.dataset.filter);
        setCategoryInURL(btn.dataset.filter);
      });
    });
    renderFullMenu(activeFilter);
  }
});
