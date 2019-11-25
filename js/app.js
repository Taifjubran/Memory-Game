var cards = [
    "fa fa-anchor",
    "fa fa-anchor",
    "fa fa-leaf",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-bicycle",
    "fa fa-diamond",
    "fa fa-diamond",
    "fa fa-bomb",
    "fa fa-bomb",
    "fa fa-bolt",
    "fa fa-bolt",
    "fa fa-paper-plane-o",
    "fa fa-paper-plane-o",
    "fa fa-cube",
    "fa fa-cube"];

let achivedstar=3;
    let time = document.getElementById('tim');
    let seconds = 0, minutes = 0, hours = 0,
    t;
    let gameStarted = false;




    shuffle();
    let movement = 0;
    document.querySelectorAll('.card').forEach(function setCardPic(card, index) {
    card.addEventListener('click', function () {
        if(!card.classList.contains("open")){

            movement = movement + 1;
        }
       
        document.getElementById("move").innerHTML = movement;
        stars();

        if (card.classList.contains("open")) {

            return;
        }

        if (document.getElementsByClassName("open").length == 0 && !gameStarted) {
            timer();
            gameStarted = true;
        }

        card.classList.value = "card open show";
        let openedCards = document.getElementsByClassName("show");
        if (openedCards.length == 2) {
            let fCard = openedCards[0];
            let sCard = openedCards[1];
            if (fCard.firstElementChild.classList.value === sCard.firstElementChild.classList.value) {

                fCard.classList.value = "card open match";
                sCard.classList.value = "card open match";
                playSoundCorrect();
                if (document.getElementsByClassName("match").length == 16) {
                    // GAME DONE
                    setTimeout(function () { resetGame(); }, 1000);
                    results();
                }
            } else {
                setTimeout(function () {
                    playSoundWrong();
                    fCard.classList.value = "card ";
                    sCard.classList.value = "card ";
                }, 500);
            }
        }
    });
});

function resetGame() {
    shuffle();
        document.querySelectorAll('.card').forEach(function close(card) {
        card.classList.value = 'card'
        resetTimer();
        movement = 0;
        document.getElementById("move").innerHTML = movement;
        reSetStars();
    });
}

document.getElementById('reset-btn').addEventListener('click', resetGame);
document.getElementById("btn-replay").addEventListener("click", resetGame);


function reSetStars() {
    document.getElementsByClassName("fa-star")[0].setAttribute("id", "icon-c");
    document.getElementsByClassName("fa-star")[1].setAttribute("id", "icon-c");
    document.getElementsByClassName("fa-star")[2].setAttribute("id", "icon-c");
}
  

function stars() {

    if (movement > 17 && movement < 21) {
        document.getElementsByClassName("fa-star")[2].setAttribute("id", "non");
        achivedstar=2;
    }
    if (movement > 21 ) {

        document.getElementsByClassName("fa-star")[1].setAttribute("id", "non");
        achivedstar=1;
    }
    
   
    

}



function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    time.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":"
        + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}

function timer() {
    t = setTimeout(add, 1000);
}

function resetTimer() {
    gameStarted = false;
    time.textContent = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;
    clearTimeout(t);
}

function results() {
    $("#modal-body").html("You did it with just " + movement + " moves, and in just " + document.getElementById("tim").innerHTML+
    "with a total of "+achivedstar+" "+"stars");
    $("#myModal").modal();
}

function playSoundWrong() {

    var sound = new Howl({
        src: ["audio/no.mp3"]
    });
    sound.play();
}

function playSoundCorrect() {
    var sound = new Howl({
        src: ["audio/correct.wav"]
    });
    sound.play();
}




// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle() {
     var currentIndex = cards.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }
    document.querySelectorAll('.card').forEach(function setCardPic(card, index) {
        card.firstElementChild.classList.value = cards[index];

    });

}



