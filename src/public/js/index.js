const prevPage = document.getElementById("prevPage");
const nextPage = document.getElementById("nextPage");
const searchBtn = document.getElementById("searchBtn");
const addToCart = document.querySelectorAll(".addToCart");
const filterBtn = document.getElementById("filterBtn");

const cid = "65d846a95a8c5a55a1a4f53c";

addToCart.forEach((e) =>
  e.addEventListener("click", () => {
    const pid = e.dataset.id;

    fetch(`/api/carts/${cid}/product/${pid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((e) => console.log("Error:", e));
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Product added to cart",
      showConfirmButton: false,
      timer: 1000,
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