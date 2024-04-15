const socket = io();

const addBtn = document.getElementById("addBtn");
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const code = document.getElementById('code').value;
  const price = document.getElementById('price').value;
  const stock = document.getElementById('stock').value;
  const category = document.getElementById('category').value;
  const thumbnails = document.getElementById('thumbnails').value;

  const product = { title, description, code, price, stock, category, thumbnails };

  fetch(`/api/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  }).then((res) => {
      if (!res.ok) {
        throw new Error('Error sending data to server.');
      }
      return res.json();
    })
    .then((data) => {
      console.log('Product created successfully: ', data);
      socket.emit('addProduct', product);
    })
    .catch((err) => console.log('Error:', err));
});

socket.on("products", (data) => {
  const content = document.getElementById("box");
  content.innerHTML = "";

  data.forEach((p) => {
    const item = document.createElement("div");
    item.classList.add("card");
    item.innerHTML = `
      <img class="product__image" src="${p.thumbnails}" alt="${p.title}"/>
      <div>
        <h3>${p.title}</h3>
        <p>Description: ${p.description}</p>
        <p>Code: ${p.code}</p>
        <p>Price: $${p.price}</p>
        <p>Stock: ${p.stock}</p>
        <button class="deleteProduct" data-id="${p._id}">Eliminar producto</button>
      </div>
      <p class="pid">ID: ${p._id}</p>
      <p class="pid">Owner: ${p.owner}</p>
    `;
    content.appendChild(item);

    const deleteBtn = item.querySelector(".deleteProduct");
    deleteBtn.addEventListener("click", () => {
      const productID = deleteBtn.dataset.id;
      const confirmation = prompt('To confirm product delete write "Y"');
      if (confirmation === 'Y') {
        fetch(`/api/products/${productID}`, {
          method: 'DELETE',
        })
        .then((res) => res.json())
        .then((data) => {
          console.log('Product deleted successfully: ', data.result);
          socket.emit("delete", { confirmation, productID });
        })
        .catch((err) => console.error(err));
      } else {
        alert('Product not deleted');
      }
    });
  });
});