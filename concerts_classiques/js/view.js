
function getParameters(document) {
    var params = {};
    params.city_bdx = document.getElementById("par_city_bdx").checked;
    params.city_tlse = document.getElementById("par_city_tlse").checked;
    params.orch_onct = document.getElementById("par_orch_onct").checked;
    params.orch_onba = document.getElementById("par_orch_onba").checked;
    params.par_trou_bc = document.getElementById("par_trou_bc").checked;
    params.par_trou_tc = document.getElementById("par_trou_tc").checked;
    params.date_over = document.getElementById("par_date_over").checked;
    params.type_concert = document.getElementById("par_type_concert").checked;
    params.type_opera = document.getElementById("par_type_opera").checked;
    params.type_ballet = document.getElementById("par_type_ballet").checked;
    return params;
}

function viewAllComposers(document, dates, months, works, authors_abc) {
    // On efface
    var compo_div = document.getElementById("compo_div");
    // Nettoyage
    while (compo_div.firstChild) {
        compo_div.removeChild(compo_div.firstChild);
    }
    
    var first = '';
    var compo_list = document.getElementById("compo_list");
    for (var i=0; i < authors_abc.length; i++) {
        //var authors_splitted = authors_abc[i].split(' ');
        //var last = authors_splitted[authors_splitted.length-1];
        //if (last.charAt(0) !== first) {
        if (authors_abc[i].charAt(0) !== first) {
            //first = last.charAt(0);
            first = authors_abc[i].charAt(0);
            var divider = document.createElement('li');
            divider.setAttribute('class', 'divider');
            divider.textContent = first.toLocaleUpperCase();
            compo_list.appendChild(divider);
        }
        var li = document.createElement('li');
        
        var aa = document.createElement('a');
        aa.textContent = works[authors_abc[i]].fullname;
        aa.setAttribute('onclick', "controlComposer('" + authors_abc[i] + "')");
        li.appendChild(aa);
        
        //li.textContent = authors_abc[i];
        compo_list.appendChild(li);
    }
}

function viewComposerDates(composer, document, dates, months, works, org_disp) {
    // On efface
    var compo_list = document.getElementById("compo_list");
    // Nettoyage
    while (compo_list.firstChild) {
        compo_list.removeChild(compo_list.firstChild);
    }
    
    var compo_div = document.getElementById("compo_div");
    
    var div = document.createElement("div");
    div.setAttribute('class', 'date_nav');
    
    var span = document.createElement('span');
    span.setAttribute('class', 'space_right');
    var aa = document.createElement('a');
    aa.setAttribute('class', 'button previous');
    aa.setAttribute('onclick', 'controlComposerList()');
    aa.innerHTML = 'liste';
    span.appendChild(aa);
    div.appendChild(span);
    
    span = document.createElement("span");
    span.setAttribute('class', 'button_false');
    span.textContent = composer;
    div.appendChild(span);
    
    compo_div.appendChild(div);
    
    // Affichage
    for (var i = 0; i < dates.length; i++) {
        var ok = false;
        for (var j = 0; j < dates[i][6].length; j++) {
            if (dates[i][6][j][0] === composer) {
                ok = true;
                break;
            }
        }
        if (ok) {
            div = document.createElement("div");
            div.setAttribute('class', 'date_elem');
            viewOnlyOneDate(div, dates[i], document, dates, months, works, org_disp, composer);
            compo_div.appendChild(div);
        }
    }
}


// Constant for Event
var DATE = 0
var TIME = 1
var PLAYER = 2
// 3 => direction
// 4 => player1
// 5 => player2
var PROGRAMME = 6;
var CITY = 7;
var PLACE = 8;
var TYPE = 9;

// Constant for programme
var AUTHOR = 0;
var WORK = 1; 

function viewOnlyOneDate(div, date, document, dates, months, works, org_disp, highlight_composer) {
    
    var p = document.createElement("p");
    var span = document.createElement('span');
    span.setAttribute('class', 'date');
    span.textContent = date[DATE].split('/')[0];
    p.appendChild(span);

    span = document.createElement('span');
    span.setAttribute('class', 'month');
    span.textContent = months[date[DATE].split('/')[1]];
    p.appendChild(span);
    
    span = document.createElement('span');
    span.setAttribute('class', 'year');
    span.textContent = (date[DATE].split('/')[2]).substring(2,4);
    p.appendChild(span);
    
    span = document.createElement('span');
    span.setAttribute('class', 'space_left icon clock mini');
    span.textContent = date[TIME];
    p.appendChild(span);
    span = document.createElement('span');
    span.setAttribute('class', 'space_left icon home mini');
    span.textContent = date[PLACE];
    p.appendChild(span);

    var p2 = document.createElement("p");
    span = document.createElement('span');
    span.textContent = date[TYPE];
    p2.appendChild(span);
    span = document.createElement('span');
    span.setAttribute('class', 'space_left icon star');
    span.textContent = org_disp[date[PLAYER]];
    p2.appendChild(span);

    var br = document.createElement('br');
    p.appendChild(br);

    var ol = document.createElement('ol');
    ol.setAttribute('class', 'custom-counter');
    
    for (var j = 0; j < date[PROGRAMME].length; j++) {
        var li = document.createElement('li');
        if (date[TYPE] == 'Concert' || (date[TYPE] == 'Ballet' && date[PROGRAMME].length > 1)) { // Pour les ballets avec différentes pièces
            li.setAttribute('class', 'x');
        }

        var author = date[PROGRAMME][j][AUTHOR];
        var opus = date[PROGRAMME][j][WORK];
        
        var opus_title = works[author][opus];
        var author_short = works[author].name;

        if (date[PROGRAMME][j].length === 3) { // Pour les ballets sur une musique de 
            span = document.createElement('span');
            span.textContent =  date[PROGRAMME][j][2] + ' sur la musique de ';
            li.appendChild(span);
        }

        span = document.createElement('span');
        span.setAttribute('class', 'author');
        span.textContent = author_short;
        if (author == highlight_composer) {
            span.setAttribute('class', 'author_hightlighted');
        }
        li.appendChild(span);

        span = document.createElement('span');
        span.textContent = ' : ' + opus_title;
        li.appendChild(span);
        ol.appendChild(li);
    }
    
    div.appendChild(p);
    div.appendChild(p2);
    div.appendChild(ol);
}

