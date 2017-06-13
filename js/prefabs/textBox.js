/* textBox.js
 * 6/13/2017
 * This file is a prefab for creating textboxes which are used both while
 * interacting with npcs, and during cutscenes. Textboxes rely on objects from
 * textData.js
*/

var textBox = function(game, x, y, anchorX, anchorY, navigable, textDataObj){
   console.log("textBox.create");
   // declaring properties of textboxes
   this.counter = 0;
   this.text = game.add.text(x, y, textDataObj.text[counter], textDataObj.style);
   this.text.text = textDataObj.text[counter] + "\n\n 'E' to continue";
   this.text.anchor.set(anchorX, anchorY);
   this.text.fixedToCamera = true;
   this.text.cameraOffset.setTo(x, y);
   //console.log("textBox placed");
   canPause = false;
   //if(!game.paused) game.paused = true;
   game.physics.arcade.isPaused = true;
   canEnter = false;
   
   let timer = game.time.create();
   timer.add(200, function() {
      canEnter = true;
   }, this);
   
   // originally used window.onkeydown when we were using game.paused, we are using
   // a different system now but this system remains effective
   window.onkeydown = function(event){
      var keyCode = event.keyCode || event.which;
      
      if(keyCode === Phaser.Keyboard.E){
         
         if(counter < textDataObj.text.length-1){ // I'm not completely sure why the minus one is necessary but it is
            counter++;
            this.text.text = textDataObj.text[counter] + "\n\n 'E' to continue";
         }
         else {
            textDataObj.after();
            this.text.destroy();
            counter++;
            game.physics.arcade.isPaused = false;
            
            //start the timer to set canEnter to true again
            timer.start();
            
            canPause = true;
         }
      }
      else if(keyCode === Phaser.Keyboard.ESC && navigable){
            this.text.destroy();
            counter++;
            game.physics.arcade.isPaused = false;
            
            //start the timer to set canEnter to true again
            timer.start();
         
            canPause = true;
      }
      else if(keyCode === Phaser.Keyboard.Q && navigable){
         if(counter > 0){
            counter--;
            this.text.text = textDataObj.text[counter] + "\n\n 'E' to continue";
         }
      }
   }

}
