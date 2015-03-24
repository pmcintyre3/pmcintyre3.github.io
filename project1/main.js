//Menu variables
var atMainMenu;
var atGameOver;
var titleMusic;
var battleMusic;
var gameOverMusic;
//Game Variables
var gameloop;

//canvas variables
var ctx;
var stage;

//Player variables
var player;
var playerImg;
var playerSpriteOptions;
var pewpew;
var x;
var y;
var dx;
var dy;

//Background Variables
var parallax;
var layer;

//Enemy Variables
var ticks;
var enemySprites;
var numEnemiesKilled;
var numEnemiesPass;
var numEnemiesReq = 20;
var diff;
var sDiff;
var boom;
var spawn_x;
var spawn_y;
var spawn_dx;
var spawn_dy;
var spawn_id;

function preloader(){

    atMainMenu = true;
    atGameOver = false;
    titleMusic = new Audio("music/KingdomHeartsII_PassionSanctuary.mp3");
    titleMusic.volume = 0.6;
    battleMusic = new Audio("music/KingdomHeartsII_PassionSanctuaryBattle.mp3");
    battleMusic.volume = 0.6;
    gameOverMusic = new Audio("music/FinalFantasyX_ToZanarkand.mp3");
    gameOverMusic.volume = 0.6;
    pewpew = new Audio("music/pewpew.wav");
    pewpew.volume = 0.15;
    boom = new Audio("music/Explosion.wav");
    boom.volume = 0.15;

    titleMusic.pause();
    titleMusic.currentTime = 0;
    battleMusic.pause();
    battleMusic.currentTime = 0;
    gameOverMusic.pause();
    gameOverMusic.currentTime = 0;


    x = PLAYER_START_X;
    y = PLAYER_START_Y;
    dx = PLAYER_OFFSET_X;
    dy = PLAYER_OFFSET_Y;
    playerAlive = true;
    px = PLAYER_START_X;
    py = PLAYER_START_Y;
    diff = 0.1;
    sDiff = 50;
    enemySprites = [];

    stage = document.getElementById("gameCanvas");
    ctx = stage.getContext("2d");
    stage.width = STAGE_WIDTH;
    stage.height = STAGE_HEIGHT;

    playerImg = new Image();
    playerImg.src = PLAYER_PATH_CHAR;

    layer = new Array(GROUND_PATH_CHAR, CLOUD_PATH_CHAR);
    parallax = new ParallaxScrolling(ctx, layer);

    playerSpriteOptions = {
        screen: ctx,
        imgSrc: PLAYER_PATH_CHAR,
        spw: PLAYER_CHAR_WIDTH,
        frames: 2,
        x: PLAYER_START_X + PLAYER_OFFSET_X,
        y: PLAYER_START_Y + PLAYER_OFFSET_Y,
        width: STAGE_WIDTH,
        height: STAGE_HEIGHT
    };

    playerAlive = true;
    ticks = 0;
    numEnemiesKilled = 0;
    numEnemiesPass = 0;
    numEnemiesReq = 20;
    count = 0;

    player = new playerSprite(playerSpriteOptions);

    window.addEventListener('keydown', doKeyDown, true);

    main();
}

function mainMenuDraw(ctx){

    function centerText(ctx, text, y){
        var m = ctx.measureText(text);
        var center = (STAGE_WIDTH - m.width) / 2;
        ctx.fillText(text, center, y);
    }

    window.addEventListener('keydown', menuPress, true);
   // ctx.clearRect(0, 0, STAGE_HEIGHT, STAGE_WIDTH);
   // ctx.fillStyle = "grey";
  //  ctx.fillRect(0, 0, STAGE_HEIGHT, STAGE_WIDTH);
    //parallax.Draw();
    ctx.globalAlpha = 1;
    var centerY = STAGE_HEIGHT / 2;
    ctx.font = '50px sans-serif';
    ctx.fillStyle = 'red';
    centerText(ctx, "AirFighter!", centerY - 50);
    ctx.fillStyle = 'white';
    ctx.font = '40px sans-serif';
    centerText(ctx, "Press any key to start!", centerY);
    ctx.font = '25px sans-serif';
    ctx.fillStyle = "black";
    centerText(ctx, "Use 'WASD' or the arrow keys to move", centerY + 50);
    centerText(ctx, "Use the Spacebar to shoot!", centerY + 100);
    centerText(ctx, "Created by Phillip McIntyre, 2015", centerY + 175);
}

function main(){

    if(gameloop)
        clearInterval(gameloop);

    gameloop = setInterval(update, TIME_PER_FRAME);
}

function update(){

    if(atMainMenu){
        window.removeEventListener('keydown', gameOverPress, true);
        gameOverMusic.pause();
        gameOverMusic.currentTime = 0;
        battleMusic.pause();
        battleMusic.currentTime = 0;
        titleMusic.play();
        parallax.Draw(ctx);
        mainMenuDraw(ctx);
    }
    else if(atGameOver) {
        titleMusic.pause();
        titleMusic.currentTime = 0;
        battleMusic.pause();
        battleMusic.currentTime = 0;
        gameOverMusic.play();
        window.addEventListener('keydown', gameOverPress, true);
        drawGameOver(ctx);

    }
    else {
      //  gameOverMusic.pause();
      //  gameOverMusic.currentTime = 0;
        titleMusic.pause();
        titleMusic.currentTime = 0;

        battleMusic.play();
        window.removeEventListener('keydown', menuPress, true);
        window.removeEventListener('keydown', gameOverPress, true);
        if (ticks > 99)
            ticks = 0;
        else
            ticks++;


        parallax.Draw();
        player.Draw();
        drawHUD(ctx, numEnemiesKilled, count);
        updateBullets();
        drawBullets(ctx);

        spawn();
        updateEnemies();
        drawEnemies(ctx);
        handleCollisions();

        //main.numEnemiesReq = 20;

        if(numEnemiesPass > numEnemiesReq){
            atGameOver = true;
        }

    }

}

