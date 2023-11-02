console.log('Log RTP');

const socket = io();

socket.on('products', data => {
  const content = document.getElementById('box');
  content.innerHTML = '';

  data.forEach(product => {
    const item = document.createElement('div');
    item.innerHTML = `
    <h3>Product: ${product.title}</h3>
    <p>Description: ${product.description}</p>
    <img class="product__image" src="${product.thumbnails}" alt="${product.title}"/>
    <p>Price: $${product.price}</p>
    <p>Stock: ${product.stock}</p>
    <button class="deleteProduct" data-id="${product.id}">Eliminar producto</button>
    <hr/>
    `;
    content.appendChild(item);

    const deleteButton = item.querySelector('.deleteProduct');
    deleteButton.addEventListener('click', () => {
      const productID = deleteButton.dataset.id;
      socket.emit('products', productID);
    });
  });
});