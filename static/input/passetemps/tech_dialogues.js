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
    let info = { 'textes': [], 'suite': '' };
    for (let branch of embranchements) {
        if ((!Object.hasOwn(branch, 'condition') || branch.condition === null) || validate(perso, branch.condition)) {
            if (Object.hasOwn(branch, 'condition') && branch.condition !== null) {
                info.textes.push(`<b>[(success) ${branch.condition}]</b> &rarr; ${branch.suite}`);
            } else {
                info.textes.push(`<b>auto &rarr; ${branch.suite}</b>`);
            }
            info.suite = branch.suite;
            return info;
        } else {
            info.textes.push(`<s>[(failed) ${branch.condition}]</s> &rarr; ${branch.suite}`);
        }
    }
    alert('No suitable branching found.');
    return null;
}

function start(p) {
    let perso = {
        'intelligence': parseInt(document.getElementById("int").value),
        'charisme': parseInt(document.getElementById("chr").value)
    };
    let debug = document.getElementById("debug").checked;

    let entry = document.getElementById("entry");
    if (entry === null) {
        alert('unable to retrieve entry point!');
        return;
    }
    let node = structure[p];
    if (node === null) {
        alert('node : ' + p + ' unknown!');
        return;
    }
    entry.innerHTML = "";
    let txt = document.createElement('p');
    if (debug) {
        txt.innerHTML += "(" + p + ") : ";
    }
    txt.innerHTML += get_text(node.texte);
    entry.appendChild(txt);
    let ul = document.createElement('ul');
    if (node.type === 'choice') {
        for (let opt of node.options) {
            let li = document.createElement('li');
            let ok = true;
            if (Object.hasOwn(opt, 'condition') && opt.condition !== null) {
                ok = validate(perso, opt.condition);
            }
            if (ok) {
                if (Object.hasOwn(opt, 'condition') && opt.condition !== null) {
                    let s = document.createElement('span');
                    s.innerHTML = '[' + opt.condition + '] ';
                    li.appendChild(s);
                }
                if (node.embranchements !== null) {
                    let info = get_suite(perso, opt.embranchements);
                    let a = document.createElement('a');
                    a.setAttribute('onclick', "start('" + info.suite + "'); false;");
                    a.innerHTML = get_text(opt.texte);
                    li.appendChild(a);
                    if (debug)
                    {
                        let t = document.createElement('span');
                        t.innerHTML = ' ' + info.textes.join(', ');
                        li.appendChild(t);
                    }
                } else {
                    alert('Choices must always have branching!');
                }
                ul.appendChild(li);
            } else { // a condition is set and not validated
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
            let info = get_suite(perso, node.embranchements);
            let a = document.createElement('a');
            a.setAttribute('onclick', "start('" + info.suite + "'); false;");
            a.innerHTML = 'Aller à ' + info.suite;
            li.appendChild(a);
        } else {
            li.innerHTML = '<a onclick="start(\'n1\'); false;">Recommencer dialogue</a>';
        }
        ul.appendChild(li);
    }
    entry.appendChild(ul);
}

// La structure du dialogue
let structure = {
    'n1': {
        'type': 'choice',
        'texte': '1',
        'options': [
            {
                'texte': '2',
                'embranchements': [
                    {
                        'condition': 'charisme > 14',
                        'suite': 'n1-2'
                    },
                    {
                        'suite': 'n1-1'
                    }
                ]
            },
            {
                'texte': '3',
                'embranchements': [
                    {
                        'suite': 'n1-3'
                    }
                ]
            },
            {
                'texte': '4',
                'embranchements': [
                    {
                        'suite': 'n1-4'
                    }
                ]
            }
        ]
    },
    'n1-1': {
        'type': 'simple',
        'action': null,
        'texte': '5',
        'embranchements': [
            {
                'suite': 'end'
            }
        ]
    },
    'n1-2': {
        'type': 'choice',
        'texte': '6',
        'options': [
            {
                'condition': 'intelligence > 14',
                'texte': '7',
                'embranchements': [
                    {
                        'condition': 'charisme > 16',
                        'suite': 'n1-2-1'
                    },
                    {
                        'suite': 'n1-2-2'
                    }
                ]
            },
            {
                'texte': '8',
                'embranchements': [
                    {
                        'suite': 'n1-2-3'
                    }
                ]
            }
        ]
    },
    'n1-2-1': {
        'type': 'simple',
        'action': 'ajouter temple sur la carte',
        'texte': '9',
        'embranchements': [
            {
                'suite': 'end'
            }
        ]
    },
    'n1-2-2': {
        'type': 'simple',
        'action': null,
        'texte': '10',
        'embranchements': [
            {
                'suite': 'end'
            }
        ]
    },
    'n1-2-3': {
        'type': 'simple',
        'action': null,
        'texte': '11',
        'embranchements': [
            {
                'suite': 'end'
            }
        ]
    },
    'n1-3': {
        'type': 'choice',
        'texte': '12',
        'options': [
            {
                'texte': '13',
                'embranchements': [
                    {
                        'suite': 'n1-3-1'
                    }
                ]
            },
            {
                'texte': '14',
                'embranchements': [
                    {
                        'suite': 'n1-3-2'
                    }
                ]
            },
            {
                'texte': '15',
                'embranchements': [
                    {
                        'suite': 'end'
                    }
                ]
            }
        ]
    },
    'n1-3-1': {
        'type': 'simple',
        'action': 'La quête "retrouver le bourgmestre" a été ajoutée à votre journal',
        'texte': '16',
        'embranchements': [
            {
                'suite': 'end'
            }
        ]
    },
    'n1-3-2': {
        'type': 'simple',
        'action': 'La mention "le bourgmestre a disparu" a été ajoutée à votre journal.',
        'texte': '17',
        'embranchements': [
            {
                'suite': 'end'
            }
        ]
    },
    'n1-4': {
        'type': 'simple',
        'action': 'La hutte du shaman a été ajoutée sur votre carte.',
        'texte': '18',
        'embranchements': [
            {
                'suite': 'end'
            }
        ]
    },
    'end': {
        'type': 'simple',
        'action': null,
        'texte': '19',
        'embranchements': null
    }
}

// Tout le texte du dialogue
let textes = {
    '1': "Bonjour, étranger, que puis-je pour vous ?",
    '2': "Je cherche Siriah Anrir, où puis la trouver ?",
    '3': "Je désire rencontrer le chef du village.",
    '4': "J'ai besoin de soin.",
    '5': "Je ne connais pas cette Dame.",
    '6': "Pourquoi voulez-vous rencontrer notre Dame ?",
    '7': "(mensonge) On m'a vanté ses pouvoirs et j'aurais aimé être béni.",
    '8': "Je suis ici pour enquêter sur ses agissements.",
    '9': "Très bien, son temple est sous la maison communale.",
    '10': "Elle viendra à vous quand vous serez prêt. Bonne journée.",
    '11': "Je n'ai rien à vous dire. Bonne journée.",
    '12': "La bourgmestre a disparu depuis trois nuits. Tout le village est très inquiet. Pourriez-vous nous aider à la retrouver ?",
    '13': "Je vais voir ce que je peux faire.",
    '14': "Je suis désolé mais je ne peux pas vous aider.",
    '15': "(méprisant) Cela ne m'intéresse pas.",
    '16': "Merci Messire !",
    '17': "Cela ne fait rien. Bonne route étranger.",
    '18': "Vous trouverez le shaman dans sa hutte, à la lisière des bois.",
    '19': "Fin du dialogue."
}
