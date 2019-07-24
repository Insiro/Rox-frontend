function go_table() {
    if (arguments.length < 1) {
        console.log("None");
        location.href = "Tables.html?table=" + "None";
    } else {
        console.log(arguments[0]);
        location.href = "Tables.html?table=" + arguments[0];
    }
}

function getGameList(theGame, length) {
    var req = new XMLHttpRequest()
    req.open("GET", "http://localhost:8080/api/list/" + theGame + "/" + length);
    req.addEventListener("load", function() {
        if (req.status === 200) {
            console.log("GetList Get success!");
            var json = JSON.parse(req.responseText);
            console.log(json);
            var data = json.data;
            writeList(theGame, data);
        } else {
            writeList();
            console.error("NONE");
        }
    });
    req.send(null);
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    return null;
}