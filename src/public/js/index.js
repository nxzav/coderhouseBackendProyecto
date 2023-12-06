const prevPage = document.getElementById("prevPage");
const nextPage = document.getElementById("nextPage");
const searchBtn = document.getElementById("searchBtn");
const addToCart = document.querySelectorAll(".addToCart");

addToCart.forEach((e) => e.addEventListener("click", () => {
    const result = {};
    result.pid = e.dataset.id;
    console.log(result);
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
