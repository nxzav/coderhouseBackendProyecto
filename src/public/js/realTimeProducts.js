console.log("Log Real Time Products");

const socket = io();

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
      socket.emit('delete', {confirm, productID});
    });
  });
});