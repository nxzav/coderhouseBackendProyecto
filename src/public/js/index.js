const prevPage = document.getElementById("prevPage");
const nextPage = document.getElementById("nextPage");
const searchBtn = document.getElementById("searchBtn");
const addToCart = document.querySelectorAll(".addToCart");
const filterBtn = document.getElementById("filterBtn");
const cartId = document.getElementById("cartId");
const cid = cartId.dataset.cart;

addToCart.forEach((e) =>
  e.addEventListener('click', () => {
    const pid = e.dataset.id;

    fetch(`/api/carts/${cid}/product/${pid}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if(res.ok) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Product added to cart',
            showConfirmButton: false,
            timer: 1000,
          })
        } else if (res.status == '403') {
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Admins can not add products to cart',
            showConfirmButton: false,
            timer: 1000,
          })
        } else if (res.status == '404') {
          window.location.href = '/login';
        }
      })
      .then((data) => {})
      .catch((err) => {
        console.log('Error adding product to cart: ', err);
      });
  })
);

searchBtn.addEventListener("click", () => {
  const query = document.getElementById("query").value;

  const url = `/?query=${query}`;
  document.location.href = url;
});

const filterProducts = (PrevOrNext) => {
  console.log({PrevOrNext})
  const page = PrevOrNext ? PrevOrNext.dataset.page : 1;
  const limit = document.getElementById("limit").value;
  const order = document.getElementById("order").value;
  const status = document.getElementById("status").value;

  const url = `/?page=${page}&limit=${limit}&order=${order}&status=${status}`;
  document.location.href = url;
};

filterBtn.addEventListener("click", () => filterProducts());

if (prevPage) {
  prevPage.addEventListener("click", () => filterProducts(prevPage));
}

if (nextPage) {
  nextPage.addEventListener("click", () => filterProducts(nextPage));
}