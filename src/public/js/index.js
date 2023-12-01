const prevPage = document.getElementById("prevPage");
const nextPage = document.getElementById("nextPage");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {
  const query = document.getElementById("query").value;
  const category = document.getElementById("category").value;
  const currentUrl = document.location.href;
  if (currentUrl.length < 20) {
    document.location.href = `${currentUrl}&query=${query}`;
  } else if (query !== '') {
    document.location.href = `/?query=${query}`;
  } else {
    document.location.href = `/?query=${category}`;
  }
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