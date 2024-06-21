const content = document.querySelector('.content');

let url = 'http://localhost:8080/categories';


document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    fetchData();
});

const fetchData = () => {
fetch(url).then(response => {
    return response.json();
    }).then(data => {
        console.log(data);
        let html = '';
        data.forEach(category => {
            html += `
                <div class="category" id="div_${category.name}">
                <img src=${category.img_src}></img>
                    <h2>${category.name}</h2>
                    <button id=${category.name}>View Products</button>
                </div>
            `;
        });
        content.innerHTML = html;

    });

}

if (content) {
    content.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            console.log(e.target.id);
            let category = e.target.id;
            window.location.href = `products.html?category=${category}`;
        }
    });
}

// Search Box Functionality
const search = document.getElementById('search-box');
const searchBtn = document.getElementById('search_btn');

searchBtn.addEventListener('click', () => {
    let searchValue = search.value;
    // console.log(searchValue);
    // space is replaced with + and remove more than one spaces and remove the last space if it exists

    searchValue = searchValue.trim();
    searchValue = searchValue.replace(/\s+/g, '+');

    let searchUrl = `/src/html/search.html?q=${searchValue}`;
    window.location.href = searchUrl;
    // window.location.href = `products.html?search=${searchValue}`;
});