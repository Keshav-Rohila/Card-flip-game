const cards = document.querySelectorAll(".card");
console.log(cards);

// variables
const clickSound = new Audio("sounds/mouse-click.mp3");
const successSound = new Audio("sounds/success.mp3");
const failSound = new Audio("sounds/fail.mp3");
const gameOverSound = new Audio("sounds/game-over.mp3");
const scoreCountSound = new Audio("sounds/points-scrolling.mp3");
var score = 0;
var clicks = 0;
var totalMatchedCards = 0;
var failToMatch = 0;
var firstFlip = true;
var firstCard = null;
var secondCard = null;

cards.forEach((card) => card.addEventListener("click", flip));

function flip() {
    clickSound.play();
    clicks++;
    this.classList.add("flip");

    if (firstFlip) {
        firstFlip = false;
        firstCard = this;
    }else {
        secondCard = this;

        checkIt();
    }
};

const checkIt = () => {
    if(firstCard.dataset.image === secondCard.dataset.image){
        success();
    }else {
        fail();
    }
};

const success = () => {                                               
    firstCard.removeEventListener("click", flip);
    secondCard.removeEventListener("click", flip);
        setTimeout(() => {                                           
            firstCard.classList.add("glow-card");
            secondCard.classList.add("glow-card");
            successSound.play();
        }, 350);
        
        setTimeout(()  => {                                          
            firstCard.classList.remove("glow-card");
            secondCard.classList.remove("glow-card");
            reset(); 
        },1000)

    totalMatchedCards++;
    score += 60;
    if (totalMatchedCards === 8){
        setTimeout(() => {
            gameOver();
        },1000);
    }
};

const fail = () => {
    console.log("fail");
    failToMatch++;
    setTimeout(() => {
        failSound.play();    
    }, 350);
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        reset();
    }, 1000 )
    
};

const reset = () => {
    console.log("reset");
    firstFlip = true;
    firstCard = null;
    secondCard = null;
};

const gameOver = () => {
    console.log("game over");
    
    gameOverSound.play();

    const finalScore = score - (5 * clicks) -(5 * failToMatch);

    const body = document.querySelector("body");

    const section = document.createElement("section");

    const h2 = document.createElement("h2");
    const h2Text = document.createTextNode(" Game Over ");
    h2.append(h2Text);

    const para = document.createElement("p");
    const paraText = document.createTextNode("Your Score:  ");
    para.append(paraText);

    const span = document.createElement("span");
    const spanText = document.createTextNode("0");
    span.classList.add("final-score");
    span.append(spanText);

    const btn = document.createElement("button")
    btn.innerText = "Replay";
    btn.classList.add("replay-btn")
    btn.setAttribute("onClick", "window.location.reload()");

    para.append(span);
    section.append(h2);
    section.append(para);
    section.append(btn);
    body.append(section);

    section.classList.add("game-over-section");
    let count = 0;
    setTimeout(() => {
        scoreCountSound.play();
        setInterval(() => {
            if (count < finalScore){
                count++;
                span.innerText = count;
            }
        }, 7);
    }, 600);
}

(function shuffle() {
    cards.forEach((card) => {
        var index = Math.floor(Math.random() * 16);
        card.style.order = index;
    });
})();

