<?php

require('./sql.php');

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div>
<label for="recherche">Tapez votre recherche</label>
<input type="text" name="recherche" id="zoneRecherche">
<button id="btnRecherche">Rechercher !</button>
</div>

<div class="darkPoney" id="darkPoney">
<ul>

</ul>
</div>
<script src="./xhr.js"></script>
</body>
</html>
