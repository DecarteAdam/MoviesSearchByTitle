/*******************************************/
/**************** VARIABLES ****************/
/*******************************************/

let zoneRecherche = document.getElementById("zoneRecherche");                   //<input> où l'utilisateur saisit sa recherche
let btnRecherche = document.getElementById("btnRecherche");                     //bouton "Go !" qui déclenche la recherche
let pleaseWaitMsg = document.getElementById("please-wait");                     //element qui affiche un message d'attente
let listeResultats = document.getElementById("affichage-resultats");            //<ul> où s'afficheront les résultats
let texteInfoNbResultats = document.getElementById("texte-info-nb-resultats");  //<div> où sera affiché le nombre de résultats
let listePages = document.getElementById("liste-des-pages");                    //<ul> où s'afficheront les numéros de page
let xhr;                                                                        //objet XMLHttpRequest
let resultats = [];                                                             //tableau qui contiendra les résultats de la requête SQL
let paramSQL;                                                                   //récupère le contenu de zoneRecherche.value par un  click listener sur btnRecherche
let pageActive;                                                                 //numéro de page des résultats actuellement affichée
let nbPages = 0;                                                                //nombre actuel de pages de résultats
try {
    xhr = new XMLHttpRequest();                                                 //initialisation de l'objet XMLHttpRequest
} catch(e) {
    alert("erreur XMLHttpRequest : " + e);
}

/********************************************/
/**************** CONSTANTES ****************/
/********************************************/

let NB_RESULTATS_PAR_PAGE = 25;                                                 //nombre de résultats qu'on souhaite afficher sur une page

/*******************************************/
/**************** FONCTIONS ****************/
/*******************************************/

/**
 * crée un noeud HTML prêt à être inséré dans le DOM
 * @param {*} type détermine le type d'élément à créer. Attend une string, dans cet exercice on utilise uniquement "li" ou "a"
 * @param {*} id quel id donner à l'élément. Attend une string. Si aucun id souhaité, saisir null
 * @param {*} className quelle(s) classe(s) donner à l'élément. Attend une string. Si aucune classe souhaitée, saisir null
 * @param {*} textToAppend quel texte doit être inséré dans l'élément. Attend une string. Si aucun texte souhaité, saisir null
 */
const creerNoeud = (type, id, className, textToAppend) => {
        let noeud;                                                      //on déclare le noeud
    try {
        noeud = document.createElement(type);                           //on crée le noeud
    } catch (Exception) {
        console.log("erreur de type de noeud dans la fonction creerNoeud");
    };      //try catch au cas où la saisie serait invalide
    if (id != null) {                                                   //si un id est demandé
        try {
            noeud.id = id;                                              //on l'ajoute au noeud
        } catch (Exception) {
            console.log("erreur d'id dans la fonction creerNoeud")
        };  //try catch au cas où la saisie serait invalide
    }
    if (className != null) {                                            //si un className est demandé
        try {
            noeud.className = className;                                //on l'ajoute au noeud
        } catch (Exception) {
            console.log("erreur de className dans la fonction creerNoeud");
        };  //try catch au cas où la saisie serait invalide
    }
    if (textToAppend != null) {                                         //si un texteToAppend est demandé
        try {
            noeud.appendChild(document.createTextNode(textToAppend));   //on l'ajoute au noeud
        } catch (Exception) {
            console.log("erreur de textToAppend dans la fonction creerNoeud")
        };  //try catch au cas où la saisie serait invalide
    }
    return noeud;                                                       //on renvoie le noeud
}

/**
 * effectue l'affichage s'il y a un ou plusieurs résultats à la recherche
 */
