function get_text(id) {
    return textes[id];
}

function validate(perso, condition) {
    if (perso === null) {
        alert('Perso is null.');
        return null;
    }
    if (condition === null) {
        return true;
    }
    let splitted = condition.split(' ');
    let car = splitted[0];
    let sign = splitted[1];
    let val = splitted[2];
    let tst = null;
    if (car === 'intelligence') {
        tst = perso.intelligence;
    } else if (car === 'charisme') {
        tst = perso.charisme;
    } else {
        alert('Unknown attribute: ' + car);
    }
    val = parseInt(val);
    if (sign === '==') {
        return tst === val;
    } else if (sign === '!=') {
        return tst !== val;
    } else if (sign === '>=') {
        return tst >= val;
    } else if (sign === '<=') {
        return tst <= val;
    } else if (sign === '>') {
        return tst > val;
    } else if (sign === '<') {
        return tst < val;
    } else {
        alert('Unknown sign: ' + sign);
    }
}

function get_suite(perso, embranchements) {
    if (perso === null) {
        alert('Perso is null.');
        return null;
    }
    if (embranchements === null) {
        alert('Impossible to do branching: no branching defined.');
        return null;
    }
    for (let branch of embranchements) {
        if (branch.condition === null) {
            return branch.suite;
        } else {
            if (validate(perso, branch.condition)) {
                return branch.suite;
            }
        }
    }
    alert('No suitable branching found.');
    return null;
}

function start(p) {
    var perso = {
        'intelligence' : parseInt(document.getElementById("int").value),
        'charisme' : parseInt(document.getElementById("chr").value)
    };
    
    var entry = document.getElementById("entry");
    if (entry === null) {
        alert('unable to retrieve entry point!');
        return;
    }
    node = structure[p];
    if (node === null) {
        alert('node : ' + p + ' unknown!');
        return;
    }
    entry.innerHTML = "";
    let txt = document.createElement('p');
    txt.innerHTML = get_text(node.texte);
    entry.appendChild(txt);
    let ul = document.createElement('ul');
    if (node.type === 'choice') {
        for (let opt of node.options) {
            let li = document.createElement('li');
            let ok = true;
            if (opt.condition !== null) {
                ok = validate(perso, opt.condition);
            }
            if (ok) {
                if (opt.condition !== null) {
                    let s = document.createElement('span');
                    s.innerHTML = '[' + opt.condition + '] ';
                    li.appendChild(s);
                }
                if (node.embranchements !== null) {
                    let suite = get_suite(perso, opt.embranchements);
                    let a = document.createElement('a');
                    a.setAttribute('onclick', "start('" + suite + "'); false;");
                    a.innerHTML = get_text(opt.texte);
                    li.appendChild(a);
                } else {
                    alert('Choices must always have branching!');
                }
                ul.appendChild(li);
            } else {
                let s = document.createElement('s');
                s.innerHTML = '[' + opt.condition + ']' + get_text(opt.texte);
                li.appendChild(s);
                ul.appendChild(li);
            }
        }
    } else { // simple node
        if (node.action !== null) {
            let act = document.createElement('p');
            act.innerHTML = '<i>' + node.action + '</i>';
            entry.appendChild(act);
        }
        let li = document.createElement('li');
        if (node.embranchements !== null) {
            let suite = get_suite(perso, node.embranchements);
            let a = document.createElement('a');
            a.setAttribute('onclick', "start('" + suite + "'); false;");
            a.innerHTML = 'Aller à ' + suite;
            li.appendChild(a);
        } else {
            li.innerHTML = '<a onclick="start(\'n1\'); false;">Recommencer dialogue</a>';
        }
        ul.appendChild(li);
    }
    entry.appendChild(ul);
}

