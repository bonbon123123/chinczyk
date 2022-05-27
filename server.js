var express = require('express');
var app = express();
const port = process.env.PORT || 8000;

var bodyParser = require('body-parser');
var Datastore = require('nedb')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

let colourBoard = ["red", "blue", "green", "yellow"]
let ID = 0
var room = 0
let startPawnPositions = ["start", "start", "start", "start"]
let pawnDistance = [0, 0, 0, 0]
let emptySlots = [0, 0, 0, 0]
let timeTable = []
var newTime = {}
function shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startTimer() {
    fetchPlayersInterval = setInterval(timer, 1000);
}
function addNewTime(room) {
    newTime = { room: room, time: 30 }
    timeTable.push(newTime)
}
function timer() {
    if (timeTable[0] != undefined) {
        for (let myTimes = 0; myTimes < timeTable.length; myTimes++) {
            if (timeTable[myTimes].time == 0) {
                timeTable[myTimes].time = 20
                coll.find({ room: timeTable[myTimes].room }, function (err, docs) {
                    //console.log(docs)
                    for (let i = 0; i < docs.length; i++) {
                        if (docs[i].myMove == true) {
                            if (docs[i].iMoved == false) {
                                let newPositon = getRandomInt(1, 6)
                                for (let k = 0; k < docs[i].pawns.length; k++) {

                                    //console.log("/a/a/a/a/a/a" + docs[i].pawns[k])
                                    if (docs[i].pawnDistance[k] != 39 && newPositon == 6 || newPositon == 1) {
                                        if (docs[i].pawns[k] == "start") {

                                            if (docs[i].colour == "green") {
                                                docs[i].pawns[k] = 0
                                            }
                                            if (docs[i].colour == "yellow") {
                                                docs[i].pawns[k] = 10;
                                            }
                                            if (docs[i].colour == "red") {
                                                docs[i].pawns[k] = 20;
                                            }
                                            if (docs[i].colour == "blue") {
                                                docs[i].pawns[k] = 30;
                                            }
                                            break
                                        }
                                        else {

                                            if (docs[i].pawnDistance[k] < 39) {
                                                if (docs[i].pawns[k] + newPositon > 39) {
                                                    docs[i].pawns[k] = docs[i].pawns[k] + newPositon - 40
                                                }
                                                else {
                                                    docs[i].pawns[k] = docs[i].pawns[k] + newPositon
                                                }
                                                docs[i].pawnDistance[k] = docs[i].pawnDistance[k] + newPositon
                                                break
                                            }
                                            else if (docs[i].pawnDistance[k] > 39) {
                                                if (docs[i].pawns[k] - newPositon < 0) {
                                                    docs[i].pawns[k] = docs[i].pawns[k] - newPositon + 40
                                                }
                                                else {
                                                    docs[i].pawns[k] = docs[i].pawns[k] - newPositon
                                                }
                                                docs[i].pawnDistance[k] = docs[i].pawnDistance[k] - newPositon
                                                break
                                            }

                                        }
                                        //console.log("/a/a/a/a" + docs[i].pawns[k])

                                    }
                                    else if (docs[i].pawnDistance[k] == 39) {
                                        for (let k = 3; k >= 0; k--) {
                                            if (docs[i].endGoal[k] == 0) {
                                                if (newPositon == k + 1) {
                                                    docs[i].endGoal[k] = 1
                                                    docs[i].pawnDistance[k] = `end${k}`
                                                    docs[i].pawns[k] = `end${k}`
                                                }
                                            }
                                        }
                                        break
                                    }

                                }
                                //console.log(docs[i])
                                let playerRecord = docs[i]
                                coll.update({ _id: docs[i]._id }, { $set: playerRecord }, {}, (err, result) => {
                                    if (err) {
                                        callback(null, err);
                                        return;
                                    }
                                    else {
                                        //console.log("player amount status:", result)
                                    }
                                    coll.loadDatabase();
                                })
                            }

                            docs[i].myMove = false
                            if (i == docs.length - 1) {
                                docs[0].myMove = true
                                docs[0].iMoved = false
                            }
                            else {
                                docs[i + 1].myMove = true
                                docs[i + 1].iMoved = false
                            }
                            break
                        }
                    }


                    for (let i = 0; i < docs.length; i++) {
                        let playerRecord = docs[i]
                        coll.update({ _id: docs[i]._id }, { $set: playerRecord }, {}, (err, result) => {
                            if (err) {
                                callback(null, err);
                                return;
                            }
                            else {
                                //console.log("player amount status:", result)
                            }
                            coll.loadDatabase();
                        })
                    }


                });
            }
            timeTable[myTimes].time--
        }
    }
}