const afficherResultats = () => {
    //on vide la liste de résultats
    listeResultats.innerHTML = "";
    //on détermine les bornes
    let elementDebut = 1;   //on commence toujours avec le premier résultat
    let elementFin;         //on calculera ultérieurement sa valeur, selon le nombre de résultats à afficher par page
    if (resultats.length < NB_RESULTATS_PAR_PAGE) {         //s'il n'y a pas assez de résultats pour remplir une page entière
        elementFin = resultats.length;                      //le dernier élément à afficher est celui à l'indice max du tableau resultats
    } else {                                                //sinon
        elementFin = NB_RESULTATS_PAR_PAGE;                 //on affiche le nombre max de résultats possibles par page (par défaut 25)
    }
    for (let i = elementDebut; i <= elementFin; i++) {      //on boucle autant de fois qu'il y a d'élements à afficher
        let divResultat = creerNoeud("div", null, "row", null);
        let liNumFilm = creerNoeud("li", null, "list-group-item col-sm-1 col-md-1", resultats[i-1][0]);
        let liTitreFilm = creerNoeud("button", null, "list-group-item col-sm-5 col-md-6", resultats[i-1][1]);
        let liGenreFilm = creerNoeud("li", null, "list-group-item col-sm-5 col-md-5", resultats[i-1][2]);
        divResultat.appendChild(liNumFilm);
        divResultat.appendChild(liTitreFilm);
        divResultat.appendChild(liGenreFilm);
        listeResultats.appendChild(divResultat);
    
        /**
         * Pop-Up lors de click sur le bouton "Titre" 
         */
        
        liTitreFilm.addEventListener('click', () => {
            window.open("./img/film.png","nom_popup","menubar=no, status=no, scrollbars=no, menubar=no, width=1200, height=617");
        })
        
    
        // let texteDuNoeud = resultats[i-1];
        // let li = creerNoeud("li", null, "list-group-item", texteDuNoeud);
        // listeResultats.appendChild(li);
    }
    pageActive = 1;                                         //on déclare qu'on affiche actuellement la page 1
    //on affiche le texte avec nombre de résultats en bas
    let nbResultats = resultats.length;                     //on dénombre les résultats
    let affichage = "Il y a " + nbResultats + " résultats"  //on prépare le texte
    texteInfoNbResultats.innerHTML = affichage;             //on l'affiche en bas à gauche
    //on affiche le sélecteur de pages
    if (nbResultats < NB_RESULTATS_PAR_PAGE) {              //si une seule page de résultats à afficher
        //on affiche le numéro de page "1", sans "précédent" et "suivant"
        listePages.innerHTML = "";                          //on efface l'éventuel affichage précédent
        let li = creerNoeud("li", "page-active", "paginate_button page-item active", null);
        let lien = creerNoeud("a", null, "page-link", "1");
        li.appendChild(lien);
        listePages.appendChild(li);                         //on injecte le <li> dans l'<ul>
    } else {                                                //sinon (implicitement : si on a plus d'une page à afficher)
        listePages.innerHTML = "";                          //on efface l'affichage antérieur
        //on affiche "précédent"
        let liPrecedent = creerNoeud("li", "selecteur-page-precedente", "paginate_button page-item previous", null);
        let aPrecedent = creerNoeud("a", null, "page-link", "Précédent");
        liPrecedent.appendChild(aPrecedent);
        listePages.appendChild(liPrecedent);
        //on affiche les numéros un par un
        nbPages = Math.ceil(nbResultats /NB_RESULTATS_PAR_PAGE);
        for (let i = 1; i <= nbPages; i++) {
            
            let idADonner = "selecteur-page-" + i;
            let classNameADonner;
            if (i == 1) {
                classNameADonner = "paginate_button page-item active";
            } else {
                classNameADonner = "paginate_button page-item";
            }
            let liNbEnCours = creerNoeud("li", idADonner, classNameADonner, null);
            let aNbEnCours = creerNoeud("a", null, "page-link", i);
            liNbEnCours.appendChild(aNbEnCours);
            listePages.appendChild(liNbEnCours);
        }
        //on affiche "suivant"
        let liSuivant = creerNoeud("li", "selecteur-page-suivante", "paginate_button page-item next", null);
        let aSuivant = creerNoeud("a", null, "page-link", "Suivant");
        liSuivant.appendChild(aSuivant);
        listePages.appendChild(liSuivant);
    }
}

/**
 * effectue l'affichage s'il n'y a pas de résultats à la recherche
 */
const afficherPasDeResultats = () => {
    // listeResultats.innerHTML = "";      //on efface la liste de résultats
    listeResultats.innerHTML = "<li class=\"list-group-item\">Aucun résultat</li>";
    texteInfoNbResultats.innerHTML = "Il n'y a aucun résultat";
    listePages.innerHTML = "";             //on efface l'éventuel affichage précédent
}

/**
 * change la page de résultats affichée
 * @param {*} nPageDem numéro de la page demandée
 */
