/* Monumental Pain
 * A game created by Syzygy
 * Jacob Wynd, Kevin Wu, Kiefer Nemeth, and Kindon Smith
 * main.js
 * 6/13/2017
 * This file contains global control variables, the creation of the game object, 
 * it also adds all states and starts the Boot state
*/

// Global control variables, used to track infromation across states

var game;                      // Variable used to hold the game object
var global_destination;        // Use this variable to set where we are going
var global_x = 508;            // Holds the x position on the overworld map
var global_y = 448;            // Holds the y position on the overworld map
var global_playMusic = true;   // A toggle true if the music is supposed to be playing
var canPause = true;           // This is used to ensure that multiple pause menus cannot be opened
var global_save_point = 0;     // Checkpoint in game, allows the player to continue playing from a certain point after game over
var canEnter;                  // CanEnter actually determines whether or not the player has control over the carachter, the name is a holdover

window.onload = function() {

   game =  new Phaser.Game(800, 600, Phaser.CANVAS);

   // define states
   game.state.add('Boot', Boot);                 // Found in Boot.js
   game.state.add('Load', Load);                 // Found in Load.js
   game.state.add('Title', Title);               // Found in Title.js
   game.state.add('PlayOver', PlayOver);         // Found in PlayOver.js
   game.state.add('PlayPlatform', PlayPlatform); // Found in PlayPlatform.js
   game.state.add('GameOver', GameOver);         // Found in GameOver.js
   game.state.add('Cutscene', Cutscene);         // Found in Cutscene.js
   game.state.add('Victory', Victory);           // Found in Victory.js
   game.state.start('Boot');
   
}