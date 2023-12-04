console.log("Log Real Time Products");

const socket = io();

const addBtn = document.getElementById("addBtn");
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const res = Object.fromEntries(formData);
  const payload = JSON.stringify(res);
  console.log(payload);

  fetch("/api/products", {
    method: "POST",
    body: payload,
    headers: {
      "Content-Type": "application/json",
    },
  });

  socket.emit("post", "Posted");
});

socket.on("products", (data) => {
  const content = document.getElementById("box");
  content.innerHTML = "";

  data.forEach((p) => {
    const item = document.createElement("div");
    item.classList.add("card");
    item.innerHTML = `
      <h3>Product: ${p.title}</h3>
      <p>Description: ${p.description}</p>
      <img class="product__image" src="${p.thumbnails}" alt="${p.title}"/>
      <p>Price: $${p.price}</p>
      <p>Stock: ${p.stock}</p>
      <p>ID: ${p._id}</p>
      <button class="deleteProduct" data-id="${p._id}">Eliminar producto</button>
    `;
    content.appendChild(item);

    const deleteBtn = item.querySelector(".deleteProduct");
    deleteBtn.addEventListener("click", () => {
      const confirm = prompt('Para eliminar el producto escriba "Y"');
      const productID = deleteBtn.dataset.id;
      socket.emit("delete", { confirm, productID });
    });
  });
});