# AirFighter

Created by Phillip McIntyre, 2015

## Description

AirFighter is a top-down shooter in which the player utilizes a futuristic
airship to defend Earth from a horde of suicide-bomber aliens. The player
is tasked with preventing no more than 20 ships to pass them as well as
surviving for as long as possible. If the player collides with an enemy
ship or allows too many ships to pass them, they lose the game.

## Controls

To pilot the craft, use the 'W A S D' buttons or the arrow keys. The 'Spacebar' is
used to fire the main weapons. The enemy ships will attempt to speed past the
player, and it is up to them to prevent the enemy from proceeding.

## Key Points

* The game objects in this game include the player ship, the enemy ship, and the
bullets from the player's cannon. You use either the directional keys or the
 'W A S D' buttons to move the ship around and press 'SpaceBar' to fire bullets.
 Upon colliding with the enemy ship, these bullets will cause the ships to explode.
 If the enemy ship collides with your ship, you lose.
* Score is kept by shooting enemies and keeping those ships from passing you. If
your ship collides with another ship or if other ships pass you, you lose.
* This game requires patience and strategy. The ship only moves so quickly, so you
must plan your attack accordingly. The enemies' goal is not just to attack you, but
to pass you in order to destroy Earth. The ships do not move in straight-line paths,
but use a function of sin(x) to evade attack.

## Run

To run the game, one must open the "index.html" file in Chrome/Chromium (currently, Firefox does not work). The
player will be then prompted by the title screen to begin playing. After every
defeat, the player will have the option of trying again.

The additional files are as follows:
* HTML
  * index.html - main webpage
* Javascript
  * main.js - central file for running the game loop and instantiating important functions and
variables
  * playerChar.js - responsible for most player-based construction
  * enemyChar.js - responsible for enemy unit construction
  * spawn.js - keeps track of enemy unit spawning coordinates and trajectories
  * parallax.js - creates the scrolling background
  * constants.js - keeps basic constants used throughout the other files
* Sprites
  * PlayerShip.png - the player's ship model and spritesheet.
  * EnemyShip1.png - the enemy's ship model and spritesheet.
  * Clouds.png and ground.png - both files make up the parallax background
* Music
  * KingdomHeartsII_PassionSanctuary.mp3 - The title screen music
  * KingdomHeartsII_PassionSanctuaryBattle.mp3 - the main game music
  * FinalFantasyX_ToZanarkand.mp3 - the Game Over music
  * pewpew.wav/.mp3 - sound effect for the main gun shooting
  * Explosion.wav - sound effect for destroyed ships

## Version
>1.0: Support for Chrome/Chromium only. Does not work in Firefox. IE is
currently untested.
