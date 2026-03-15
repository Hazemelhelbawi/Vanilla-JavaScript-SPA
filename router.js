const routes = [
  { path: "/", view: "/pages/home.html" },
  { path: "/about", view: "/pages/about.html" },
  { path: "/contact", view: "/pages/contact.html" },
  { path: "/products", view: "/pages/products.html" }, // صفحة قائمة المنتجات
  { path: "/products/:id", view: "/pages/product.html" }, // صفحة تفاصيل منتج
  { path: "*", view: "/pages/404.html" }, // fallback
];

function handleLocation() {
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
