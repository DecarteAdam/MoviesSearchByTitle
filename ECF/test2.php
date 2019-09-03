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
        <link rel="stylesheet" href="./css/bootstrap.min.css">
        <link rel="stylesheet" href="./css/bootstrap-grid.min.css">
        <link rel="stylesheet" href="./css/startbootstrap-sb-admin-gh-pages/css/sb-admin.min.css">
    </head>
    <body>
        <div id="background">

        
            <div class="container content-wrapper">
                <div class="panel-heading navbar navbar-expand navbar-dark bg-dark static-top">
                    <p class="navbar-brand mr-1">Rechercher dans la base de données de films</p>
                </div>
                <div class="card">
                    <div class="panel panel-primary card-header"> 
                        <div class="row input-group card-body">
                            <div class="col-md-5">
                                <input type="text" name="recherche" placeholder="Rechercher... (laisser vide pour tout afficher)" id="zoneRecherche" class="input-recherche form-control">
                            </div>
                            <div class="input-group-append">
                                <button id="btnRecherche" class="btn btn-primary">
                                    <div class="fas fa-search">Go !</div>
                                </button>
                            </div>
                            <div class="col-pd-4">
                                <p id="please-wait" class="display-off">Processing, please wait...</p>
                            </div>
                        </div>
                        
                        <div id="darkPoney" class="darkPoney row card-body">
                            <ul id="affichage-resultats" class="list-group col-md-12">
                               
                            </ul>
                        </div>
                        <div id="page-selector" class="row card-footer">
                            <div id="texte-info-nb-resultats" class="col-sm-12 col-md-5"></div>
                            <div id="selecteur-pages" class="col-sm-12 col-md-7">
                                <ul id="liste-des-pages" class="pagination flex-end">
                                
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script src="./xhr.js"></script>
    </body>
</html>
