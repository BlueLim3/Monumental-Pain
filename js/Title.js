/* Title.js
 * 6/13/2017
 * This file contains the Title state which has the title menu, the title menu includes
 *    Background art
 *    Play Button
 *    Help button
 *    Music toggle button
 *    Continue game button if there is save data
*/


var Title = function(game){
   var playButton, helpButton, continueButton, song, restart = false;
};

Title.prototype = {
   create: function() {
      console.log('Title: create');

      // stop all other sounds so we don't get weird overlap
      game.sound.stopAll();

      // Create background art on title screen
      game.add.image(0,0, 'kevn-bg');
      game.add.image(0,0, 'titleart');

      // make the buttons appear and asign them variables, position given in the declaration is irreleven
      // as they will be repositioned in after they are fixed to the camera
      playButton = game.add.text(0, 0, " ~New Game~ ", MAIN_BUTTON_TEXT_STYLE);
      helpButton = game.add.text(0, 0, " ~Help~ ", MAIN_BUTTON_TEXT_STYLE);
      musicButton = game.add.text(0, 0, global_playMusic? " ~Turn Music Off~ ":" ~Turn Music On~ ", MAIN_BUTTON_TEXT_STYLE);

      // Double check that text appears in the right area of the camera
      playButton.fixedToCamera = true;
      playButton.cameraOffset.setTo((game.camera.width/2)+170, game.camera.height/2 + 40);
      helpButton.fixedToCamera = true;
      helpButton.cameraOffset.setTo((game.camera.width/2)+170, game.camera.height/2 + 80);
      musicButton.fixedToCamera = true;
      musicButton.cameraOffset.setTo((game.camera.width/2)+170, game.camera.height/2 + 120);

      // set anchors so that they appear centered
      playButton.anchor.set(0.5);
      helpButton.anchor.set(0.5);
      musicButton.anchor.set(0.5);

      // Allow input so that they can be used as buttons
      playButton.inputEnabled = true;
      helpButton.inputEnabled = true;
      musicButton.inputEnabled = true;

      // when the mouse hovers over either button, it will call a function to change the background color
      playButton.events.onInputOver.add(this.over, this);
      helpButton.events.onInputOver.add(this.over, this);
      musicButton.events.onInputOver.add(this.over, this);

      // moving the mouse off the button will change it back
      playButton.events.onInputOut.add(this.out, this);
      helpButton.events.onInputOut.add(this.out, this);
      musicButton.events.onInputOut.add(this.out, this);

      // if the player clicks on the help button, go to function this.help
      helpButton.events.onInputDown.add(this.help, this);

      // if the player clicks on the play button go to function this.play
      playButton.events.onInputDown.add(this.newGame, this);

      // if the player clicks the music button go to function this.music
      musicButton.events.onInputDown.add(this.music, this);
      
      // Add the continue button, if there is save data
      if(global_save_point > 0) {
         //Perform all of the actions on the continue button simultaneously to avoid
         //repetitive if statements
         continueButton = game.add.text(game.world.centerX, game.world.centerY - 64, " ~Continue~ ", MAIN_BUTTON_TEXT_STYLE);
         continueButton.fixedToCamera = true;
         continueButton.cameraOffset.setTo((game.camera.width/2)+170, game.camera.height/2 );
         continueButton.anchor.set(0.5);
         continueButton.inputEnabled = true;
         continueButton.events.onInputOver.add(this.over, this);
         continueButton.events.onInputOut.add(this.out, this);
         continueButton.events.onInputDown.add(this.continueGame, this);
      }

      // add the song and begin playing it if music is toggled on
      song = this.add.audio('title-song');
      if(global_playMusic) song.play('', 0, 1, true);
   },

   over: function(item) {
      // change text color
      item.fill = "#EFEBCE";
   },

   out: function(item) {
      // reset to original text color
      item.fill = MAIN_BUTTON_TEXT_STYLE.fill;
   },

   help: function() {
      // creates a text box to explain the game

      let textObj = TEXT_DATA[HELP];
      textBox(game, game.camera.width/2, game.camera.height/2, 0.5, 0.5, NAVIGABLE, textObj);
   },

   music: function(item) {
      // toggles music and changes label
      global_playMusic = !global_playMusic;
      if(global_playMusic){ 
         item.text = " ~Turn Music Off~ ";
         song.play('', 0, 1, true);
      }
      else {
         item.text = " ~Turn Music On~ ";
         game.sound.stopAll();
      }
   },

   // this function will reset all progress and start a new game
   newGame: function() {
       game.sound.stopAll();
       //restart player's progress, if any exists
       global_save_point = 0;
       //play the first cutscene
       game.state.start('Cutscene');
   },
   
   // like newGame but it does not reset progress
   continueGame: function() {
      game.sound.stopAll();
      //play the most recent cutscene
      game.state.start('Cutscene');
   }
}