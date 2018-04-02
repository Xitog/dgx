var key_prenoms = [
    "/a.da/",
    "/a.de…/",
    "/a.d[e|ɛ|ə]l…/",
    "/a.lis…/",
    "/a.l[i|ɛ]ks/",
    "/ɑ̃.ʒ[ɛ|e]l…/",
    "/a.n…/",
    "/kam…/",
    "/kaʁ…/",
    "/kas…/",
    "/kl[a|ɛ]ʁ…/",
    "/eʁik…/",
    "/el[e|ɛ]n…/",
    "Kestrell",
    "Lieke",
    "Robert",
    "/ʁaʃɛl/",
    "Solène",
    "Valentin",
    "/zoe/",
];
    var base_prenoms = {
    "/a.da/" : [ "Ada (♀)" ],
    "/a.de…/" : [ "Adéa (♀)" ],
    "/a.d[e|ɛ|ə]l…/" : [ "Adèle (♀)", "Adel (♂)", "Adeline (♀)", "Adèla (♀)", "Adéla (♀)", "Adella (♀)", "Adèlia (♀)", "Adélia (♀)", "Adèlie (♀)", "Adélie (♀)", "Adeleine (♀)", "Adélaïde (♀)" ],
    "/a.lis…/" : [ "Alice (♀)", "Alicia (♀)" ],
    "/a.l[i|ɛ]ks/" : [ "Alix (⚥)", "Alex (♂)", "Alexia (♀)", "Alexandra (♀)", "Alexandre (♂)", "Alexandrine (♀)" ],
    "/ɑ̃.ʒ[ɛ|e]l…/" : [ "Angèle (♀)", "Angèla (♀)", "Angélique (♀)", "Angélica (♀)", "Angélina (♀)", "Ange (♂)", "Angélo (♂)" ],
    "/a.n…/" : [ "Anne (?)", "Anna (♀)", "Annick (♀)", "Anaïs (♀)", "Annabelle (♀)", "Anaël (♂)", "Anaëlle (♀)" ],
    "/kam…/" : [ "Camille (⚥)" ],
    "/kaʁ…/" : [ "Carole (♀)", "Caroline (♀)", "Carine (♀)", "Karine (♀)" ],
    "/kas…/" : [ "Cassandre (♀)", "Cassandra (♀)", "Cassiopée (♀)" ],
    "/kl[a|ɛ]ʁ…/" : [ "Claire (♀)", "Clair (♂)", "Clara (♀)", "Clarisse (♀)", "Clarissa (♀)" ],
    "/eʁik…/" : [ "Éric (♂)", "Érica (♀)", "Éricka (♀)", "Érika (♀)" ],
    "/el[e|ɛ]n…/" : [ "Hélène (♀)", "Héléna (♀)", "Élaine (♀)" ],
    "Kestrell" : [ "Kestrell (♀)" ],
    "Lieke" : [ "Lieke (♀)" ],
    "Robert" : [ "Robert (♂)", "Roberto (♂)", "Roberta (♀)" ],
    "/ʁaʃɛl/" : [ "Rachel (♀)", "Rachelle (♀)", "Rachèle (♀)" ],
    "Solène" : [ "Solène (♀)", "Solenne (♀)" ],
    "Valentin" : [ "Valentin (♂)", "Valentino (♂)", "Valentine (♀)", "Valentina (♀)" ],
    "/zoe/" : [ "Zoé (♂)" ],
};

function prenoms() {
    var titre = document.getElementById("titreHaut");
    titre.innerHTML="Prénoms";
    var texte = document.getElementById("texteHaut");
    texte.innerHTML="Une liste de prénoms, beaucoup de France mais aussi d'ailleurs. Devant la diversité et le nombre de ceux-ci, on a essayé de les rassembler non par étymologie mais par prononciation, à l'aide de l'<a href=\"https://fr.wikipedia.org/wiki/Alphabet_phon%C3%A9tique_international\">Alphabet Phonétique International</a>.";
    var signature = document.getElementById("signature");
    signature.style.display = 'none';

    var content = document.getElementById("pageContent");
    var table = document.createElement("table");
    table.style.width = "100%";
    table.setAttribute("class", "tab");
    //table.setAttribute('border', '1');
    var tableBody = document.createElement('tbody');
    for (var i = 0; i < key_prenoms.length; i++) {
      var row = document.createElement('tr');
      var key = key_prenoms[i];
      var cell_family = document.createElement('td');
      cell_family.appendChild(document.createTextNode(key));
      cell_family.style.fontWeight = "bold";
      row.appendChild(cell_family);
      for (var j = 0; j < base_prenoms[key].length; j++) {
        var cell = document.createElement('td');
        cell.appendChild(document.createTextNode(base_prenoms[key][j]))
        row.appendChild(cell)
      }
      tableBody.appendChild(row);
    }
    table.appendChild(tableBody);
    content.appendChild(table);

    var legende = document.createElement("p");
    var legendeTitle = document.createElement("u");
    legendeTitle.appendChild(document.createTextNode("Légende :"));
    legende.appendChild(legendeTitle);

    var list = document.createElement("ul");
    var li1 = document.createElement("li");
    li1.appendChild(document.createTextNode("prénom épicène : utilisable pour les deux sexes historiquement même si un emploi domine parfois au fil du temps."));
    list.appendChild(li1);

    var li2 = document.createElement("li");
    li2.appendChild(document.createTextNode("Équivalence API/Français : e = é, ? = è, ? = eu, ?~ = an, ? = j ou g \"mou\""));
    list.appendChild(li2);
    legende.appendChild(list);
    content.appendChild(legende);

    document.title = "Prénoms";
    reset_menu("Autres");

    /*

    Adéa = Correspondante du journal Le Monde en Grèce
    Adèle = Du germanique adal : noble, généreux
    Cassandre = Voyait l'avenir mais nul ne la croyait.
    Clair est un vieux prénom masculin français.
    Lieke, Kestrell sont des prénoms hollandais comme Famke.

    http://fr.wikipedia.org/wiki/Ad%C3%A8le
    http://fr.wikipedia.org/wiki/Anne
    http://fr.wikipedia.org/wiki/Anna
    https://fr.wikipedia.org/wiki/Ana%C3%ABl
    https://fr.wiktionary.org/wiki/Clarisse

    https://developer.mozilla.org/fr/docs/Web/API/Document
    https://fr.wikipedia.org/wiki/JDOM
    http://stackoverflow.com/questions/413439/how-to-dynamically-change-a-web-pages-title
    https://www.w3schools.com/jsref/prop_style_fontweight.asp
    http://stackoverflow.com/questions/588040/window-onload-vs-document-onload
    http://stackoverflow.com/questions/1034621/get-current-url-in-web-browser
    http://stackoverflow.com/questions/3552944/how-to-get-the-anchor-from-the-url-using-jquery
    https://www.w3schools.com/jsref/jsref_split.asp

    */
}