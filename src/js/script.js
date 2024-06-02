const content = document.querySelector('.content');

let url = 'https://pc-parts-price-tracker-api.onrender.com/categories';


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
