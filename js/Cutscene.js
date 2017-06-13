/* Cutscene.js
 * 6/13/2017
 * This file contains the Cutscene state, it takes data from
 * cutscenes.js (not to be confused with this file) in order to
 * play and to progress the story
*/


var Cutscene = function(game) {
   var sceneObj, currentBg;
}
Cutscene.prototype = {
   create: function() {
       //Draw things to the screen based on the data in GLOBAL_CUTSCENE_DATA
       //in the index of whatever global_save_point is currently
       console.log('Cutscene: create');
       
       game.sound.stopAll();
       
       // get cutscene data based on the players progress
       sceneObj = GLOBAL_CUTSCENE_DATA[global_save_point];

       // set the background
       currentBg = this.add.sprite(0,0,sceneObj.bg);
       
       // set where to place the player after the cutscene
       global_destination = sceneObj.dest;
       
       // Play the music if applicable
       var song = this.add.audio(sceneObj.music);
       if(global_playMusic) song.play('', 0, 1, true);
       
       // Finally, display the appropriate text box
       var textObj = TEXT_DATA[sceneObj.text];
       textBox(game, game.camera.width/2, game.camera.height/2 -210, 0.5, 0.5, !NAVIGABLE, textObj);
       
       // the cutscene objects contain a function, execute that function here
       sceneObj.execute();
   },
   update: function() {
       // Can enter becomes true whent the textbox closes
       if(canEnter) {
           game.camera.fade();

           // start the state specified by the cutscene object after fadeout
           let timer = game.time.create();
           timer.add(480, function() {
               game.state.start(sceneObj.state);
           }, this);
           timer.start();
       }
   }
}