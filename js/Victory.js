/* Victory.js
 * 6/13/2017
 * This file contains victory state which resets all variable and
 * contains a button to send the player back to the main menu
*/
var Victory = function(game){};

Victory.prototype = {
   create: function(){
      console.log("Victory: create");

      // add background
      game.add.image(0, 0, 'boss-bg');
       
      // stop all other sounds so we don't get weird overlap
      game.sound.stopAll();

      // IMPORTANT //
      // Reset all relevent globally tracked variables
      global_x = 512;
      global_y = 448;
      global_save_point = 0; // reset game checkpoints

      // creates the actual button, this one does not have a background fill
      var menuButton = game.add.text(game.world.centerX, game.world.centerY - 64, " ~Main Menu~ ", {font: "Courier", fontSize: "32px", fill: "#EFEBCE"});

      // create credits
      var vicText = game.add.text(0, 0, "VICTORY", {font: "Courier bold", fontSize:"48px", fill:"#238F23"});
      var credits = game.add.text(0, 0, "Monumental Pain\na game by\nJacob Wynd\nKevin Wu\nKiefer Nemeth\nand Kindon Smith\n\nThank you for playing", {font: "Courier", fontSize: "28px", fill: "#EFEBCE", align: "center"});
      vicText.fixedToCamera = true;
      credits.fixedToCamera = true;
      vicText.cameraOffset.setTo(game.camera.width/2, 64);
      credits.cameraOffset.setTo(game.camera.width/2, 96);
      vicText.anchor.set(0.5);
      credits.anchor.set(0.5, 0);

      // set it to the correct position
      menuButton.fixedToCamera = true;
      menuButton.cameraOffset.setTo(game.camera.width/2, game.camera.height - 170);
      menuButton.anchor.set(0.5);

      // allow inputs so it can be used like a button
      menuButton.inputEnabled = true;

      // Governs the color change depending on the position of the mouse
      menuButton.events.onInputOver.add(this.over, this);
      menuButton.events.onInputOut.add(this.out, this);

      // when it is clicked on, return to the main menu
      // clicking continue from the main menu should set the player back to the last checkpoint
      menuButton.events.onInputDown.add(this.menu, this);

      // fade in the camera
      game.camera.resetFX();
      game.camera.flash(0x000000, 500);

      // Play the game over music
      song = this.add.audio('title-song'); // Kiefer replace this song and delete this comment please
      if(global_playMusic) song.play('', 0, 1, true);

   },

   over: function(item) {
      // change text color
      item.fill = "#32CD32"; // lime green
   },

   out: function(item) {
      // reset to original text color
      item.fill = "#EFEBCE";
   },

   menu: function(){
      // start the title state
      game.state.start('Title');
   }
}