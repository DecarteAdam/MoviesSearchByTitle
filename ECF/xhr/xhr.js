let btnRecherche = document.getElementById("btnRecherche");
let zoneRecherche = document.getElementById("zoneRecherche");
let xhr;
try{
    xhr = new XMLHttpRequest();
}catch(Exception){
    alert('ça c\'est pas super bien passé')
}
let paramSQL;

btnRecherche.addEventListener("click", ()=>{
    paramSQL = zoneRecherche.value;
    lanceRequete(paramSQL)
});

const lanceRequete = (param) => {
    try{
        xhr.open("GET", "process.php?param=" + param , true);
        xhr.send(null);
        xhr.onreadystatechange = () =>{
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    let mesFilms =  JSON.parse(xhr.responseText)
                    mesFilms.forEach(element => {
                        console.log(element.movie_title + " --- " + element.movie_genre)
                    });
                }
            }
        }
        }catch(Exception){
            alert('pas top');
        }
}
