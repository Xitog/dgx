var entries = {
    0 : ['03-04-2017', 'Le site est en totale reconstruction, les fonctionnalités seront peu à peu rajoutées, merci pour votre patience.', 'Blog'],
};

function view_one_entry(id) {
    var titre = document.getElementById("titreHaut");
    titre.innerHTML="Blog";
    var texte = document.getElementById("texteHaut");
    var day = entries[id][0];
    var content = entries[id][1];
    texte.innerHTML= day + '<br>' + '<hr>' + content;
    var signature = document.getElementById("signature");
    signature.style.display = 'none';

    //var content = document.getElementById("pageContent");
    
    reset_menu("Blog");
}
