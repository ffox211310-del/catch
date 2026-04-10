let score = 0;
let timeLeft = 25;
let gameInterval;
let fallInterval;

function openGame(id){
    showScreen(id);

    if(id === "catchGame"){
        document.getElementById("player").style.display = "block";
        startCatchGame();
    }
}

function startCatchGame(){
    score = 0;
    timeLeft = 25;
document.getElementById("player").style.display = "block";
    document.getElementById("score").innerText = 0;
    document.getElementById("time").innerText = 25;

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
    item.style.left = Math.random()*90 + "%";
    item.style.fontSize = "30px";

    document.getElementById("catchGame").appendChild(item);

    let fall = setInterval(()=>{
        let top = parseInt(item.style.top);
        item.style.top = (top + 5) + "px";

        // 当たり判定
        const player = document.getElementById("player");
        const pRect = player.getBoundingClientRect();
        const iRect = item.getBoundingClientRect();

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

    let text = win ? "完遂" : "Oh...";

    document.getElementById("resultText").innerText = text;
showScreen("catchResult"); 
    // ゲーム要素を隠す
    document.getElementById("player").style.display = "none";
    document.getElementById("fallArea").style.display = "none";

    // 終了画面を表示
   
}
//消すかも
function goHome(){
    showScreen("home");
}
// 再挑戦
function restartCatch(){
    // 終了画面消す
    document.getElementById("catchResult").style.display = "none";

    // ゲーム画面に戻る
    showScreen("catchGame");

    // プレイヤー戻す
    document.getElementById("player").style.display = "block";
    document.getElementById("fallArea").style.display = "block";

    // 落ちてるやつ削除
    document.querySelectorAll("#catchGame div").forEach(e=>{
        if(e.innerText === "🥒" || e.innerText === "🐙" || e.innerText === "☄️" || e.innerText === "😏"){
            e.remove();
        }
    });

    startCatchGame();
}

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