function drawHUD(ctx, numHit, bulletsShot){

    ctx.fillStyle = "white";
    ctx.font = '10px monospace';
    ctx.fillText("Number of Enemies Hit: " + numHit, 10, 25, STAGE_WIDTH / 2);
    ctx.fillText("Bullets Fired: " + bulletsShot, 10, STAGE_HEIGHT - 25, STAGE_WIDTH / 2);
    ctx.fillText("Number of Enemies Missed: " + numEnemiesPass, STAGE_WIDTH/2 + 25, 25, STAGE_WIDTH);
    ctx.fillText("Number of Enemies Required: " + numEnemiesReq, STAGE_WIDTH/2 + 25, 50, STAGE_WIDTH);

}

function handleCollisions() {
    for (var i = 0; i < enemySprites.length; i++) {
        var e = enemySprites[i];
        for (var j = 0; j < playerBullets.length; j++) {
            var p = playerBullets[j];
            if (e.x < px + PLAYER_CHAR_WIDTH &&
                e.x + e.width > px &&
                e.y < py + PLAYER_CHAR_HEIGHT &&
                e.y + e.height > py && e.alive && !e.passed) {
                playerAlive = false;
                //console.log("player hit");
                boom.play();
                boom.currentTime = 0;
                atGameOver = true;
                break;
            }

            if (p.isVisible && (e.alive && !e.passed)) {
                if (p.xVal + p.w >= e.x && p.xVal + p.w <= e.x + e.width && p.yVal <= e.y + e.height && e.y <= p.yVal) {
                    //console.log("hit");
                    p.isVisible = false;
                    e.alive = false;
                    boom.play();
                    boom.currentTime = 0;
                    numEnemiesKilled++;
                    diff += 0.2;
                    if(numEnemiesKilled % 15 === 0) {
                        if(sDiff > 0)
                            sDiff -= 5;
                        else
                            sDiff = 1;
                    }
                }
            }
        }
    }
}

function menuPress(e){
    if(e.keyCode) {
        atMainMenu = false;
        titleMusic.pause();
        titleMusic.currentTime = 0;
        main();
    }
}

function gameOverPress(e){
    if(e.keyCode === 13){ //enter
        atGameOver = false;
        gameOverMusic.pause();
        gameOverMusic.currentTime = 0;
        preloader();
    }
}

function doKeyDown (e){
    switch(e.keyCode){
        case 32:                    //keypress 'Spacebar'
            addBullet();
            pewpew.play();
            pewpew.currentTime = 0;
            break;
        case 65:                    //keypress 'a'
            if(px <= 0)
                px = 0;
            else
                px -= dx;
            break;
        case 37:                    //keypress 'left-arrow'
            if(px <= 0)
                px = 0;
            else
                px -= dx;
            break;
        case 87:                    //keypress 'w'
            if(py <= 0)
                py = 0;
            else
                py -= dy;
            break;
        case 38:                    //keypress 'up-arrow'
            if(py <= 0)
                py = 0;
            else
                py -= dy;
            break;
        case 68:                    //keypress 'd'
            if(px + PLAYER_CHAR_WIDTH >= STAGE_WIDTH)
                px = STAGE_WIDTH - PLAYER_CHAR_WIDTH;
            else
                px += dx;
            break;
        case 39:                    //keypress 'right-arrow'
            if(px + PLAYER_CHAR_WIDTH >= STAGE_WIDTH)
                px = STAGE_WIDTH - PLAYER_CHAR_WIDTH;
            else
                px += dx;
            break;
        case 83:                    //keypress 's'
            if(py + PLAYER_CHAR_HEIGHT >= STAGE_HEIGHT)
                py = STAGE_HEIGHT - PLAYER_CHAR_HEIGHT;
            else
                py += dy;
            break;
        case 40:                    //keypress 'down-arrow'
            if(py + PLAYER_CHAR_HEIGHT >= STAGE_HEIGHT)
                py = STAGE_HEIGHT - PLAYER_CHAR_HEIGHT;
            else
                py += dy;
            break;
        default:
            console.log(e.keyCode);
    }
}

function drawGameOver(ctx){

    function centerText(ctx, text, y){
        var m = ctx.measureText(text);
        var center = (STAGE_WIDTH - m.width) / 2;
        ctx.fillText(text, center, y);
    }

    //window.addEventListener('keydown', gOverPress, true);
    ctx.clearRect(0, 0, STAGE_HEIGHT, STAGE_WIDTH);
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, STAGE_HEIGHT, STAGE_WIDTH);
    var centerY = STAGE_HEIGHT / 2;
    ctx.font = '40px sans-serif';
    ctx.fillStyle = 'red';
    centerText(ctx, "You killed " + numEnemiesKilled + " Enemies!", centerY);
    ctx.fillStyle = 'white';
    centerText(ctx, "Game Over!", centerY - 50);
    ctx.font = '25px sans-serif';
    ctx.fillStyle = "black";
    centerText(ctx, "Do you want to try again?", centerY + 50);
    centerText(ctx, "Press Enter to start over!", centerY + 100);

    window.clearInterval(gameloop);
}