<?php

require('./sql.php');

$response;

if (isset($_GET["param"]) && !empty($_GET["param"])){

    $param = $_GET["param"];
    $request = "SELECT movie_title, movie_genre FROM movies WHERE movie_title like ?";
    $resultat = $db->prepare($request);
    $resultat -> execute(array("%".$param."%"));
    $response = $resultat->fetchAll();

}else{

    $response = "pas de corrélation";

}
//$resultat -> closeCursor();



echo json_encode($response);


?>