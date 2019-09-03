<?php

require('./sql.php');

$response;

if ( isset($_GET["param"]) ){

    $param = $_GET["param"];

    if ( ($param == "") || empty($_GET["param"]) ) {     //si l'utilisateur demande un champ vide ""
        //on retourne la liste complète
        $request = "SELECT movie_title, movie_genre, movie_rating FROM movies ORDER BY movie_title ASC";
        $resultat = $db->prepare($request);
        $resultat -> execute();
    } else {                //sinon
        //on sélectionne les éléments pertinent et on les renvoie
        $request = "SELECT movie_title, movie_genre FROM movies WHERE movie_title like ? ORDER BY movie_title ASC";
        $resultat = $db->prepare($request);
        $resultat -> execute(array("%".$param."%"));
    }
    $response = $resultat->fetchAll();

}else{

    $response = "pas de corrélation";

}
//$resultat -> closeCursor();



echo json_encode($response);


?>