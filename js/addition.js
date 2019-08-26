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

function login() {
    var form = document.getElementByID('loginform').value;
    console.log(form)
    console.log(form.id)
    console.log(form.pxw)
    window.open(form + 'id :' + form.id)
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
                console.log('status error')
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
            console.log("curdata", curdata)
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

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        file = elmnt.getAttribute("include-html");
        if (file) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    elmnt.innerHTML = this.responseText;
                    elmnt.removeAttribute("include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            return;
        }
    }
}

function addFooter() {
    var footerdiv = document.getElementById("footer")
    var footerstr = "<div class=\"copyright text - center my - auto \"> <span > Copyright© Your Website 2019 </span> </div > "
    footerstr += ""
    footerdiv.innerHTML = footerstr
}



function reloadLoginState(loginBox) {
    loginXhttpRequest = new XMLHttpRequest();
    if (loginBox) {
        $('#Login').modal('hide');
    }

    loginXhttpRequest.open("GET", "php/isLoggedin.php");
    loginXhttpRequest.addEventListener("load", function() {
        var log_in_item = document.getElementById('logged_nav').style;
        var un_log_in_tem = document.getElementById('unlogged_nav').style;

        console.log(log_in_item, un_log_in_tem);

        json = JSON.parse(loginXhttpRequest.responseText);

        console.log(json);

        if (json.login) {
            console.log("login: id:" + json.id);
            log_in_item.display = 'none';
            un_log_in_tem.display = '';
        } else {
            console.log("logout");
            log_in_item.display = '';
            un_log_in_tem.display = 'none';
        }
    });

    loginXhttpRequest.send(null);
}



function loginRequest() {
    var id = document.getElementById('login_id').value;
    var pw = document.getElementById('login_pwd').value;

    var xhttp = new XMLHttpRequest();

    // Testing Code Only
    xhttp.open("POST", "php/makelogin.php");

    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
    xhttp.addEventListener("load", function() {
        parsedJson = JSON.parse(xhttp.responseText);

        if (parsedJson.success) {
            reloadLoginState(true);
        } else {
            console.error(parsedJson);
        }
    });

    xhttp.send("id=" + id + "&pwd=" + pw);
}

function logout() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "php/logout.php");

    xhttp.addEventListener("load", function() {
        reloadLoginState(false);
    });

    xhttp.send(null);

}