app.post('/time', (req, res) => {
    req.on("data", function (data) {
        let myData = JSON.parse(data)
        let timeSend
        if (timeTable[parseInt(myData.room)] != undefined) {
            for (let x = 0; x < timeTable.length; x++) {
                if (timeTable[x].room == parseInt(myData.room)) {
                    timeSend = { "time": timeTable[x].time }
                }
            }

        }
        else {
            timeSend = { "time": 30 }
        }
        res.end(JSON.stringify(timeSend));
    })

});

const coll = new Datastore({
    filename: __dirname + "/database.db",
    autoload: true
})

coll.remove({}, { multi: true }, function (err, numRemoved) {
    coll.loadDatabase(function (err) {
        // done
    });
});

app.use('/static', express.static(__dirname + '/static'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/static/" + "lobby.html");
});

app.get('/game', (req, res) => {
    res.sendFile(__dirname + "/static/" + "board.html");
});

app.post('/database', (req, res) => {
    var data = []
    req.on("data", function (room) {
        let myRoom = JSON.parse(room)
        let timeSend
        if (timeTable[parseInt(myRoom.room)] != undefined) {
            for (let x = 0; x < timeTable.length; x++) {
                if (timeTable[x].room == parseInt(myRoom.room)) {
                    timeSend = { "time": timeTable[x].time }
                }
            }

        }
        else {
            timeSend = { "time": 30 }
        }
        coll.find({ room: parseInt(myRoom.room) }, function (err, docs) {
            data = docs
            res.end(JSON.stringify([data, timeSend]));
        });
    })

});

app.post('/won', (req, res) => {
    req.on("data", function (data) {
        let myData = JSON.parse(data)
        //console.log(myData)
        coll.find({ room: parseInt(myData[1].room), playerID: parseInt(myData[0].playerID) }, function (err, docs) {
            //console.log(docs[0])
            docs[0].iWon = true
            let playerRecord = docs[0]
            //console.log(docs)
            coll.update({ room: parseInt(myData[1].room), playerID: parseInt(myData[0].playerID) }, { $set: playerRecord }, {}, (err, result) => {
                if (err) {
                    callback(null, err);
                    return;
                }
                else {
                    //console.log("player amount status:", result)
                }
                coll.loadDatabase();
            })
        })
    })
})

app.post('/wonTime', (req, res) => {
    req.on("data", function (data) {
        let myData = JSON.parse(data)
        //console.log(myData)
        timeTable[myData[1].room].time = 2
    })
})

app.post('/move', (req, res) => {
    req.on("data", function (data) {
        let myData = JSON.parse(data)
        timeTable[myData[1].room].time = 3
        //console.log(myData)
        coll.find({ room: parseInt(myData[1].room) }, function (err, docs) {
            for (let k = 0; k < docs.length; k++) {
                if (docs[k].playerID == myData[0].playerID) {
                    for (let i = 0; i < docs[0].pawns.length; i++) {
                        // console.log(myData[2][i].position)
                        // console.log(myData[2][i].distance)
                        docs[k].pawns[i] = myData[2][i].position
                        docs[k].pawnDistance[i] = myData[2][i].distance
                        docs[k].endGoal = myData[3]

                    }
                    docs[k].iMoved = true
                    let playerRecord = docs[k]

                    coll.update({ _id: docs[k]._id }, { $set: playerRecord }, {}, (err, result) => {
                        if (err) {
                            callback(null, err);
                            return;
                        }
                        else {
                            console.log("player amount status:", result)
                        }
                        coll.loadDatabase();
                    })
                }
                else if (docs[k].playerID != myData[0].playerID) {
                    for (let i = 0; i < docs[0].pawns.length; i++) {
                        // console.log(myData[2][i].position)
                        // console.log(myData[2][i].distance)
                        for (let x = 0; x < myData[2][i].length; x++) {
                            if (docs[k].pawns[i] == myData[2][x].position) {
                                docs[k].pawns[i] = "start"
                                docs[k].pawnDistance[i] = 0
                            }
                        }


                    }

                    let playerRecord = docs[k]

                    coll.update({ _id: docs[k]._id }, { $set: playerRecord }, {}, (err, result) => {
                        if (err) {
                            callback(null, err);
                            return;
                        }
                        else {
                            //console.log("player amount status:", result)
                        }
                        coll.loadDatabase();
                    })
                }
            }


        });
    })

});

