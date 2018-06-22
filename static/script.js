'use strict';

let img, currentImgs, cardsNumber, clickedCardId, frozen, pairs;

img = [
    "fa-anchor", "fa-bath", "fa-cogs", "fa-ambulance", "fa-gem", "fa-gavel",
    "fa-heart", "fa-flask", "fa-key", "fa-leaf", "fa-moon", "fa-paint-brush",
    "fa-paper-plane", "fa-microphone", "fa-lightbulb", "fa-rocket", "fa-snowflake",
    "fa-shield-alt", "fa-tree", "fa-umbrella", "fa-university", "fa-wine-glass",
    "fa-sun", "fa-thumbtack", "fa-star", "fa-utensils", "fa-taxi", "fa-stopwatch",
    "fa-shower", "fa-school", "fa-magic", "fa-laptop", "fa-chess", "fa-database"
];

currentImgs = [];


cardsNumber = document.getElementsByClassName("icon");
for (let i = 1; i < cardsNumber.length / 2 + 1; i++) {
    let random = Math.floor(Math.random() * img.length);
    let newElement = img.splice(random, 1).toString();
    currentImgs.push(newElement);
    currentImgs.push(newElement);
}


let shuffleArray = function (array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; //
    }
};


function sleep(ms) {
  return new Promise(res => setTimeout(res, ms));
}

let init = function () {
    let elements = document.getElementsByClassName("icon");
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.add("card-" + i);
    }
    pairs = 0;
};


let flip = function (elementId) {
    let card = document.querySelector(".card-" + elementId);
    card.classList.toggle(currentImgs[elementId]);
    card.classList.toggle("fa-bomb");
    card.classList.toggle("back");
};


let isPair = function (elementId, clickedCardId) {
    return currentImgs[elementId] == currentImgs[clickedCardId];
};


let isWon = function () {
    return pairs === cardsNumber.length / 2;
};


let cardTurner = function () {
        let previousElementId = 100;
        let timeoutId;
        let elements = document.getElementsByClassName("icon");
        for (let elementId = 0; elementId < elements.length; elementId++) {
            let card = document.querySelector(".card-" + elementId);
            card.addEventListener("click", function () {
                if (timeoutId){
                    return;
                }
                if (card.classList.contains('fa-bomb') && (previousElementId !== 100)) {
                    flip(elementId);
                    if (isPair(elementId, previousElementId)) {
                        pairs += 1;

                        if (isWon()) {

                            alert("you won!");
                        }

                        previousElementId = 100;

                    } else {
                        timeoutId = setTimeout(function(){
                            flip(previousElementId);
                            flip(elementId);
                            previousElementId = 100;
                            timeoutId = undefined;
                        }, 1000);
                    }


                } else {
                    if (card.classList.contains('fa-bomb')) {
                        flip(elementId);
                        previousElementId = elementId;
                    }
                }
            });
        }
    };

shuffleArray(currentImgs);
init();
cardTurner();