function viewAllDates(viewdate, document, dates, months, works, org_disp) {
    var main_list = document.getElementById("main_list");
    // Nettoyage
    while (main_list.firstChild) {
        main_list.removeChild(main_list.firstChild);
    }
    
    var params = getParameters(document);
    
    var div = document.createElement("div");
    div.setAttribute('class', 'date_nav');
    var m = viewdate.getMonth();
    var mx = { 0 : 'Janvier', 1 : 'Février', 2 : 'Mars', 3 : 'Avril', 4 : 'Mai', 5 : 'Juin', 6 : 'Juillet', 7 : 'Août', 8 : 'Septembre', 9 : 'Octobre', 10 : 'Novembre', 11 : 'Décembre'};
    
    var space = document.createElement('span');
    space.setAttribute('class', 'space_right');
    var aa = document.createElement('a');
    aa.setAttribute('class', 'button previous');
    aa.setAttribute('onclick', 'controlPrevDate()');
    aa.innerHTML = 'préc.';
    space.appendChild(aa);
    div.appendChild(space);
    
    space = document.createElement('span');
    //aa = document.createElement('a');
    //aa.setAttribute('class', 'button');
    //aa.textContent = mx[m] + ' ' + String(viewdate.getFullYear()).slice(2);
    //space.appendChild(aa);
    space.setAttribute('class', 'button_false');
    space.textContent = mx[m] + ' ' + String(viewdate.getFullYear()).slice(2);
    div.appendChild(space);
    
    space = document.createElement('span');
    space.setAttribute('class', 'space_left');
    aa = document.createElement('a');
    aa.setAttribute('class', 'button next');
    aa.setAttribute('onclick', 'controlNextDate()');
    aa.innerHTML = 'suiv.';
    space.appendChild(aa);
    div.appendChild(space);
    
    main_list.appendChild(div);
    
    var nb_dates = 0;
    
    for (var i = 0; i < dates.length; i++) {
        // Check Ville
        var city = dates[i][7];
        if (!params.city_tlse && city === 'Toulouse') {
            continue;
        }
        if (!params.city_bdx && city === 'Bordeaux') {
            continue;
        }
        // Check Date Over
        var d = dates[i][0];
        var tab = d.split('/');
        if (!params.date_over) {
            var dNow = new Date();
            var dDate = Date.parse(tab[1] + '/' + tab[0] + '/' + tab[2]);
            if (dDate < dNow) {
                continue;
            }
        }
        // Check Orchestra
        if (!params.orch_onct && dates[i][2] === 'ONCT') {
            continue;
        }
        if (!params.orch_onba && dates[i][2] === 'ONBA') {
            continue;
        }
        if (!params.par_trou_bc && dates[i][2] === 'BC') {
            continue;
        }
        if (!params.par_trou_tc && dates[i][2] === 'TC') {
            continue;
        }
        // Check Type
        if (!params.type_concert && dates[i][9] == 'Concert') {
            continue;
        }
        if (!params.type_opera && dates[i][9] == 'Opéra') {
            continue;
        }
        if (!params.type_ballet && dates[i][9] == 'Ballet') {
            continue;
        }
        // Check Date for Month
        if (parseInt(tab[1], 10) !== (viewdate.getMonth() + 1) || parseInt(tab[2], 10) !== (viewdate.getFullYear())) {
            continue;
        }
        // If all is good
        nb_dates++;
         
        var mega_div = document.createElement('div');
        mega_div.setAttribute('class', 'date_elem');
        
        viewOnlyOneDate(mega_div, dates[i], document, dates, months, works, org_disp, null);
        main_list.appendChild(mega_div);
    }
    
    if (nb_dates === 0) {
        var nothing = document.createElement('div');
        nothing.setAttribute('class', 'no_date');
        var nothing_txt = document.createElement('span');
        nothing_txt.textContent = 'Pas de concerts ce mois-ci pour les paramètres sélectionnés. ';
        // debug
        //if (viewdate.getMonth() === 8) {
        //    for (var ii = 0; ii < dates.length; ii++) {
        //        var dd = dates[ii][0];
        //        var ttab = dd.split('/');
        //        var s = "dates : " + dd + " tab[1] : " + ttab[1] + " parseInt(tab[1]) : " + parseInt(ttab[1], 10).toString() + " viewdate.getMonth() : " + viewdate.getMonth().toString() + " viewdate.getMonth() + 1 : " + (viewdate.getMonth()+1).toString() + " test : " + (parseInt(ttab[1], 10) === viewdate.getMonth()+1);
        //        nothing_txt.textContent = s;
        //    }
        //}
        // end debug
           
        nothing.appendChild(nothing_txt);
        
        var nothing_lnk = document.createElement('span');
        var change_lnk = document.createElement('a');
        change_lnk.setAttribute('href', '#tab2');
        change_lnk.setAttribute('onclick', '$.afui.clearHistory()');
        change_lnk.textContent = 'Changer les paramètres.';
        nothing_lnk.appendChild(change_lnk);
        nothing.appendChild(nothing_lnk);
        
        main_list.appendChild(nothing);
    }
}