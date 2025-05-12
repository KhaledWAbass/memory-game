document.querySelector(".startGame span").onclick = function () {
    let playerName = prompt("Enter Your Name", );
    if (playerName !== null ){
        document.querySelector(".startGame").remove();
        document.querySelector(".walcom span").innerHTML = playerName.valueOf().toUpperCase();
        BackgroundMusic()
Timer()
    }
    if (playerName == "" ){
        document.querySelector(".walcom span").innerHTML = "Unknown Player";
        document.querySelector(".startGame").remove();
    }
}

let duration = 500; // duration of fliping the block
let blocksContainer = document.querySelector(".container-img");
let blocks = Array.from(blocksContainer.children);
let orderRange = Array.from(Array(blocks.length).keys());

shuffleBlocks(orderRange);

blocks.forEach((block,index) => {
block.style.order = orderRange[index];

block.addEventListener("click",function (){
    filp(block)
    checkWin()
})
})
// the shuffle function
function shuffleBlocks(Array) {
let current = Array.length, temp, random;
while(current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = Array[current];
    Array[current] = Array[random];
    Array[random] = temp;
}
return Array;
}

// the flip function
function filp(e){
e.classList.add("fliped");

let AllFlipedblocks = blocks.filter(block => block.classList.contains("fliped"));

if (AllFlipedblocks.length === 2) {
    console.log("two blocks flipped");
    stopClicking();
    startClicking(AllFlipedblocks);
}
}

// the stop clicking function
function stopClicking() {
blocksContainer.classList.add("no-clicking");
}

// the start clicking function
function startClicking(e) {

if (e[0].dataset.number === e[1].dataset.number) { // if the two blocks are matched

    e[0].classList.remove("fliped");
    e[1].classList.remove("fliped");

    e[0].classList.add("matched");
    e[1].classList.add("matched");
document.querySelector(".right").play();

    blocksContainer.classList.remove("no-clicking");
}else { // if the two blocks are not matched
    setTimeout(() => {
        e[0].classList.remove("fliped");
        e[1].classList.remove("fliped");
document.querySelector(".wrong").play();
        blocksContainer.classList.remove("no-clicking");
    }, duration);
    document.querySelector(".tries span").innerHTML = parseInt(document.querySelector(".tries span").innerHTML) + 1;
    let tries = document.querySelector(".tries span");
    if (tries.innerHTML == 15) {
endGame()
    }
}

}

// the end game function
function endGame(){
document.querySelector(".wrong").play();
    let div = document.createElement("div");
    div.className = "popup";
    let span = document.createElement("span");
    let spanText = document.createTextNode("Game Over, You Lose!");
    span.appendChild(spanText);
    div.appendChild(span); // Append the span to the div
    let button = document.createElement("button");
    let buttonText = document.createTextNode("Play Again");
    button.appendChild(buttonText);
    div.appendChild(button);
    document.body.appendChild(div);
    button.onclick = function () {
        location.reload();
    }
}
// wingame function
function WinGame(){
    document.querySelector(".wrong").play();
        let div = document.createElement("div");
        div.className = "popup";
        let span = document.createElement("span");
        let spanText = document.createTextNode("congratulations, You Winner!");
        span.appendChild(spanText);
        div.appendChild(span); // Append the span to the div
        let button = document.createElement("button");
        let buttonText = document.createTextNode("Play Again");
        button.appendChild(buttonText);
        div.appendChild(button);
        document.body.appendChild(div);
        button.onclick = function () {
            location.reload();
        }
    }

// the sound functione 
function BackgroundMusic() {
    document.querySelector(".music").play()
    document.querySelector(".music").Volume = 0.5;
    document.querySelector(".music").loop = true;
}

// the timer function
function Timer() {
    // the time 
    let minutes = 5; // 5 minutes
    let seconds = 0;
    let EleTime = document.querySelector(".timer");
    EleTime.innerHTML = `${minutes} : ${seconds < 10 ? '0' : ''}${seconds}`;
    let timer = setInterval(() => {
        if (seconds === 0) {
            if (minutes === 0) {
                EleTime.innerHTML = "Game Over";
                document.querySelector(".wrong").play();
                clearInterval(timer);
                endGame();
                return;
            } else {
                minutes--;
                seconds = 59;
            }
        } else {
            seconds--;
        }
        EleTime.innerHTML = `${minutes} : ${seconds < 10 ? '0' : ''}${seconds}`;
    }, 1000);
}

// if the all blocks are matched
function checkWin() {
    let allmuched = blocks.filter(block => block.classList.contains("matched"));
    if (allmuched.length === blocks.length) {
        WinGame()
    }
}
