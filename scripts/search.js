const apikey = "93054333";
const searchBar = document.getElementById("searchBar");
const container = document.getElementById("container");
const moreButton = document.getElementById("more");
let page = 1;

async function getMovies(query) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apikey}&s=${query}&page=${page}`);
        const data = await response.json();
        await displayMovies(data);
    } catch (error) {
        console.error("Erreur : ", error);
    }
}

async function displayMovies(data) {
    if (data.Response === "False") {
        moreButton.style.display = "none";
    } else {
        moreButton.style.display = "block";
        for (element of data.Search) {
            const article = document.createElement("article");
            article.innerHTML = `
            <article class="Film">
                <img src="http://img.omdbapi.com/?apikey=${apikey}&i=${element.imdbID}" alt="Affiche du film ${element.Title}" />
                <p>${element.Title}</p>
                <a title="Lien vers la page du film ${element.Title}" href="movie.html?imdbID=${element.imdbID}">En savoir plus</a>
            </article>`
            container.appendChild(article);
        }
    }
}

searchBar.addEventListener('input', (event) => {
    container.innerHTML = "";
    const query = event.target.value.toLowerCase();
    getMovies(query);
});

function moreClicked() {
    page++;
    const query = searchBar.value;
    getMovies(query);
}

moreButton.addEventListener("click", moreClicked);
