let score = 0;
let timeLeft = 25;
let gameInterval;
let fallInterval;

function startCatchGame(){
    score = 0;
    timeLeft = 25;

    document.getElementById("score").innerText = 0;
    document.getElementById("time").innerText = 25;

    document.getElementById("resultScreen").style.display = "none";

    // タイマー
    gameInterval = setInterval(()=>{
        timeLeft--;
        document.getElementById("time").innerText = timeLeft;

        if(timeLeft <= 0){
            endCatchGame(false);
        }
    },1000);

    // 落下
    fallInterval = setInterval(createItem, 800);
}

// 落下物
function createItem(){
    const items = ["🥒","🐙","☄️","😏"];
    const item = document.createElement("div");

    item.innerText = items[Math.floor(Math.random()*items.length)];
    item.style.position = "absolute";
    item.style.top = "0px";
    item.style.left = Math.random()*80 + "%";
    item.style.fontSize = "30px";

    document.getElementById("fallArea").appendChild(item);

    let fall = setInterval(()=>{
        let top = parseInt(item.style.top);
        item.style.top = (top + 5) + "px";

        const player = document.getElementById("player");
        const pRect = player.getBoundingClientRect();
        const iRect = item.getBoundingClientRect();

        // 当たり判定
        if(
            iRect.bottom > pRect.top &&
            iRect.left < pRect.right &&
            iRect.right > pRect.left
        ){
            score++;
            document.getElementById("score").innerText = score;
            item.remove();
            clearInterval(fall);

            if(score >= 20){
                endCatchGame(true);
            }
        }

        if(top > window.innerHeight){
            item.remove();
            clearInterval(fall);
        }

    },30);
}

// 終了
function endCatchGame(win){
    clearInterval(gameInterval);
    clearInterval(fallInterval);

    const result = document.getElementById("resultScreen");
    const text = document.getElementById("resultText");

    text.innerText = win ? "おめでとう！！" : "Oh...";
    result.style.display = "flex";
}

// タッチ操作
let player = null;
let startX = 0;

document.addEventListener("touchstart", e=>{
    startX = e.touches[0].clientX;
    player = document.getElementById("player");
});

document.addEventListener("touchmove", e=>{
    let moveX = e.touches[0].clientX;
    let diff = moveX - startX;

    let current = player.offsetLeft;
    player.style.left = (current + diff) + "px";

    startX = moveX;
});

// 起動時
window.onload = () => {
    startCatchGame();
};
