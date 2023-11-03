console.log('Log Real Time Products');

const socket = io();

const form = document.getElementById('form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const data = new FormData(e.target);
  const formData = Object.fromEntries(data.entries());
  socket.emit('addProduct', formData);
}

socket.on('products', data => {
  const content = document.getElementById('box');
  content.innerHTML = '';

  data.forEach(product => {
    const item = document.createElement('div');
    item.classList.add('card');
    item.innerHTML = `
      <h3>Product: ${product.title}</h3>
      <p>Description: ${product.description}</p>
      <img class="product__image" src="${product.thumbnails}" alt="${product.title}"/>
      <p>Price: $${product.price}</p>
      <p>Stock: ${product.stock}</p>
      <button class="deleteProduct" data-id="${product.id}">Eliminar producto</button>
      `;

    content.appendChild(item);

    const deleteButton = item.querySelector('.deleteProduct');
    deleteButton.addEventListener('click', () => {
      const productID = deleteButton.dataset.id;
      const confirm = prompt(`Se eliminará el producto ${productID}, ¿desea continuar?\n Escriba "Y" para confirmar`);
      socket.emit('products', { productID, confirm });
    });
  });
});