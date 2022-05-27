console.log("alolo")
var f = document.createElement("form");
f.setAttribute('id', "form");

var i = document.createElement("input"); //input element, text
i.setAttribute('type', "text");
i.setAttribute('name', "name");

var s = document.createElement("input"); //input element, Submit button
s.setAttribute('type', "submit");
s.setAttribute('value', "Namae?");

f.appendChild(i);
f.appendChild(s);

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function sendData() {

    let data = {
        "name": i.value
    }
    fetch("/joinLobby", {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTD-8",
        }
    }).then((res) => res.json())
        .then((data) => {
            document.cookie.clear
            setCookie("room", data.room, 365)
            setCookie("playerID", data.playerID, 365)
            setCookie("playerName", data.playerName, 365)
            setCookie("colour", data.colour, 365)
            setCookie("isReady", data.isReady, 365)
            window.location.href = window.location.href + "game"
        });

}


f.addEventListener("submit", function (event) {
    event.preventDefault();

    sendData();
});



document.getElementById("app").appendChild(f)


