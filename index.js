const api = "2758a5e02f064991902cb8d55f23b07a";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => {
  fetchnews("india");
});
function relode() {
  window.location.reload();
}
async function fetchnews(query) {
  const res = await fetch(`${url}${query}&apiKey=${api}`);
  const data = await res.json();
  bindData(data.articles);
}

function bindData(articles) {
  const cardscontainer = document.getElementById("cards-container");
  const templatecard = document.getElementById("template-news-card");

  cardscontainer.innerHTML = "";

  articles.forEach((element) => {
    if (element.urlToImage) {
      const cardclone = templatecard.content.cloneNode(true);
      fillDataInCard(cardclone, element);
      cardscontainer.appendChild(cardclone);
    }
  });
}

function fillDataInCard(cardclone, element) {
  const newsimg = cardclone.querySelector("#news-img");
  const newsTitle = cardclone.querySelector("#news-title");
  const newssource = cardclone.querySelector("#news-source");
  const newsdesc = cardclone.querySelector("#news-desc");

  newsimg.src = element.urlToImage;
  newsTitle.innerHTML = element.title;
  newsdesc.innerHTML = element.description;

  const data = new Date(element.publishedAt).toLocaleString("en-Us", {
    timeZone: "Asia/jakarta",
  });

  newssource.innerHTML = `${element.source.name} · ${data}`;
  cardclone.firstElementChild.addEventListener("click", () => {
    window.open(element.url, "_blank");
  });
}

var currselectednav = null;
function onNavItemClick(id) {
  fetchnews(id);
  currselectednav?.classList.remove("active");
  const newitem = document.getElementById(id);
  currselectednav = newitem;
  currselectednav.classList.add("active");
}

const searchbutton = document.getElementById("searchbutton");
const searchquery = document.getElementById("searchquery");

searchbutton.addEventListener("click", () => {
  const query = searchquery.value;
  currselectednav?.classList.remove("active");
  if (query) {
    fetchnews(query);
  }
});