// La structure du dialogue
structure = {
    'n1' : {
        'type' : 'choice',
        'texte' : '1',
        'options' : [
            {
                'condition' : null,
                'texte' : '2',
                'embranchements' : [
                    {
                        'condition' : 'charisme <= 14',
                        'suite' : 'n1-1'
                    },
                    {
                        'condition' : 'charisme > 14',
                        'suite' : 'n1-2'
                    }
                ]
            },
            {
                'condition' : null,
                'texte' : '3',
                'embranchements' : [
                    {
                        'condition' : null,
                        'suite': 'n1-3'
                    }
                ]
            },
            {
                'condition' : null,
                'texte' : '4',
                'embranchements' : [
                    {
                        'condition' : null,
                        'suite': 'n1-4'
                    }
                ]
            }
        ]
    },
    'n1-1' : {
        'type' : 'simple',
        'action' : null,
        'texte' : '5',
        'embranchements' : [
            {
                'condition' : null,
                'suite' : 'end'
            }
        ]
    },
    'n1-2' : {
        'type' : 'choice',
        'texte' : '6',
        'options' : [
            {
                'condition' : 'intelligence > 14',
                'texte' : '7',
                'embranchements' : [
                    {
                        'condition' : 'charisme > 16',
                        'suite' : 'n1-2-1'
                    },
                    {
                        'condition' : null,
                        'suite' : 'n1-2-2'
                    }
                ]
            },
            {
                'condition' : null,
                'texte' : '8',
                'embranchements' : [
                    {
                        'condition' : null,
                        'suite' : 'n1-2-3'
                    }
                ]
            }
        ]
    },
    'n1-2-1' : {
        'type' : 'simple',
        'action' : 'ajouter temple sur la carte',
        'texte' : '9',
        'embranchements' : [
            {
                'condition' : null,
                'suite' : 'end'
            }
        ]
    },
    'n1-2-2' : {
        'type' : 'simple',
        'action' : null,
        'texte' : '10',
        'embranchements' : [
            {
                'condition' : null,
                'suite' : 'end'
            }
        ]
    },
    'n1-2-3' : {
        'type' : 'simple',
        'action' : null,
        'texte' : '11',
        'embranchements' : [
            {
                'condition' : null,
                'suite' : 'end'
            }
        ]
    },
    'n1-3' : {
        'type' : 'choice',
        'texte' : '12',
        'options' : [
            {
                'condition' : null,
                'texte' : '13',
                'embranchements' : [
                    {
                        'condition' : null,
                        'suite' : 'n1-3-1'
                    }
                ]
            },
            {
                'condition' : null,
                'texte' : '14',
                'embranchements' : [
                    {
                        'condition' : null,
                        'suite' : 'n1-3-2'
                    }
                ]
            },
            {
                'condition' : null,
                'texte' : '15',
                'embranchements' : [
                    {
                        'condition' : null,
                        'suite' : 'end'
                    }
                ]
            }
        ]
    },
    'n1-3-1' : {
        'type' : 'simple',
        'action' : 'La quête "retrouver le bourgmestre" a été ajoutée à votre journal',
        'texte' : '16',
        'embranchements' : [
            {
                'condition' : null,
                'suite' : 'end'
            }
        ]
    },
    'n1-3-2' : {
        'type' : 'simple',
        'action' : 'La mention "le bourgmestre a disparu" a été ajoutée à votre journal.',
        'texte' : '17',
        'embranchements' : [
            {
                'condition' : null,
                'suite' : 'end'
            }
        ]
    },
    'n1-4' : {
        'type' : 'simple',
        'action' : 'La hutte du shaman a été ajoutée sur votre carte.',
        'texte' : '18',
        'embranchements' : [
            {
                'condition' : null,
                'suite' : 'end'
            }
        ]
    },
    'end' : {
        'type' : 'simple',
        'action' : null,
        'texte' : '19',
        'embranchements' : null
    }
}

// Tout le texte du dialogue
textes = {
     '1' : "Bonjour, étranger, que puis-je pour vous ?",
     '2' : "Je cherche Siriah Anrir, où puis la trouver ?",
     '3' : "Je désire rencontrer le chef du village.",
     '4' : "J'ai besoin de soin.",
     '5' : "Je ne connais pas cette Dame.",
     '6' : "Pourquoi voulez-vous rencontrer notre Dame ?",
     '7' : "(mensonge) On m'a vanté ses pouvoirs et j'aurais aimé être béni.",
     '8' : "Je suis ici pour enquêter sur ses agissements.",
     '9' : "Très bien, son temple est sous la maison communale.",
    '10' : "Elle viendra à vous quand vous serez prêt. Bonne journée.",
    '11' : "Je n'ai rien à vous dire. Bonne journée.",
    '12' : "La bourgmestre a disparu depuis trois nuits. Tout le village est très inquiet. Pourriez-vous nous aider à la retrouver ?",
    '13' : "Je vais voir ce que je peux faire.",
    '14' : "Je suis désolé mais je ne peux pas vous aider.",
    '15' : "(méprisant) Cela ne m'intéresse pas.",
    '16' : "Merci Messire !",
    '17' : "Cela ne fait rien. Bonne route étranger.",
    '18' : "Vous trouverez le shaman dans sa hutte, à la lisière des bois.",
    '19' : "Fin du dialogue."
}
