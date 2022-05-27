class Pawn {
    constructor(position, pawnIndex, distance, color) {
        this.position = position;
        this.pawnIndex = pawnIndex
        this.color = color
        this.onScreen
        this.distance = distance
    };
    spawn() {

        let block = document.createElement("div")
        block.className = "pawn"
        if (this.position == "start") {
            if (this.color == "green") {
                if (this.pawnIndex == 0) {
                    block.style.left = `${0}px`
                    block.style.top = `${0}px`
                }
                if (this.pawnIndex == 1) {
                    block.style.left = `${50}px`
                    block.style.top = `${0}px`
                }
                if (this.pawnIndex == 2) {
                    block.style.left = `${0}px`
                    block.style.top = `${50}px`
                }
                if (this.pawnIndex == 3) {
                    block.style.left = `${50}px`
                    block.style.top = `${50}px`
                }
            }
            if (this.color == "yellow") {
                if (this.pawnIndex == 0) {
                    block.style.left = `${500}px`
                    block.style.top = `${0}px`
                }
                if (this.pawnIndex == 1) {
                    block.style.left = `${450}px`
                    block.style.top = `${0}px`
                }
                if (this.pawnIndex == 2) {
                    block.style.left = `${500}px`
                    block.style.top = `${50}px`
                }
                if (this.pawnIndex == 3) {
                    block.style.left = `${450}px`
                    block.style.top = `${50}px`
                }
            }
            if (this.color == "red") {
                if (this.pawnIndex == 0) {
                    block.style.left = `${500}px`
                    block.style.top = `${450}px`
                }
                if (this.pawnIndex == 1) {
                    block.style.left = `${450}px`
                    block.style.top = `${450}px`
                }
                if (this.pawnIndex == 2) {
                    block.style.left = `${500}px`
                    block.style.top = `${500}px`
                }
                if (this.pawnIndex == 3) {
                    block.style.left = `${450}px`
                    block.style.top = `${500}px`
                }
            }
            if (this.color == "blue") {
                if (this.pawnIndex == 0) {
                    block.style.left = `${0}px`
                    block.style.top = `${450}px`
                }
                if (this.pawnIndex == 1) {
                    block.style.left = `${50}px`
                    block.style.top = `${450}px`
                }
                if (this.pawnIndex == 2) {
                    block.style.left = `${0}px`
                    block.style.top = `${500}px`
                }
                if (this.pawnIndex == 3) {
                    block.style.left = `${50}px`
                    block.style.top = `${500}px`
                }
            }
        }
        else if (this.position == "end0") {
            if (this.color == "green") {
                block.style.left = `${50}px`
                block.style.top = `${250}px`
            }
            if (this.color == "yellow") {
                block.style.left = `${250}px`
                block.style.top = `${50}px`
            }
            if (this.color == "red") {
                block.style.left = `${450}px`
                block.style.top = `${250}px`
            }
            if (this.color == "blue") {
                block.style.left = `${250}px`
                block.style.top = `${450}px`
            }
        }
        else if (this.position == "end1") {
            if (this.color == "green") {
                block.style.left = `${100}px`
                block.style.top = `${250}px`
            }
            if (this.color == "yellow") {
                block.style.left = `${250}px`
                block.style.top = `${100}px`
            }
            if (this.color == "red") {
                block.style.left = `${0}px`
                block.style.top = `${0}px`
            }
            if (this.color == "blue") {
                block.style.left = `${250}px`
                block.style.top = `${400}px`
            }
        }
        else if (this.position == "end2") {
            if (this.color == "green") {
                block.style.left = `${150}px`
                block.style.top = `${250}px`
            }
            if (this.color == "yellow") {
                block.style.left = `${250}px`
                block.style.top = `${150}px`
            }
            if (this.color == "red") {
                block.style.left = `${400}px`
                block.style.top = `${250}px`
            }
            if (this.color == "blue") {
                block.style.left = `${250}px`
                block.style.top = `${350}px`
            }
        }
        else if (this.position == "end3") {
            if (this.color == "green") {
                block.style.left = `${200}px`
                block.style.top = `${250}px`
            }
            if (this.color == "yellow") {
                block.style.left = `${250}px`
                block.style.top = `${200}px`
            }
            if (this.color == "red") {
                block.style.left = `${350}px`
                block.style.top = `${250}px`
            }
            if (this.color == "blue") {
                block.style.left = `${250}px`
                block.style.top = `${300}px`
            }
        }
        else {
            //console.log(this.position)
            block.style.left = `${pawnTab[this.position].left}px`
            block.style.top = `${pawnTab[this.position].top}px`
        }
        block.style.backgroundColor = `${this.color}`;
        block.id = this.pawnIndex
        this.onScreen = block
        board.append(block)
    }

    updateDatabase() {
        fetch("/move", {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify([player, room, myPawns, emptySlots]),
            headers: {
                "Content-type": "application/json; charset=UTD-8",
            }
        }).then((res) => res.json())
            .then((data) => {
                //console.log()
            });
    }

    startFromBase() {
        // console.log(4)
        // console.log(ifDiced)
        // console.log(moves)
        if (ifDiced == true && moves == true && diceValue == 6 || diceValue == 1) {
            moves = false

            //console.log(this.id)
            if (myPawns[this.id].color == "green") {
                myPawns[this.id].position = 0;
            }
            if (myPawns[this.id].color == "yellow") {
                myPawns[this.id].position = 10;
            }
            if (myPawns[this.id].color == "red") {
                myPawns[this.id].position = 20;
            }
            if (myPawns[this.id].color == "blue") {
                myPawns[this.id].position = 30;
            }
            //console.log(myPawns[this.id])
            myPawns[this.id].updateDatabase()
        }
    }


    move() {
        // console.log("move")
        // console.log(ifDiced)
        // console.log(moves)
        if (ifDiced == true && moves == true) {
            moves = false
            if (myPawns[this.id].distance != 39) {

                if (myPawns[this.id].distance < 39) {
                    if (myPawns[this.id].position + diceValue > 39) {
                        console.log(myPawns[this.id].position)
                        console.log(diceValue)
                        console.log(myPawns[this.id].position + diceValue - 39)
                        myPawns[this.id].position = myPawns[this.id].position + diceValue - 40
                    }
                    else {
                        myPawns[this.id].position = myPawns[this.id].position + diceValue
                    }

                    myPawns[this.id].distance = myPawns[this.id].distance + diceValue
                }
                else if (myPawns[this.id].distance > 39) {
                    if (myPawns[this.id].position - diceValue < 0) {
                        myPawns[this.id].position = myPawns[this.id].position - diceValue + 40
                    }
                    else {
                        myPawns[this.id].position = myPawns[this.id].position - diceValue
                    }
                    myPawns[this.id].distance = myPawns[this.id].distance - diceValue
                }
            }
            else if (myPawns[this.id].distance == 39) {
                for (let k = 3; k >= 0; k--) {
                    if (emptySlots[k] == 0) {
                        if (diceValue == k + 1) {
                            emptySlots[k] = 1
                            myPawns[this.id].distance = `end${k}`
                            myPawns[this.id].position = `end${k}`
                        }
                    }
                }
            }
        }
        console.log(myPawns[this.id].position)
        console.log(".....n")
        console.log(myPawns[this.id].distance)
        myPawns[this.id].updateDatabase()
    }

    hover() {
        if (ifDiced == true && moves == true) {
            if (myPawns[this.id].distance != 39) {

                if (myPawns[this.id].distance < 39) {
                    if (myPawns[this.id].position + diceValue > 39) {
                        myPawns[this.id].predict(myPawns[this.id].position + diceValue - 40)
                    }
                    else {
                        myPawns[this.id].predict(myPawns[this.id].position + diceValue)
                    }
                }

                else if (myPawns[this.id].distance > 39) {
                    if (myPawns[this.id].position - diceValue < 0) {
                        myPawns[this.id].predict(myPawns[this.id].position - diceValue + 40)
                    }
                    else {
                        myPawns[this.id].predict(myPawns[this.id].position - diceValue)
                    }
                }
            }
        }
    }

    predict(position) {
        let block = document.createElement("div")
        block.className = "pawn"
        block.style.backgroundColor = "pink"
        block.style.left = `${pawnTab[position].left}px`
        block.style.top = `${pawnTab[position].top}px`
        board.append(block)

    }

    isMine() {
        if (this.position == "start") {

            this.onScreen.addEventListener("click", this.startFromBase)
        }
        else {

            this.onScreen.addEventListener("click", this.move)
            this.onScreen.addEventListener("mouseover", this.hover)
        }
    }

}

class Speach {
    constructor(text) {
        this.text = text;

    };
    speak() {
        //console.log(this.text)
        msg.text = this.text; //numer
        window.speechSynthesis.speak(msg)
    }
}
