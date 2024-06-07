// Get Attribute Value from url

// Get the value of the query string parameter
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const category = urlParams.get("category");
const id = urlParams.get("id");
console.log(category);

let content = document.querySelector(".content");
let url = `http://localhost:8080/product/${category}/${id}`;

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded");
  fetchData();
});
// Function to display the product information
function displayProductInfo(productInfo) {
  let data = [];
  let title;
  let value;

  return data;
}

const fetchData = () => {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      let html = "";
      data.forEach((product) => {
        if (product.title !== undefined) {
          html += `
                <div class="product" id="div_${product.title}">
                  <div class="product-image">
                    <img src=${product.images[0]}></img>
                    <h2>${product.title}</h2>
                    `;
          product.product_info.forEach((section) => {
            html += `<div class="prod_info"><h2>${section.title}</h2>`;
            section.data.forEach((item) => {
              title = item.title;
              value = item.value;

              html += `<p>${title}: ${value}</p>`;
            });
            html += `</div>`;
          });
          html += ` 
                    </div>
                    <div class="product-details">
                    <h3>${product.long_title}</h5>
                    <p>${product.star_rating}</p> 
                    <p>${product.desc}</p> 
                    <h3 class="Product_feature"> Product Features </h3>
                    <ul>
                    `;
          for (let i = 0; i < product.product_features.length; i++) {
            html += `<li>${product.product_features[i]}</li>`;
          }
          html += `
                    </ul>
                    <p>Price: ${product.price}</p> 
                    <a href=${product.buy}>Buy Now</a>
                    </div>
                </div>
            `;


            fetch(`http://localhost:8080/price-tracker?url=${product.buy}`)
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                // Show the price tracker data as canvas
                let priceData = data;
                let priceChart = document.createElement("canvas");
                priceChart.id = "priceChart";
                document.getElementById(`div_${product.title}`).appendChild(priceChart);
                let ctx = priceChart.getContext("2d");
                let chart = new Chart(ctx, {
                  type: "line",
                  data: {
                    labels: priceData.map((data) => data.date),
                    datasets: [
                      {
                        label: "Price",
                        data: priceData.map((data) => data.price),
                        backgroundColor: "rgba(255, 99, 132, 0.2)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 1,
                      },
                    ],
                  },
                  options: {
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  },
                });
              });

        }
      });
      content.innerHTML = html;
    });

};

