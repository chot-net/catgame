
//minからmaxまでの範囲でランダムな整数を生成する関数
export function getRandomInt(min,max){
    return Math.floor(min+Math.random()*(max-min+1));
}
