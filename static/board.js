const playerBox = document.getElementById("players")
const board = document.getElementById("board")
const diceBox = document.getElementById("dice")
const readyButton = document.getElementById("readyButton")
const timer = document.getElementById("timer")
const msg = new SpeechSynthesisUtterance();
playerBox.style.position = "absolute"
playerBox.style.left = "0px"
playerBox.style.top = "0px"
playerBox.style.width = "100%"
playerBox.style.height = "10%"
playerBox.style.background = "grey"
let iAmTheWinner = false
let playerReady = false
let diceValue = 0
let bonusValue = 0
let moves = false
let ifDiced = false
let tabOfPlayers = []
let boardTab = []
let emptySlots = []
let pawnTab = [
    { "number": 0, "top": 200, "left": 0 },
    { "number": 1, "top": 200, "left": 50 },
    { "number": 2, "top": 200, "left": 100 },
    { "number": 3, "top": 200, "left": 150 },
    { "number": 4, "top": 200, "left": 200 },
    { "number": 5, "top": 150, "left": 200 },
    { "number": 6, "top": 100, "left": 200 },
    { "number": 7, "top": 50, "left": 200 },
    { "number": 8, "top": 0, "left": 200 },
    { "number": 9, "top": 0, "left": 250 },
    { "number": 10, "top": 0, "left": 300 },
    { "number": 11, "top": 50, "left": 300 },
    { "number": 12, "top": 100, "left": 300 },
    { "number": 13, "top": 150, "left": 300 },
    { "number": 14, "top": 200, "left": 300 },
    { "number": 15, "top": 200, "left": 350 },
    { "number": 16, "top": 200, "left": 400 },
    { "number": 17, "top": 200, "left": 450 },
    { "number": 18, "top": 200, "left": 500 },
    { "number": 19, "top": 250, "left": 500 },
    { "number": 20, "top": 300, "left": 500 },
    { "number": 21, "top": 300, "left": 450 },
    { "number": 22, "top": 300, "left": 400 },
    { "number": 23, "top": 300, "left": 350 },
    { "number": 24, "top": 300, "left": 300 },
    { "number": 25, "top": 350, "left": 300 },
    { "number": 26, "top": 400, "left": 300 },
    { "number": 27, "top": 450, "left": 300 },
    { "number": 28, "top": 500, "left": 300 },
    { "number": 29, "top": 500, "left": 250 },
    { "number": 30, "top": 500, "left": 200 },
    { "number": 31, "top": 450, "left": 200 },
    { "number": 32, "top": 400, "left": 200 },
    { "number": 33, "top": 350, "left": 200 },
    { "number": 34, "top": 300, "left": 200 },
    { "number": 35, "top": 300, "left": 150 },
    { "number": 36, "top": 300, "left": 100 },
    { "number": 37, "top": 300, "left": 50 },
    { "number": 38, "top": 300, "left": 0 },
    { "number": 39, "top": 250, "left": 0 },
]
let myPawns = []
let room = {
    "room": getCookie("room")
}
let player = {
    "playerID": getCookie("playerID")
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startEndgame() {
    fetch("/wonTime", {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify([room, player]),
        headers: {
            "Content-type": "application/json; charset=UTD-8",
        }
    }).then((res) => res.json())
        .then((data) => {
            //console.log()
        });
    if (iAmTheWinner == false) {
        iAmTheWinner = true
        alert("Wygrałeś!!!")
        fetch("/won", {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify([room, player]),
            headers: {
                "Content-type": "application/json; charset=UTD-8",
            }
        }).then((res) => res.json())
            .then((data) => {
                //console.log()
            });
    }
}

function dicing() {

    if (getCookie("myMove") == "true" && ifDiced == false) {

        ifDiced = true
        diceValue = getRandomInt(1, 6)
        moves = true
        diceBox.style.backgroundImage = `url(/static/${diceValue}.png)`;
        diceBox.style.backgroundSize = "98% 98%";
        let speak = new Speach(diceValue)
        speak.speak()
    }
    // let roll = getRandomInt(1, 6)
    // if (roll != 6) {
    //     diceValue = roll + bonusValue
    //     bonusValue = 0
    //     console.log("dice")
    //     console.log(getCookie("myMove"))
    //     if (getCookie("myMove") == "true" && ifDiced == false) {
    //         console.log("dice2")
    //         ifDiced = true

    //         moves = true
    //         console.log(getCookie("myMove"))

    //         diceBox.style.backgroundImage = `url(/static/${roll}.png)`;
    //         diceBox.style.backgroundSize = "98% 98%";
    //     }
    // }
    // else {
    //     bonusValue = bonusValue + roll
    //     diceBox.style.backgroundImage = `url(/static/${roll}.png)`;
    //     diceBox.style.backgroundSize = "98% 98%";
    // }
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

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

var time = new Date().getTime() / 1000;
startFetchingTime()
function startFetchingTime() {
    fetchTimeInterval = setInterval(fetchTime, 10);
}
function fetchTime() {
    let timeNow = new Date().getTime() / 1000;
    if (timeNow >= (time + 1)) {
        time = timeNow
        fetch("/time", {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify(room),
            headers: {
                "Content-type": "application/json; charset=UTD-8",
            }
        }).then((res) => res.json())
            .then((data) => {

                timer.innerText = `${data.time}`
                if (data.time == 2 && getCookie("myMove") == "true" && ifDiced == false) {

                }
            });
    }
}


fetchingPlayers()
function fetchingPlayers() {
    board.id = getCookie("colour")
    fetchPlayersInterval = setInterval(fetchPlayers, 2000);
}
function fetchPlayers() {
    fetch("/database", {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(room),
        headers: {
            "Content-type": "application/json; charset=UTD-8",
        }
    }).then((res) => res.json())
        .then((data) => {
            tabOfPlayers = data[0]
            //console.log(tabOfPlayers)
            createPlayerBar(tabOfPlayers)
        });
}

function createPlayerBar(players) {
    playerBox.innerHTML = ""
    for (let i = 0; i < players.length; i++) {
        let name = document.createElement("div")
        name.className = "name"
        name.innerText = players[i].playerName
        let ready = document.createElement("div")
        ready.className = "ready"
        if (players[i].isReady == true) {
            ready.innerText = `Ready`
        }
        else if (players[i].isReady == false) {
            ready.innerText = `Not Ready`
        }


        let div = document.createElement("div")
        div.className = "player"
        div.id = `p${i}`
        div.style.left = `${i * 25}%`
        div.style.background = players[i].colour
        playerBox.appendChild(div)
        div.appendChild(ready)
        div.appendChild(name)
    }
    if (players[0].gameStarted) {
        var paras = document.getElementsByClassName('ready');
        while (paras[0]) {
            paras[0].parentNode.removeChild(paras[0]);
        }
        clearInterval(fetchPlayersInterval)
        readyButton.remove()
        fetchingGamestate()
    }
}


function fetchingGamestate() {
    board.id = getCookie("colour")
    fetchGameStateInterval = setInterval(fetchGamestate, 1000);
}
function fetchGamestate() {
    fetch("/database", {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(room),
        headers: {
            "Content-type": "application/json; charset=UTD-8",
        }
    }).then((res) => res.json())
        .then((data) => {
            tabOfPlayers = data[0]
            // if (data[1].time == 1) {
            //     window.location.reload(true)
            // }
            timer.innerText = `${data[1].time}`
            //console.log(tabOfPlayers)
            fillBoard(tabOfPlayers)
        });
}

function fillBoard(players) {

    for (let i = 0; i < players.length; i++) {
        if (players[i].myMove == true) {
            timer.style.backgroundColor = `${players[i].colour}`
        }

        if (players[i].playerID == getCookie("playerID")) {
            setCookie("myMove", players[i].myMove, 365)

            emptySlots = players[i].endGoal
            //ifDiced = players[i].iMoved
            if (players[i].myMove == false) {
                ifDiced = false
            }
        }
        let moveHelper = document.createElement("div")
        moveHelper.className = "ready"
        if (players[i].iWon == true) {
            moveHelper.innerText = `I WON!!!`
        }
        else {
            if (players[i].myMove == true) {
                moveHelper.innerText = `My Move!`
            }
            else if (players[i].myMove == false) {
                moveHelper.innerText = `Not My Move!`
            }
        }
        let name = document.createElement("div")
        name.className = "name"
        name.innerText = players[i].playerName
        let div = document.getElementsByClassName('player')
        div[i].innerHTML = ""
        div[i].appendChild(moveHelper)
        div[i].appendChild(name)
    }
    let countEndgame = 0
    for (let i = 0; i < emptySlots.length; i++) {

        if (emptySlots[i] != 0) {

            countEndgame++
        }
    }
    if (countEndgame == 4) {

        startEndgame()
    }
    spawnPawns(players)



}

function spawnPawns(players) {
    board.innerHTML = ""
    myPawns = []
    for (let i = 0; i < players.length; i++) {

        for (let k = 0; k < 4; k++) {
            let pion = new Pawn(players[i].pawns[k], k, players[i].pawnDistance[k], players[i].colour)
            pion.spawn()
            if (players[i].colour == getCookie("colour")) {
                pion.isMine()
                myPawns.push(pion)
            }
        }
    }
}

function iAmReady() {
    if (playerReady == false) {
        readyButton.innerText = "Click me if you really aren't ready (:"
        playerReady = true
        fetch("/changeReady", {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify([player, room]),
            headers: {
                "Content-type": "application/json; charset=UTD-8",
            }
        }).then((res) => res.json())
            .then((data) => {
                //console.log()
            });
    }
    else if (playerReady == true) {
        readyButton.innerText = " Click me when you feel ready!"
        playerReady = false
        fetch("/changeNotReady", {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify([player, room]),
            headers: {
                "Content-type": "application/json; charset=UTD-8",
            }
        }).then((res) => res.json())
            .then((data) => {
                //console.log()
            });
    }
}
