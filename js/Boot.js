/* Boot.js
 * 6/13/2017
 * This file contains the boot state, which loads the minimum assets necessary
 * to create a loading bar then goes into the load state
*/

var Boot = function(game){};

Boot.prototype = {

   preload: function(){

      // Load assets for load bar
      game.load.path= "assets/img/"
      game.load.image("bar", "bar.png");

   },
   create: function(){
      game.state.start('Load');
   }
}