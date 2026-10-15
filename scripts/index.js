const apikey = "93054333";
// Liste des imdbID des films considérés en tendance
let trend = [
    "tt12042730",
    "tt28650488",
    "tt11378946",
    "tt29355505",
    "tt33612209",
    "tt26443616",
    "tt17490712",
    "tt32141377",
    "tt14850054",
    "tt8036976",
    "tt22084616",
    "tt30825738",
    "tt33764258",
]
const container = document.getElementById("container");
const moreButton = document.getElementById("more");

// Récupère les détails du premier film de la liste trend et appelle displayMovies() pour les afficher
async function getMovies() {
    if (trend.length === 0) {
        moreButton.style.display = "none";
        console.log("La liste de films est vide");
    } else {
        try {
            const response = await fetch(`https://www.omdbapi.com/?apikey=${apikey}&i=${trend[0]}`);
            trend.shift();
            const data = await response.json();
            await displayMovies(data);
        } catch (error) {
            console.error("Erreur : ", error);
        }
    }
}

// Affiche les films avec les détails passés en paramètres (data)
async function displayMovies(data) {
    const plot = await getPlot(data.imdbID);
    const article = document.createElement("article");
    article.innerHTML = `
        <article class="Film">
            <img src="http://img.omdbapi.com/?apikey=${apikey}&i=${data.imdbID}" alt="Affiche du film ${data.Title}" />
            <p>${data.Title}</p>
            <a title="Lien vers la page du film ${data.Title}" href="movie.html?imdbID=${data.imdbID}">En savoir plus</a>
            <p>${plot}</p>
        </article>`
    container.appendChild(article);
}

// Permet de récupérer le résumé court du film. Est appelée dans displayMovies()
async function getPlot(imdbID) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apikey}&i=${imdbID}`);
        const data = await response.json();
        return data.Plot
    } catch (error) {
        console.error("Erreur : ", error);
        return "Résumé indisponible";
    }
}

// Affiche trois films à la fois. Est appelée une fois à l'affichage de la page et une fois par appui sur le bouton 'Plus...'
async function main() {
    await getMovies();
    await getMovies();
    await getMovies();
}

main()
moreButton.addEventListener("click", main);
