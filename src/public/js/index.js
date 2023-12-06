const prevPage = document.getElementById("prevPage");
const nextPage = document.getElementById("nextPage");
const searchBtn = document.getElementById("searchBtn");
const addToCart = document.querySelectorAll(".addToCart");

const cid = "656ed81aa7d768d9e0270579";

addToCart.forEach((e) => e.addEventListener("click", () => {
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
  })
);

searchBtn.addEventListener("click", () => {
  const limit = document.getElementById("limit").value;
  const page = document.getElementById("page").value;
  const query = document.getElementById("query").value;
  const sort = document.getElementById("sort").value;

  const url = `/?page=${page}&limit=${limit}&query=${query}&sort=${sort}`;
  document.location.href = url;
});

if (prevPage) {
  prevPage.addEventListener("click", () => {
    const page = prevPage.dataset.page;
    const limit = document.getElementById("limit").value;

    const url = `/?page=${page}&limit=${limit}`;
    document.location.href = url;
  });
}

if (nextPage) {
  nextPage.addEventListener("click", () => {
    const page = nextPage.dataset.page;
    const limit = document.getElementById("limit").value;

    const url = `/?page=${page}&limit=${limit}`;
    document.location.href = url;
  });
}
