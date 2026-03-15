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
