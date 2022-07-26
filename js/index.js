// import {Game} from "./game.js";
import {getRandomInt} from "./lib.js";
import { Cat } from "./cat.js";
import { InputHandler } from "./input.js";
import { Bomb } from "./bomb.js";
import { Palm } from "./palm.js";

let score = 0;

let canvas = document.getElementById("game-screen");
let ctx = canvas.getContext("2d");

let backImg = document.getElementById("img-back"); //背景

const GAME_WIDTH = 640;     //ゲームキャンバスの幅
const GAME_HEIGHT = 480;    //ゲームキャンバスの高さ

let cat = new Cat(GAME_WIDTH,GAME_HEIGHT);
new InputHandler(cat);
let bomb = [];
let palm = new Palm(GAME_WIDTH, GAME_HEIGHT);

let lastTime = 0;
let counter = 0;
let interval = 0;

let gamestate = true; //もしfalseならゲーム描写が止まるようにする

function gameLoop(timestamp){

    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.drawImage(backImg,0,0,GAME_WIDTH,GAME_HEIGHT); //背景の描写

    palm.update(deltaTime);
    palm.draw(ctx);

    cat.update(deltaTime); 
    cat.draw(ctx);

    counter += deltaTime;
    if(counter > interval){ //800ミリ秒から２秒間隔で爆弾を生成
        bomb.push(new Bomb(GAME_WIDTH,GAME_HEIGHT));
        // palm.push(new Palm(GAME_WIDTH,GAME_HEIGHT));

        counter = 0;
        interval = getRandomInt(800,2000); //インターバルを800ミリ秒から２秒までの乱数に設定

        cat.down();
    }

    ctx.font = "40px sans-serif";           //スコアとして表示する文字の大きさとフォント
    ctx.fillText("Score:"+score,60,60);     //スコアを（60,60）の位置に表示する

    for(var i = bomb.length-1; i>= 0; i--){

        bomb[i].update(deltaTime);
        bomb[i].draw(ctx);

        //爆弾が恐竜と当たったかどうかの判定
        if(bomb[i].checkHit(cat.position.x,cat.position.y,cat.r,
            bomb[i].position.x,bomb[i].position.y,bomb[i].r)){

                //もし衝突したら爆弾クラスで読み込んだ音を出す
                // var playbomb = bomb[i].audio.play();
                //ユーザー操作がなかった時に、DOMExceptionのエラーがおこるため
                // if(playbomb !== undefined){
                //     playbomb.then(_ =>{
                //     })
                //     .catch(error =>{
                //         console.log(error);
                //     });
                // }
                gamestate=false;
                // cat.audio.muted = true; //恐竜のジャンプ音をミュート

                gameover(ctx, score);
            }
        //爆弾の位置がゲーム画面外に出たら爆弾の配列を削除
        if(bomb[i].offScreen()){
            score++;
            bomb.shift();
        }

    }
    //ゲーム状態がfalseだったらゲームをストップ
    if(!gamestate){
        return;
    }
    requestAnimationFrame(gameLoop);
}

const intervalId = setInterval(() => {
    let date = new Date();
    // console.log("wait. " + date.getTime());
    if (gamemode) {
        console.log("game start.");
        bgm.play();
        requestAnimationFrame(gameLoop);
        clearInterval(intervalId);
    }
}, 1000);

function gameover(ctx, score) {
    bgm.pause();
    // window.setTimeout(function () { bgm.pause(); }, 1000);
    let gameoverImg = document.getElementById("img-gameover");
    ctx.drawImage(gameoverImg,0,0,GAME_WIDTH,GAME_HEIGHT);

    let messagebox = document.getElementById("messagebox");
    messagebox.value = "Score:"+score+"\nあそんでみる？\n"+"https://sample.cat-game-url.com/";

    let copymessage = document.getElementById("copy-message");
    copymessage.style.visibility = "visible";
}
