let score = 0;
let cross = true;
const musicSound =new Audio('music.mp3')
const gameoveSound =new Audio('gameover.mp3')

// setTimeout(() => {
    
//     musicSound.play();
// }, 1000);

document.onkeydown = function (e) {
    console.log("key code: ", e.keyCode);
    let keycode = e.keyCode;
    musicSound.play(); 
    if (keycode === 38 || keycode === 32 || keycode === 87 || keycode === 104) {
        player = document.querySelector(".player");
        player.classList.add('animatePlayer');
        setTimeout(() => {
            player.classList.remove('animatePlayer')
        }, 700)
    }
    if (keycode === 39 || keycode === 68 || keycode === 102) {
        player = document.querySelector(".player");
        px = parseInt(window.getComputedStyle(player, null).getPropertyValue('left'));
        player.style.left = px + 100 + "px";
    }
    if (keycode === 37 || keycode === 65 || keycode === 100) {
        player = document.querySelector(".player");
        px = parseInt(window.getComputedStyle(player, null).getPropertyValue('left'));
        player.style.left = px - 100 + "px";
    }
}

setInterval(() => {
    player = document.querySelector(".player");
    gameover = document.querySelector(".gameover");
    obstacle = document.querySelector(".obstacle");

    px = parseInt(window.getComputedStyle(player, null).getPropertyValue('left'));
    py = parseInt(window.getComputedStyle(player, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));
    // console.log(ox,oy)
    offsetX = Math.abs(px - ox);
    offsetY = Math.abs(py - oy);
    // console.log(offsetX,offsetY )
    if (offsetX < 93 && offsetY < 48) {
        gameover.style.visibility = "visible";
        obstacle.classList.remove('obstacleAni');
        gameoveSound.play();
        setTimeout(() => {
            musicSound.pause();
            gameoveSound.pause();
        }, 1000);
    }
    else if (offsetX < 95 && cross) {
        score += 1;
        document.querySelector('#scoreCont').innerHTML = "Your Score: " + score;
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1; 
            if (newDur>=3) {
                document.querySelector('.obstacle').style.animationDuration = newDur + 's';
                // console.log(newDur);
            }
        }, 500);

    }
}, 10);