app.post('/changeReady', (req, res) => {
    //console.log("docs")
    req.on("data", function (data) {
        let myData = JSON.parse(data)
        // console.log(myData[1])
        // console.log(myData[0])
        coll.find({ room: parseInt(myData[1].room), playerID: parseInt(myData[0].playerID) }, function (err, docs) {
            //console.log(docs[0])
            docs[0].isReady = true
            let playerRecord = docs[0]
            //console.log(docs)
            coll.update({ room: parseInt(myData[1].room), playerID: parseInt(myData[0].playerID) }, { $set: playerRecord }, {}, (err, result) => {
                if (err) {
                    callback(null, err);
                    return;
                }
                else {
                    //console.log("player amount status:", result)
                }
                coll.loadDatabase();
            })
        });
        coll.find({ room: parseInt(myData[1].room) }, function (err, docs) {
            //console.log(myData[1].room)
            let countReadyBois = 1
            for (let i = 0; i < docs.length; i++) {
                if (docs[i].isReady == true) {
                    countReadyBois++
                }
                //console.log(docs[i].isReady)
            }
            if (docs.length != 1 && countReadyBois == docs.length) {
                addNewTime(room)

                for (let i = 0; i < docs.length; i++) {
                    docs[0].myMove = true
                    docs[i].gameStarted = true
                    docs[i].isReady = "too late"
                    let playerRecord = docs[i]
                    // console.log("///////////////////////////////////////////////////" + i)
                    // console.log(docs[i]._id)
                    coll.update({ _id: docs[i]._id }, { $set: playerRecord }, {}, (err, result) => {
                        if (err) {
                            callback(null, err);
                            return;
                        }
                        else {
                            //console.log("player amount status:", result)
                        }
                        coll.loadDatabase();
                    })
                }

            }
        });
    })

});

app.post('/changeNotReady', (req, res) => {
    var data = []
    //console.log("docs")
    req.on("data", function (data) {
        let myData = JSON.parse(data)
        //console.log(myData)
        coll.find({ room: parseInt(myData[1].room), playerID: parseInt(myData[0].playerID) }, function (err, docs) {
            //console.log(docs[0])
            docs[0].isReady = false
            let playerRecord = docs[0]
            //console.log(docs)
            coll.update({ room: parseInt(myData[1].room), playerID: parseInt(myData[0].playerID) }, { $set: playerRecord }, {}, (err, result) => {
                if (err) {
                    callback(null, err);
                    return;
                }
                else {
                    //console.log("player amount status:", result)
                }
                coll.loadDatabase();
            })
        });
    })
});

app.post('/joinLobby', urlencodedParser, function (req, res) {
    if (ID == 4) {
        shuffle(colourBoard)
        room++
        ID = 0
    }

    req.on("data", function (data) {
        let myData = JSON.parse(data)

        let dataForDatabase = {
            room: room,
            playerID: ID,
            playerName: myData.name,
            colour: colourBoard[ID],
            isReady: false,
            pawns: startPawnPositions,
            pawnDistance: pawnDistance,
            endGoal: emptySlots,
            gameStarted: false,
            myMove: false,
            iMoved: false,
            iWon: false,
            autoload: true
        }
        ID++
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify(dataForDatabase));
        coll.insert(dataForDatabase, function (err, doc) {
        });
        //console.log(myData)
    })

})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
    shuffle(colourBoard)
    startTimer()
});

