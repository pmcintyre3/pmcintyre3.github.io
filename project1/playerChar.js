// Simple sprite class
var px = PLAYER_START_X;
var py = PLAYER_START_Y;

var playerBullets = [];
var bulletPositionX;
var bulletPositionY;

var count = 0;
var playerAlive = true;
function playerSprite(args) {
    this.image = new Image();
    this.image.src = args.imgSrc;
    this.x = px;
    this.y = py;
    this.imgFrames = args.frames || 1;
    this.frame = 0;

    // Draw the sprite to the screen
    this.Draw = function() {
        if(playerAlive) {
            ctx.globalAlpha = 1;
            var x = px;
            var y = py;

            ctx.drawImage(this.image, this.frame, 0, args.spw,
                args.spw, x, y, args.spw, args.spw);
            this.frame += PLAYER_CHAR_WIDTH;
            if (this.frame >= this.image.width) this.frame = 0;
        }
    };
};


function Rectangle(x, y, w, h, fill){
    this.xVal = x || 0;
    this.yVal = y || 0;
    this.w = w || 0;
    this.h = h || 0;
    this.fill = fill || "#FFFF00";
    this.dx = 0;
    this.dy = -8;
    this.isVisible = true;
}

function addBullet () {

    if(count % 2 === 0){
        bulletPositionX = px;
        bulletPositionY = py;
    }
    else{
        bulletPositionX = px + PLAYER_CHAR_WIDTH;
        bulletPositionY = py;
    }
    count++;

    var rect = new Rectangle(bulletPositionX, bulletPositionY, 2, 6);
    playerBullets.push(rect);
}

function inBounds(r){
    if(r.xVal >= 0 && r.xVal <= STAGE_WIDTH && r.yVal >= 0 && r.yVal <= STAGE_HEIGHT)
        return true;
    else
        return false;
}

function updateBullets(){
    for(var i = 0; i < playerBullets.length; i++){
        if(playerBullets[i].isVisible && inBounds(playerBullets[i])){
            playerBullets[i].isVisible = true;
            playerBullets[i].yVal += playerBullets[i].dy;
        }
        else
            playerBullets[i].isVisible = false;
    }
}

function drawBullets(ctx){
    this.ctx = ctx;
    for(var i = playerBullets.length-1; i > 0; i--){
        if(playerBullets[i].isVisible) {
            ctx.globalAlpha = 1;
            var rec = playerBullets[i];
            ctx.fillStyle = rec.fill;
            ctx.fillRect(rec.xVal + rec.dx, rec.yVal + rec.dy, rec.w, rec.h);
        }
    }
}
