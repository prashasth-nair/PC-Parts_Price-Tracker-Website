// get query string from URL
var query = window.location.search;
query = query.split("=")[1];
console.log(query); // fetch search results from API

var search_box = document.querySelector("#search-box");
var url = "http://localhost:8080/search?q=".concat(query);

query = query.replace(/\+/g, " ");
search_box.value = query;
var loader = document.querySelector(".loader");
loader.style.display = "block";
fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    var search_results = document.querySelector(".content");
    data.forEach(function (item) {
      var card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `<div class="card-results">  
                            <div class= "card-image">
                                <img src="${item.images}" alt="${item.title}">
                            </div>
                            <div class="card-content">
                                <h3 class=${item.category}>${item.title}</h3>
                                <button id=${item.id} class="btn">View Product</button>
                            </div>
                        </div
      `; // append card to search results

      search_results.appendChild(card);
    });
  }).finally(function () {
    loader.style.display = "none";
  });

//   if any btn is clicked, redirect to the product page
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn")) {
    var id = e.target.id;
    var category = e.target.previousElementSibling.className;
    window.location.href = "/src/html/product_details.html?category=".concat(category, "&id=").concat(id);
  }
});
