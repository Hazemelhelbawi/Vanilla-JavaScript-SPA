// قائمة المسارات اول خطوة
const routes = [
  { path: "/", view: "/pages/home.html" },
  { path: "/about", view: "/pages/about.html" },
  { path: "/contact", view: "/pages/contact.html" },
  { path: "/products", view: "/pages/products.html" }, // صفحة قائمة المنتجات
  { path: "/products/:id", view: "/pages/product.html" }, // صفحة تفاصيل منتج
  { path: "*", view: "/pages/404.html" }, // fallback
];

// func handleLocation تاني خطوة
function handleLocation() {
  //2-1 الحصول على المسار من شريط العنوان في البروزر
  const path = window.location.pathname;

  // البحث عن route المناسب
  let route = routes.find((r) => {
    if (r.path === "*") return false; // نتجاهل ال404 الآن

    if (r.path.includes(":")) {
      const routeParts = r.path.split("/").filter(Boolean);
      const pathParts = path.split("/").filter(Boolean);

      if (routeParts.length !== pathParts.length) return false;

      return routeParts.every(
        (part, i) => part.startsWith(":") || part === pathParts[i],
      );
    }

    return r.path === path;
  });

  if (!route) {
    route = routes.find((r) => r.path === "*");
  }

  fetch(route.view)
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("app").innerHTML = html;

      // لو route ديناميك
      if (route.path.includes(":")) {
        const routeParts = route.path.split("/").filter(Boolean);
        const pathParts = path.split("/").filter(Boolean);
        const params = {};
        routeParts.forEach((part, i) => {
          if (part.startsWith(":")) {
            params[part.slice(1)] = pathParts[i];
          }
        });

        // هنا ننادي displayProduct
        if (typeof displayProduct === "function") {
          displayProduct(params.id);
        }
      }
    });
}

const route = (link) => {
  history.pushState({}, "", link.href);

  handleLocation();
};

document.addEventListener("click", (event) => {
  const link = event.target.closest("a");

  if (!link) return;

  event.preventDefault();

  route(link);
});

window.onpopstate = handleLocation;
handleLocation();

// Shared product data
const products = {
  1: {
    name: "prouct 1",
    img: "/assets/images/img1.png",
    price: 100,
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus est odit expedita saepe! Recusandae consectetur sunt veniam perferendis quibusdam eos! description product 1",
  },
  2: {
    name: "prouct 2",
    img: "/assets/images/img2.png",
    price: 200,
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus est odit expedita saepe! Recusandae consectetur sunt veniam perferendis quibusdam eos! description product 2",
  },
  3: {
    name: "prouct 3",
    img: "/assets/images/img3.png",
    price: 300,
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus est odit expedita saepe! Recusandae consectetur sunt veniam perferendis quibusdam eos! description product 3",
  },
};

function displayProduct(id) {
  const container = document.getElementById("product-details");

  if (!container) return;

  const product = products[id];

  if (!product) {
    container.innerHTML = "<p>product not found</p>";
    return;
  }

  container.innerHTML = `
    <h2>${product.name}</h2>
    <img src="${product.img}" alt="${product.name}" />
    <p>Price: $${product.price}</p>
    <p>${product.desc}</p>
  `;
}
