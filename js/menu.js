let menu = document.getElementById('menu-screen');
menu.addEventListener("click", () => {
    menu.style.display = "none";
    let game = document.getElementById('game-screen');
    game.style.display = "inline";
    gamemode = true;

    bgm = new Audio('audio/Mastering(-6LUFS).mp3');

    menu.removeEventListener("click");
});