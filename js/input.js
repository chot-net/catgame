const key_up = 38;       //キーボードの上↑のボタンが押されたとき
const KEY_SPACE = 32;    //スペース
const KEY_S = 83;        // sキー
export class InputHandler{
    constructor(cat){
        document.addEventListener("keydown",event =>{
            switch(event.keyCode){
                case KEY_SPACE:
                    cat.up();
                    break;
                case KEY_S:
                    location.reload();
                    break;
            }
        },
        document.addEventListener("touchstart", event =>{
            cat.up();
        }))
    }
}