// Get Attribute Value from url

// Get the value of the query string parameter
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const category = urlParams.get("category");
const loader = document.querySelector(".loader");
console.log(category);

let content = document.querySelector(".content");
let url = `http://localhost:8080/categories/${category}`;

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded");
  loader.style.display = "block";
  fetchData();

});


const fetchData = () => {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      let html = "";
      data.forEach((product) => {
        if (product.name !== undefined) {
          html += `
                <div class="product" id="div_${product.name}">
                    <img src=${product.img}></img>
                    <h2>${product.name}</h2>
                    <p>${product.price}</p> 
                    <button id=${product.id} class="View">View Product</button>
                </div>
            `;
        }
      });
      content.innerHTML = html;
    }).finally(() => {
      loader.style.display = "none";
    })
};


document.addEventListener("click", (e) => {
  if (e.target.classList.contains("View")) {
    let id = e.target.id;
    window.location.href = `product_details.html?category=${category}&id=${id}`;
  }
});