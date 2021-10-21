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
    //console.log(status);
    //console.log(response);
    class_by(response, 'genre');
    class_by(response, 'author');
    class_by(response, 'year');
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

function class_by(data, criterion)
{
    //console.log('class by: ' + criterion)
    // Classify
    let values = {};
    for (let song of data['titles'])
    {
        if (!values.hasOwnProperty(song[criterion]))
        {
            values[song[criterion]] = [];
        }
        values[song[criterion]].push(song);
    }
    // Display
    let tree = document.getElementById("tree");
    for (let val of Object.keys(values).sort())
    {

        // <b>Auteur</b> (naissance-mort) (code iso 2 nationalité)
        let li = document.createElement("li");
        li.setAttribute('id', val);
        //console.log(getProperty(genre, criterion + "s", "name", data));
        let bt = document.createElement("button");
        bt.setAttribute('class', 'tree');
        bt.setAttribute('id', 'bt' + val);
        bt.setAttribute('type', 'button');
        bt.setAttribute('onclick', "set_visible('bt" + val + "', '"+ val + "')");
        bt.innerText = '+';
        li.appendChild(bt);
        let span = document.createElement("span");
        span.innerText = getProperty(val, criterion + "s", "name", data) + " (" + values[val].length + ")";
        li.appendChild(span);
        let ul = document.createElement("ul");
        ul.setAttribute('class', 'sub');
        li.appendChild(ul);
        for (let song of values[val])
        {
            let lis = document.createElement("li");
            if (song["title"] !== "<album>")
            {
                lis.innerText = song["title"] + " from " + song["work"];
            } else {
                lis.innerText = song["work"];
            }
            lis.innerText += " (" + song["year"] + ")";
            if (criterion !== 'author')
            {
                lis.innerText += " - " + getProperty(song["author"], "authors", "name", data);
            }
            ul.appendChild(lis);
        }
        tree.appendChild(li);
    }
}

function main()
{
    getData("https://xitog.github.io/dgx/passetemps/favoris.json", callback);
}
