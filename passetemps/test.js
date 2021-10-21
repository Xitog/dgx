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
    console.log(status);
    console.log(response);
    class_by(response, 'class');
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
    // Classify
    let genres = {};
    for (let song of data['titles'])
    {
        if (!genres.hasOwnProperty(song[criterion]))
        {
            genres[song[criterion]] = [];
        }
        genres[song[criterion]].push(song);
    }
    // Display
    let tree = document.getElementById("tree");
    console.log(genres);
    for (let genre of Object.keys(genres))
    {
        let li = document.createElement("li");
        console.log(getProperty(genre, criterion, "name", data));
        li.innerText = getProperty(genre, criterion, "name", data);
        let ul = document.createElement("ul");
        li.appendChild(ul);
        for (let song of genres[genre])
        {
            let lis = document.createElement("li");
            if (song["title"] !== "<album>")
            {
                lis.innerText = song["title"];
            } else {
                lis.innerText = song["work"];
            }
            lis.innerText += " (" + song["year"] + ")";
            lis.innerText += " - " + getProperty(song["author"], "authors", "name", data);
            ul.appendChild(lis);
        }
        tree.appendChild(li);
    }
}

function main()
{
    getData("https://xitog.github.io/dgx/passetemps/favoris.json", callback);
}