const rafraichirResultats = (numPageDemandee) => {
    listeResultats.innerHTML = "";              //on efface la liste de résultats précédente
    //on détermine les bornes
    let elementDebut;
    let elementFin;
    if (numPageDemandee == nbPages) {        //si on veut afficher la dernière page (donc si la page n'a pas forcément 25 entrées)
    elementFin = resultats.length;
    elementDebut = numPageDemandee * NB_RESULTATS_PAR_PAGE - (NB_RESULTATS_PAR_PAGE - 1);
} else {                                // si pas la dernière page
    elementFin = numPageDemandee * NB_RESULTATS_PAR_PAGE;
    elementDebut = elementFin -(NB_RESULTATS_PAR_PAGE-1);
}
    for (let i = elementDebut; i <= elementFin; i++) {
        let divResultat = creerNoeud("div", null, "row", null);
        let liNumFilm = creerNoeud("li", null, "list-group-item col-sm-1 col-md-1", resultats[i-1][0]);
        let liTitreFilm = creerNoeud("li", null, "list-group-item col-sm-5 col-md-6", resultats[i-1][1]);
        let liGenreFilm = creerNoeud("li", null, "list-group-item col-sm-5 col-md-5", resultats[i-1][2]);
        divResultat.appendChild(liNumFilm);
        divResultat.appendChild(liTitreFilm);
        divResultat.appendChild(liGenreFilm);
        listeResultats.appendChild(divResultat);
    }
    let anciennePageActive = document.getElementById("selecteur-page-" + pageActive);
    anciennePageActive.className = "paginate_button page-item";
    let nouvellePageActive = document.getElementById("selecteur-page-" + numPageDemandee);
    nouvellePageActive.className = "paginate_button page-item active";
    pageActive = numPageDemandee;
}

/**
 * effectue la requête à la BDD et appelle la fonction d'affichage appropriée
 * @param {*} param string à chercher dans la BDD
 */
const lanceRequete = (param) => {
    try{
        xhr.open("GET", "process.php?param=" + param , true);
        xhr.send(null);
        xhr.onreadystatechange = () => {
            
            if ( (xhr.readyState >= 0) && (xhr.readyState < 4)  ) {  //si la requête n'a pas terminé sa tâche
            //on affiche un message d'attente
            pleaseWaitMsg.className = "display-on";
            }
            if(xhr.readyState == 4) {   //4 = DONE
                //on efface le message d'attente, puis on calcule et affiche le résultat
                pleaseWaitMsg.className = "display-off";
                if(xhr.status == 200) {
                    let mesFilms =  JSON.parse(xhr.responseText)
                    if (mesFilms == "") {   //si aucun résultat
                        //on vide le tableau de résultats
                        resultats = [];
                    } else {                //sinon
                        //on vide le tableau des résultats
                        resultats = [];
                        //on parcourt les résultats récupérés et on les ajoute au tableau
                        let compteur = 0;
                        mesFilms.forEach(element => {
                            resultats.push([]);
                            let filmTitre = element.movie_title;
                            let filmGenre = element.movie_genre;
                            let numero = compteur+1;
                            resultats[compteur].push(numero, filmTitre, filmGenre);
                            compteur++;
                            
                            
                        });
                        console.log(resultats);
                    }
                    //puis on les affiche
                    if (resultats.length>0) {   //si on a des résultats
                        afficherResultats();
                    } else {                    
                        afficherPasDeResultats();
                    }
                }
            }
        }
    }catch(Exception){
        alert('pas top');
    }
}

/*******************************************/
/************  FIN DES FONCTION ************/
/*******************************************/

/*******************************************/
/**** EXECUTION SEQUENTIELLE & CALLBACK ****/
/*******************************************/

//eventlistener du bouton Go!
btnRecherche.addEventListener("click", () => {
    paramSQL = zoneRecherche.value;
    lanceRequete(paramSQL)
});

//eventlistener quand on tape Entrée dans l'input field
zoneRecherche.addEventListener("keyup", (event) => {
    event.preventDefault();
    if (event.keyCode === 13) {     //touche entrée
        btnRecherche.click();       //déclenche un clic sur le bouton
    }
});

//listener des boutons de changement de page
//ces boutons n'existant pas toujours, et leur nombre n'étant pas fixe, on crée un listener sur le DOM qui vérifiera la cible du clic à chaque fois
document.addEventListener("click", (e) => {
    if (e.target && e.target.className =="page-link") {     //si l'element cliqué a la classe "page-link" (propre aux éléments de pagination)
        let PageDemandee = e.target.innerHTML;              //on récupère le contenu textuel de l'élement
        if (PageDemandee == "Précédent") {
            if (pageActive > 1) {       //condition pour n'appeler la page précédente que si on n'est pas sur la page 1 (car il n'y a aucune page avant la 1)
                let pageAAfficher = pageActive;
                pageAAfficher -= 1;
                rafraichirResultats(pageAAfficher);
            }
        } else if (PageDemandee == "Suivant") {
            if (pageActive < nbPages) {                 //condition pour n'appeler la page suivante que si on n'est pas déjà sur la dernière page
                let pageAAfficher = pageActive;
                pageAAfficher += 1;
                rafraichirResultats(pageAAfficher);
            }
        } else {
            PageDemandee = parseInt(PageDemandee);      //on caste PageDemandee en entier car c'est initialement une chaîne
            if (typeof PageDemandee === 'number') {     //si la page demandée n'est ni "Précédent", ni "Suivant", et est bien un nombre entier
                    rafraichirResultats(PageDemandee);
            }
        }
    }
})