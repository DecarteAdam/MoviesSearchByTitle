<?php

$host = "localhost";
$dbName = "moviesbar";
$userName = "root";
$passwd = "";
$charset = "utf8";

try{
    $db = new PDO("mysql:host=$host;dbname=$dbName;charset=$charset", $userName, $passwd);

}catch(Exception $e){
    var_dump($e->getMessage());
    echo 'Connexion à la base impossible, veuillez contacter votre administrateur';
}
