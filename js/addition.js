function go_table() {
    if (arguments.length < 1) {
        console.log("None");
        location.href = "Tables.html?table=" + "None";
    } else {
        console.log(arguments[0]);
        location.href = "Tables.html?table=" + arguments[0];
    }
}

function go_detail() {
    //argu[0]:id, argu[1]:table
    if (arguments.length < 1) {
        console.log("None");
        location.href = "detail.html?id=" + "None";
    } else {
        console.log(arguments[0]);
        location.href = "detail.html?id=" + arguments[0] + "&table=" + arguments[1];
    }
}


function nullDialog() {
    var name = document.getElementById("dialogName")
    var detailBtn = document.getElementById("detailBtn")
    var content = document.getElementById("dialogContents")
    console.log("None");
    content.innerHTML = "None"
    name.innerText = "None"
    detailBtn.addEventListener("click", function() { location.href = "detail.html?id=None"; })
}

function viewDialog() {
    //arg0=id
    if (arguments.length < 1) nullDialog()
    else {
        var name = document.getElementById("dialogName")
        var detailBtn = document.getElementById("detailBtn")
        var content = document.getElementById("dialogContents")
        var req = new XMLHttpRequest()
        var id = arguments[0]
        var table = arguments[1]
        req.open("GET", "http://localhost:8080/api/info/" + table + "/" + id);
        req.addEventListener("load", function() {
            if (req.status != 200) {
                nullDialog()
                return
            }
            detailBtn.addEventListener("click", function() {
                go_detail(id, table)
                    //location.href = "detail.html?id=\"" + id + "\"&table=\"" + table + "\"";
            })
            content.innerHTML = "<table id='diatable'></table>"
            console.log("GetList Get success!");
            var json = JSON.parse(req.responseText);
            console.log(json);
            var data = json.data;
            var curdata = data.data
            name.innerText = data.name;
            console.log(curdata)
            var _table = document.getElementById("diatable")
            _table.innerHTML += "<tr><th>start</th><td>" + data.start + "</td></tr>"
            if (data.end != null) _table.innerHTML += "<tr><th>end</th><td>" + data.end + "</td></tr>"
            if (curdata.Organizer != null) {
                var organizerString = "<tr><th>Organizer</th>";
                for (var i = 0; i < curdata.Organizer.length; i++) {
                    var currentOrganizer = curdata.Organizer[i];
                    organizerString += "<td><a href='" + currentOrganizer.link + "'>" + currentOrganizer.name + "</a></td>";
                }
                organizerString += "</tr>";
                _table.innerHTML += organizerString;
            }
            if (curdata.Links != null) _table.innerHTML += "<tr><th>Link</th><td><a href=\"" + curdata.Links.link + "\"'>WebPage</a></td></tr>"
            if (curdata['Number of Teams'] != null) _table.innerHTML += "<tr><th>Teams</th><td>" + curdata['Number of Teams'] + "</td></tr>"
            if (curdata['Prize Pool'] != null) _table.innerHTML += "<tr><th>Prize_Pool</th><td>" + data['Prize Pool'] + "</td></tr>"
            else if (curdata.Prize != null) _table.innerHTML += "<tr><th>Prize</th><td>" + curdata['Prize'] + "</td></tr>"
            if (curdata.Region != null) _table.innerHTML += "<tr><th>Region</th><td>" + curdata.Region + "</td></tr>"
            if (curdata.Type != null) _table.innerHTML += "<tr><th>Type</th><td>" + curdata.Type + "</td></tr>"
            if (curdata.Tier != null) _table.innerHTML += "<tr><th>Tier</th><td>" + curdata.Tier + "</td></tr>"
            if (curdata.Streams != null) {
                var StreamStr = "<tr><th>Steams</th>";
                for (var i = 0; i < curdata.Streams.length; i++) {
                    curstream = curdata.Streams[i];
                    StreamStr += "<td><a href=\"" + curstream.link + "\">" + curstream.name + "</a></td>"
                }
                _table.innerHTML += StreamStr + "</tr>";
            }
            if (curdata.Schedule != null) {
                var schStr = "<table id='sch'  class='ssch' style=' display:none'border = 1><tr><th colspan = 2>schedule</th></tr>"
                for (var i = 0; i < curdata.Schedule.length; i++) {
                    curSchedule = curdata.Schedule[i]
                    schStr += "<tr><td>" + curSchedule[0] + "</td><td>" + curSchedule[1] + "</td></tr>"
                }
                schStr += "</table>";
                content.innerHTML += "<span>Schedule : </span> "
                content.innerHTML += "<span style='' id='show'onclick=\"document.getElementById('sch').style.display='';document.getElementById('hide').style=' '; document.getElementById('show').style.display='none';\"><a href='javascript:;'>Show</a></span>"
                content.innerHTML += "<span style='display:none' id='hide'onclick=\"document.getElementById('sch').style.display='none';document.getElementById('show').style=' '; document.getElementById('hide').style.display='none';\"><a href='javascript:;'>Hide</a></span><br>"
                content.innerHTML += schStr
            }

        });
        req.send(null);
    }
    $('#modalDialog').modal('show')

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

function get_detail(table, id) {
    var req = new XMLHttpRequest()
    req.open("GET", "http://localhost:8080/api/info/" + table + "/" + id);
    req.addEventListener("load", function() {
        if (req.status === 200) {
            console.log("GetList Get success!");
            var json = JSON.parse(req.responseText);
            console.log(json);
            var data = json.data;
            writedata(data);
        } else {
            writedata();
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