/*Creating the Level Scheme*/
var spawn = function() {

    if(ticks % sDiff === 0) {
        spawn_id = Math.floor(Math.random() * 16);
        spawn_x = STAGE_WIDTH / 8 + Math.random() * STAGE_WIDTH;
        spawn_y = 0;

        var pathSpawn = Math.random() + 1;

        if(pathSpawn % 2 === 0) {
            spawn_dx = 3 * Math.sin(spawn_id * Math.PI / 64);
            spawn_dy = 1 + diff;

        }
        else {
            spawn_dx = 0.5 * Math.sin(spawn_id * Math.PI / 128);
            spawn_dy = 1.5 + diff;
        }

        addEnemy(spawn_x, spawn_y, spawn_dx, spawn_dy, spawn_id);
    }
};
