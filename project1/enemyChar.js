/**
 * Created by Phillip McIntyre on 1/28/2015.
 */
function addEnemy (a, b, da, db, id){
    var enemy = {
        imgSrc: E1_PATH_CHAR,
        width: E1_CHAR_WIDTH,
        height: E1_CHAR_HEIGHT,
        x: a,
        y: b,
        dx: da,
        dy: db,
        id: id,
        alive: true,
        passed: false
    };

    enemySprites.push(enemy);
}

function enemyInBounds(r) {

    if (r.x >= 0 && r.x + E1_CHAR_WIDTH <= STAGE_WIDTH)
        return true;
    else
        return false;

}

function updateEnemies () {
    for(var i = 0; i < enemySprites.length; i++) {
        var b = enemySprites[i];
        if (enemyInBounds(b) && b.alive) {

            b.alive = true;

            if (!enemyInBounds(b) && (b.x + b.dx > STAGE_WIDTH || b.x - b.dx < 0))
                b.dx = 2 * -b.dx;

            b.y += b.dy;
            b.x += b.dx;

            b.dx = 3 * Math.sin(b.id * Math.PI/64);

            b.id++;

            if (b.y > STAGE_HEIGHT) {
                b.passed = true;
                b.alive = false;
                numEnemiesPass++;
            }
        }
        else {
            b.alive = false;
        }
    }
}

function drawEnemies(ctx) {
    for(var i = 0; i < enemySprites.length; i++){
        var b = enemySprites[i];
        if(b.alive && !b.passed){
            var image = new Image();
            image.src = b.imgSrc;
            if(b.x + b.dx > STAGE_WIDTH)
                b.x = 0;
            else if (b.x - b.dx < 0)
                b.x = STAGE_WIDTH - E1_CHAR_WIDTH;

            ctx.drawImage(image, 0, 0, E1_CHAR_WIDTH, E1_CHAR_HEIGHT, b.x + b.dx, b.y + b.dy, E1_CHAR_WIDTH, E1_CHAR_HEIGHT);
        }
    }
}