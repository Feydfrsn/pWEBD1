const apikey = "93054333";
let trend = [
    "tt33764258",
    "tt8814476",
    "tt22084616",
    "tt35538033",
    "tt15239678",
    "tt6263850",
    "tt22022452",
    "tt29623480",
    "tt15398776",
    "tt4154796",
    "tt1375666",
    "tt0816692",
    "tt1790864",
]
const divDisplayMovies = document.getElementById("displayMovies");
const moreButton = document.getElementById("more");

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
    divDisplayMovies.appendChild(article);
}

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

async function main() {
    await getMovies();
    await getMovies();
    await getMovies();
}

main()
moreButton.addEventListener("click", main);
