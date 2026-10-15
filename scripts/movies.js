const apikey = "93054333";

// Récupération de l'imdbID passé en paramètre dans l'URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const imdbID = urlParams.get("imdbID");

const pageTitle = document.getElementById("pageTitle");
const container = document.getElementById("container");

// Récupère les détails du film dont l'imdbID est passé en paramètre et appelle displayMovies() pour les afficher
async function getContent() {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apikey}&i=${imdbID}&plot=full`);
        const data = await response.json();
        displayMovies(data);
    } catch (error) {
        console.error("Erreur : ", error);
    }
}

// Affiche les détails du film passés en paramètre (data) sur la page
function displayMovies(data) {
    pageTitle.textContent = `SUPCinéma - ${data.Title}`

    const ratings = document.createElement("div");
    for (element of data.Ratings) {
        const p = document.createElement("p");
        p.textContent = `${element.Source} : ${element.Value}`;
        ratings.appendChild(p);
    }

    let dateDVD = "Date indisponible";
    if (data.DVD !== "N/A") {
        dateDVD = new Date(data.DVD).toLocaleDateString("fr-FR");
    }

    const article = document.createElement("article");
    article.innerHTML = `
        <article id="content">
            <div id="titleImage">
                <h1>${data.Title}</h1>
                <img src="http://img.omdbapi.com/?apikey=${apikey}&i=${data.imdbID}" alt="Affiche du film ${data.Title}" />
            </div>
            <h2>Résumé :</h2>
            <p>${data.Plot}</p>
            <h2>Genre :</h2>
            <p>${data.Genre}</p>
            <h2>Liste des acteurs :</h2>
            <p>${data.Actors}</p>
            <h2>Notes :</h2>
            <div id="ratings"></div>
            <h2>Date de sortie en DVD :</h2>
            <p>${dateDVD}</p>
        </article>`;
    article.querySelector("#ratings").appendChild(ratings);
    container.appendChild(article);
}

getContent();
