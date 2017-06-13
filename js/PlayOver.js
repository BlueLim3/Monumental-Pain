/* PlayOver.js
 * 6/13/2017
 * This file contains the PlayOver state.
 * The PlayOver state is one of the two primary gameplay states,
 * in this state the player is on a top down view of the world which
 * doubles as a map. In this map the player can move around, enter towns
 * or encounter enemies, any situation which involves entering a place will
 * start the PlayPlatform state where are npcs, buildings, and battle occur
*/

// canSpawn needs to be global but is never called outside this file
// so it remains here instead of in main.js
var canSpawn;

var PlayOver = function(game) {
   // declare all variables local to PlayOver
   var map, mapData, layer1, layer2, layer3, player, wall, town, townGroup, playerGroup, timer, song, textObj, spawnGroup, foeGroup, eventGroup;
};
PlayOver.prototype = {
   create: function() {
      console.log("PlayOver: create");
      
      //fade camera instantly, makes screen black while creating things
      game.camera.fade(0x000000, 1);
      
      // Set relevent globals to false to prevent the player from instantly entering another state
      // this is especially useful when going from PlayPlatform to PlayOver
      canEnter = false;
      canSpawn = false;

      // TIMER SETUP
      // The timer is mainly used to control when the player can move and what can spawn
      timer = game.time.create(); 

      timer.add(600, function(){
         console.log('canEnter = true at: '+timer.ms);
         canEnter = true;
      }, this);

      // Delay over world enemy spawn
      timer.add(2200, function(){
         console.log('canSpawn = true at: '+timer.ms); 
         canSpawn = true;
      }, this);
      timer.start();
      
      // set the map data to come from the overworld tilemap
      mapData = GLOBAL_MAP_DATA[O_WORLD];
      
      //TILEMAP SETUP
      map = game.add.tilemap(mapData.mapKey);
      
      map.addTilesetImage(mapData.setKey,mapData.setKey);
      
      layer1 = map.createLayer('water');
      layer2 = map.createLayer('base');
      layer3 = map.createLayer('overlay');
      
      //WALLMAP SETUP
      // all tiles not listed can be colided with
      map.setCollisionByExclusion([6,21,24], true, layer2);
      map.setCollisionByExclusion([1,2,3,4,17,18,20,35,36,51,52,66,86,87,99,100,102,103,115,116], true, layer3);
      
      // resize the world bounds to fit the tilemap
      layer1.resizeWorld();

      //CREATE DOORS
      // the doors are used to sent the player to the next map, from the overworld it will always
      // change states to PlayPlatform
      townGroup = this.game.add.group();
      townGroup.enableBody = true;
      
      var doors = map.objects.towns;

      // the Door prefab can be found in Door.js
      for(let i = 0; i < doors.length; i++) {
         let obj = doors[i];
         
         town = new Door(game, obj.x, obj.y, obj.type, obj.width, obj.height, obj.properties.retX, obj.properties.retY);
         townGroup.add(town);
      }
      // sets all of the doors to be invisible and immovable, the player will see the tile art under them
      townGroup.alpha = 0;
      townGroup.setAll('body.immovable', true);
      
      //ENEMY SPAWNS
      spawnGroup = this.game.add.group();
      spawnGroup.enableBody = true;
      
      // foeGroup stores the actual enemy sprites
      foeGroup = this.game.add.group();
      foeGroup.enableBody = true;
      
      var foemap = map.objects.foemap;

      // enemySpots has the locations of individual enemies in Tiled info 
      // gets stored in each foemapBuild so they can create their own enemies
      var enemySpots = map.objects.enemySpots;
      
      for(let i = 0; i < foemap.length; i++) {
         let obj = foemap[i];
         
         let zone = new foemapBuild(game,obj,enemySpots);
         spawnGroup.add(zone);
      }
      
      // sets the spawn locations to be invisible and immovable
      spawnGroup.alpha = 0;
      spawnGroup.setAll('body.immovable', true);
      
      // EVENTS
      eventGroup = this.game.add.group();
      eventGroup.enableBody = true;
      
      // the events field of map data contains functions to execute
      // these are usually empty but can progress the story or initiate events
      // in the game, the transformation of the final boss is a key example
      for(let i = 0; i < map.objects.events.length; i++) {
         let obj = map.objects.events[i];
         
         let event = new Event(game, obj.x, obj.y, obj.width, obj.height, i);
         eventGroup.add(event);
      }
      
      // make the events objects invisible and immovable
      eventGroup.alpha = 0;
      eventGroup.setAll('immovable',true);
      
      // PREFAB SETUP
      // first we create the player
      playerGroup = this.game.add.group();
      
      // spritePlayOver is the prefab for the overworld sprite
      player = new spritePlayOver(this.game,global_x,global_y,'hero');

      // this line adds the player onto the screen
      playerGroup.add(player);

      // camera will follow the player
      game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, .3, .3);
      
      // play music if it is on
      song = this.add.audio('oworld-song');
      if(global_playMusic) song.play('', 0, 1, true);

      //fades camera back in
      game.camera.resetFX();
      game.camera.flash(0x000000, 500);
   },


   update: function() {
      // set collision with the player and the appropriate parts of the tilemap
      game.physics.arcade.collide(player, layer2);
      game.physics.arcade.collide(player, layer3);
      
      // Calls events on overlaps, this will allow entering towns, enemies appearing in spawn zones
      // and any events from mapData
      game.physics.arcade.overlap(player, townGroup, this.enterTown, null, this);
      game.physics.arcade.overlap(player, spawnGroup, this.spawnFoe, null, this);
      game.physics.arcade.overlap(player, eventGroup, this.callEvent, null, this);
      
      //Foe collisions, if any foes exist at the time
      if(foeGroup.children.length > 0) {
         game.physics.arcade.collide(foeGroup, layer2);
         game.physics.arcade.collide(foeGroup, layer3);
         game.physics.arcade.collide(foeGroup, foeGroup);

         // if the player overlaps with a foe, they are sent to a platform battle
         game.physics.arcade.overlap(player,foeGroup,this.enterBattle,null,this);
      }

      // The pause menu will open when the player hits the escape key
      if(game.input.keyboard.justPressed(Phaser.Keyboard.ESC) && canPause){
         pauseMenu(game);
      }
   },

   // this function is called to send the player to a town
   enterTown: function(player, townGroup) {
      // send the player to the correct map
      global_destination = townGroup.destination;

      // mark the overworld spawn position as being near the town that was just entered
      global_x = townGroup.retX;
      global_y = townGroup.retY;
      
      // this will prevent the player from moving
      canEnter = false; 
      player.body.velocity.set(0,0);
      
      //stops all sounds
      game.sound.stopAll();
      
      // after the camera fades out, enter the PlayPlatform state
      game.camera.fade();
      timer = game.time.create();
      timer.add(480, function() {
         game.state.start('PlayPlatform');
      }, this);
      timer.start();
   },

   // if the player does trigger a map data event, this function will
   // get the specific function that was triggered
   callEvent: function(player, event) {
      mapData.events[event.execute]();
   },

   // creates an enemy in the spawn zone
   spawnFoe: function(player, foemap) {
      // canSpawn has a timer so that an enemy cannot spawn on top of a player that just
      // escaped from the platform world
      if(foemap.active === false && canSpawn) {
         
         foemap.active = true;
         
         // foemap.size limits the amount of enemies that can spawn in a particular spawn zone
         for(let i = 0; i < foemap.size; i++) {
            let foe = new oworldEnemy(game,foemap.enemySpots[i],foemap);
         
            foeGroup.add(foe);
            foemap.activeFoes++;
         }
         
      }
   },

   // this will start a platform battle when the player encounters a foe
   enterBattle: function(player, foe) {
      // set which platform battle map to enter and set return position near 
      // where the encounter occured
      global_destination = foe.destination;
      global_x = player.body.position.x + 16;
      global_y = player.body.position.y + 16;
      
      //prevents player from moving
      canEnter = false; 
      player.body.velocity.set(0,0);
      
      //stops all sounds
      game.sound.stopAll();
      
      // enter PlayPlatform after the fadeout
      game.camera.fade();
      timer = game.time.create();
      timer.add(480, function() {
         game.state.start('PlayPlatform');
      }, this);
      timer.start();
   }
}