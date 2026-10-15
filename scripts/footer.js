// On remplit la balise footer avec le contenu
document.getElementById("footer").innerHTML = `
    <div id="flexboxFooter">
        <nav>
            <a class="NavLink" title="Lien vers la page d'accueil" href="index.html">Accueil</a>
            <a class="NavLink" title="Lien vers la page de recherche de films" href="search.html">Rechercher un
                film</a>
        </nav>
        <article class="footerArticles">
            <h3>Crédits :</h3>
            <p>Site réalisé par Axel Fryson, dans le cadre d'un projet scolaire.</p>
            <p>Année : 2026</p>
        </article>
        <article class="footerArticles">
            <h3>Informations légales :</h3>
            <p>Ce site a été réalisé dans le cadre d'un projet scolaire.</p>
            <p>Responsable du site : Fryson Axel</p>
            <p>Etablissement scolaire : SUPINFO Lille</p>
        </article>
    </div>`
