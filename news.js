const API_KEY = "30e3f254090c4c74b83b00500dccd596";
const url = "https://newsapi.org/v2/everything?q=";

const searchInput = document.getElementById('search-text');
const searchBtn = document.getElementById('search-btn');

function reload() {
    window.location.reload();
}

window.addEventListener('load', () => fetchNews('London'));

async function fetchNews(query) {
    const response = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await response.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardContainer = document.getElementById("card-container");
    const templateContainer = document.getElementById("template-news-container");

    cardContainer.innerHTML = "";

    articles.forEach((article) => {
        if(!article.urlToImage) return;
       const cardClone =  templateContainer.content.cloneNode(true);
       fillDataInCard(cardClone,article);
       cardContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone,article) {
        const newsImg = cardClone.querySelector('#news-img');
        const newsTitle = cardClone.querySelector('#news-title');
        const newsSource = cardClone.querySelector('#news-source');
        const newsDesc = cardClone.querySelector('#news-desc');

        newsImg.src = article.urlToImage;
        newsTitle.innerHTML = article.title;
        newsDesc.innerHTML = article.description;

        const date = new Date(article.publishedAt).toLocaleString("en-US", {
            timeZone: "Asia/Jakarta",
        });

        newsSource.innerHTML = `${article.source.name} ${date}`;
        cardClone.firstElementChild.addEventListener('click', () => {
            window.open(article.url, "_blank");
        })
}

searchBtn.addEventListener('click', () => {
    fetchNews(searchInput.value);
});
