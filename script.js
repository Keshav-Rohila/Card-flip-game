const cards = document.querySelectorAll(".card");

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
var flipCount = 1;
var card_1 = null;
var card_2 = null;
var card_3 = null;
var card_4 = null;
var check = 1;


cards.forEach((card) => card.addEventListener("click", flip));

function flip() {
    clickSound.play();
    clicks++;
    this.classList.add("flip");

    if (flipCount === 1) {
        flipCount++;
        card_1 = this;
        this.removeEventListener("click", flip);
    }else if (flipCount === 2) {
        flipCount++;
        card_2 = this;

        checkIt();
    }else if (flipCount === 3){
        flipCount++;
        card_3 = this;
        this.removeEventListener("click", flip);

    }else if (flipCount === 4){
        flipCount = 1;
        card_4 = this;

        checkIt();
    }
};

const checkIt = () => {
    if (check === 1){
        check++;
        if(card_1.dataset.image === card_2.dataset.image){
            success();
        }else {
            fail();
        }
    }else if (check === 2){
        check = 1;
        if(card_3.dataset.image === card_4.dataset.image){
            success();
        }else {
            fail();
        }
    }
};

const success = () => {
    if (check === 2){
        card_2.removeEventListener("click", flip);
        setTimeout(() => {                                           
            card_1.classList.add("glow-card");
            card_2.classList.add("glow-card");
            successSound.play();
        }, 100);
        
        setTimeout(()  => {                                          
            card_1.classList.remove("glow-card");
            card_2.classList.remove("glow-card"); 
        },1000)

        totalMatchedCards++;
        score += 60;
        if (totalMatchedCards === 8){
            setTimeout(() => {
                gameOver();
            },800);
        }
    }else if (check === 1) {
        card_4.removeEventListener("click", flip);
        setTimeout(() => {                                           
            card_3.classList.add("glow-card");
            card_4.classList.add("glow-card");
            successSound.play();
        }, 100);
        
        setTimeout(()  => {                                          
            card_3.classList.remove("glow-card");
            card_4.classList.remove("glow-card"); 
        },1000)

        totalMatchedCards++;
        score += 60;
        if (totalMatchedCards === 8){
            setTimeout(() => {
                gameOver();
            },800);
        }
    }
};

const fail = () => {
    if (check === 2){
        failToMatch++;
        setTimeout(() => {
            failSound.play();    
        }, 300);
        setTimeout(() => {
            card_1.classList.remove("flip");
            card_2.classList.remove("flip");
            card_1.addEventListener("click", flip);
        }, 700);
    }else if(check === 1){
        failToMatch++;
        setTimeout(() => {
            failSound.play();    
        }, 300);
        setTimeout(() => {
            card_3.classList.remove("flip");
            card_4.classList.remove("flip");
            card_3.addEventListener("click", flip);
        }, 700);
    }
    
};

const gameOver = () => {
    
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
        }, (2700/finalScore));
    }, 600);
}

(function shuffle() {
    cards.forEach((card) => {
        var index = Math.floor(Math.random() * 16);
        card.style.order = index;
    });
})();

