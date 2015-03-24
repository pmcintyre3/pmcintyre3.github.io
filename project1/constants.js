/**
 * Created by Phillip McIntyre on 1/27/2015.
 */
var STAGE_WIDTH = 500;
var STAGE_HEIGHT = 500;
var TIME_PER_FRAME = 1000/60;
var GAME_FONTS = "bold 20px sans-serif";

//Player
var PLAYER_PATH_CHAR = "sprites/PlayerShip.png";

var PLAYER_CHAR_WIDTH = 32;
var PLAYER_CHAR_HEIGHT = 32;
var PLAYER_START_X = 250;
var PLAYER_START_Y = 425;
var PLAYER_OFFSET_X = 20;
var PLAYER_OFFSET_Y = 20;
/*
var PLAYER_SPRITE_START_X = 0;
var PLAYER_SPRITE_START_Y = 0;
var PLAYER_SPRITE_WIDTH = 64;
*/

//Enemy1 info
var E1_PATH_CHAR = "sprites/EnemyShip1.png";

var E1_CHAR_WIDTH = 32;
var E1_CHAR_HEIGHT = 32;
/*
var E1_START_X = 500;
var E1_START_Y = 900;
var E1_SPRITE_START_X = 0;
var E1_SPRITE_START_Y = 0;
var E1_SPRITE_WIDTH = 64;
*/

//Ground
var GROUND_PATH_CHAR = "sprites/ground.png";
/*
var GROUND_WIDTH = 500;
var GROUND_HEIGHT = 500;
var GROUND_START_X = 0;
var GROUND_START_Y = 0;
var GROUND_SPRITE_START_X = 0;
var GROUND_SPRITE_START_Y = 0;
var GROUND_SPRITE_WIDTH = 500;
*/
//Cloud
var CLOUD_PATH_CHAR = "sprites/Clouds.png";
/*
var CLOUD_WIDTH = 500;
var CLOUD_HEIGHT = 500;
var CLOUD_START_X = 0;
var CLOUD_START_Y = 0;
var CLOUD_SPRITE_START_X = 0;
var CLOUD_SPRITE_START_Y = 0;
var CLOUD_SPRITE_WIDTH = 500;
*/

//Preloading
var TEXT_PRELOADING = "Loading ...",
    TEXT_PRELOADING_X = 500,
    TEXT_PRELOADING_Y = 500;