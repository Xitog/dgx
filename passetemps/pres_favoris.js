function main()
{
    let div = document.getElementById("trees");
    if (div === null)
    {
        alert("No div 'trees' found!");
    }
    getData("https://xitog.github.io/dgx/passetemps/favoris.json", callback);
}

function getData(url, callback)
{
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = function()
    {
        let status = xhr.status;
        callback(status, xhr.response);
    };
    xhr.send();
};

function callback(status, response)
{
    class_by('t1', response, 'genre');
    class_by('t2', response, 'author');
    class_by('t3', response, 'year');
}

function getProperty(code, type, property, data)
{
    if (data.hasOwnProperty(type) && data[type].hasOwnProperty(code) && data[type][code].hasOwnProperty(property))
    {
        return data[type][code][property];
    } else {
        return code;
    }
}

function class_by(target, data, criterion1, criterion2 = null)
{
    //console.log('class by: ' + criterion)
    // Classify
    let values = {};
    for (let song of data['titles'])
    {
        if (!values.hasOwnProperty(song[criterion1]))
        {
            values[song[criterion1]] = [];
        }
        values[song[criterion1]].push(song);
    }
    if (criterion2 !== null)
    {
        //for (let val of Object.keys(values).sort())
        //{
        //
        //}
    }
    // Display
    let tree = document.getElementById(target);
    // Order
    let values_names = {};
    for (let val of Object.keys(values))
    {
        let o = getProperty(val, criterion1 + "s", "name", data);
        values_names[o] = val;
    }
    for (let name of Object.keys(values_names).sort())
    {
        let key = values_names[name];
        // <b>Auteur</b> (naissance-mort) (code iso 2 nationalité)
        let li = document.createElement("li");
        li.setAttribute('id', key);
        let bt = document.createElement("button");
        bt.setAttribute('class', 'tree');
        bt.setAttribute('id', 'bt' + key);
        bt.setAttribute('type', 'button');
        bt.setAttribute('onclick', "set_visible('bt" + key + "')");
        bt.innerText = '-';
        li.appendChild(bt);
        let span = document.createElement("span");
        span.innerText = ' ' + getProperty(key, criterion1 + "s", "name", data) + " (" + values[key].length + ")";
        li.appendChild(span);
        let ul = document.createElement("ul");
        ul.setAttribute('class', 'sub');
        li.appendChild(ul);
        for (let song of values[key])
        {
            let lis = document.createElement("li");
            if (song["title"] !== "<album>")
            {
                let txt = song["title"];
                if (song["work" !== ""])
                {
                    txt += " from " + song["work"];
                }
                lis.innerText = txt;
            } else {
                lis.innerText = song["work"];
            }
            lis.innerText += " (" + song["year"] + ")";
            if (criterion1 !== 'author')
            {
                lis.innerText += " - " + getProperty(song["author"], "authors", "name", data);
            }
            ul.appendChild(lis);
        }
        tree.appendChild(li);
    }
}

function set_visible(button)
{
    let bt = document.getElementById(button);
    let sub = bt.parentNode.getElementsByClassName("sub")[0];
    sub.hidden = !sub.hidden;
    if (sub.hidden)
    {
        bt.textContent = '+';
    }
    else
    {
        bt.textContent = '-';
    }
}

function show_all()
{
    apply_all(false);
}

function hide_all()
{
    apply_all(true);
}

function apply_all(boolean)
{
    let trees = document.getElementById("trees");
    for (let sub of trees.getElementsByClassName("sub"))
    {
        sub.hidden = boolean;
        if (sub.hidden)
        {
            sub.parentNode.getElementsByTagName("button")[0].textContent = "+";
        }
        else
        {
            sub.parentNode.getElementsByTagName("button")[0].textContent = "-";
        }
    }
}