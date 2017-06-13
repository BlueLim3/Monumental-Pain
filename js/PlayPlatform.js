/* PlayPlatform.js
 * 6/13/2017
 * This file contains the PlayPlatform state.
 * The PlayPlatform state is one of the two primary gameplay states,
 * in this state, the player will interact with npc's and engage in battle
 * in a sidescrolling platformer world. Much of the story and more traditional
 * gameplay occurs in this state
*/

// globals that are only called in PlayPlatform.js
var canShoot = true;
var spawnBoss = false;

var PlayPlatform = function(game) {
   // declare all local variables
    var player, map, bg, layer1, layer2, layer3, enemyGroup, bossGroup, textObj, bulletGroup, killZone, deathExists, playerHealthText, playerHealthBar, playerHealthBarBack, eventGroup, checkEvents, mapObj;
    // declare local variables with pre-assigned values
    var onHitKey = 0;
};
PlayPlatform.prototype = {
   create: function() {
      //for boss testing
      //global_save_point = 8;
      console.log("PlayPlatform: create");

      // fades camera instantly, black while creating things
      game.camera.fade(0x000000, 1);

      // acces the appropriate index of GLOBAL_MAP_DATA based on the
      // global variable set by the Door in Overworld state this
      // will ensure the correct map is drawn
      mapObj = GLOBAL_MAP_DATA[global_destination];
      
      //TILEMAP SETUP
      map = game.add.tilemap(mapObj.mapKey);
      
      map.addTilesetImage(mapObj.setKey, mapObj.setKey);
      
      // static background
      bg = this.add.sprite(0,0,mapObj.bgKey); 
      bg.fixedToCamera = true;

      // layer creation
      layer1 = map.createLayer('bg');
      layer2 = map.createLayer('ground');
      layer3 = map.createLayer('passable');
      
      // collide with everything in layer2
      map.setCollisionByExclusion([],true,layer2);
      
      // resize the world to fit the size of the tilemap
      layer2.resizeWorld();

      // EXIT GATE
      // the edges of the map are doors that take you back to the overworld
      screenEdges = this.game.add.group();
      screenEdges.enableBody = true;
      
      edges = map.objects.edges;
      
      // Cycle through each object in the "edges" layer of the json file
      // create an invisible Door object in the world for each
      for(let i = 0; i < edges.length; i++) {
         let obj = edges[i];
         
         door = new Door(game, obj.x, obj.y, obj.type, obj.width, obj.height);
         screenEdges.add(door);
      }
      
      screenEdges.alpha = 0;
      screenEdges.setAll('immovable',true);
      
      // KILL ZONE
      // these kill zones are usually at the bottom of endless falls
      deathExists = false;
      
      if(map.objects.death != undefined) {
         deathExists = true; //Tell the game to check for overlaps in update
         
         killZone = this.game.add.group();
         killZone.enableBody = true;
         
         var obj = map.objects.death[0];
         var death = new Door(game, obj.x, obj.y, obj.type, obj.width, obj.height);
         killZone.add(death);
         killZone.alpha = 0;
         killZone.setAll('immovable',true);
      }
      
      // DOORS
      // doors can lead to other platform maps
      doorSpots = this.game.add.group();
      doorSpots.enableBody = true;
      
      doors = map.objects.doors;
      
      // Cycle through each object in the "doors" layer of the json file
      // create an invisible Door object in the world for each
      for(let i = 0; i < doors.length; i++) {
         let obj = doors[i];
         
         door = new Door(game, obj.x, obj.y, obj.type, obj.width, obj.height);
         doorSpots.add(door);
      }
      
      doorSpots.alpha = 0;
      doorSpots.setAll('immovable',true);
      
      // EVENTS
      checkEvents = false; //by default
      
      if(map.objects.events != undefined) { // true if there are events to check overlaps for
         
         // create a group for events
         checkEvents = true;
         eventGroup = this.game.add.group();
         eventGroup.enableBody = true;
         
         // check through all events
         for(let i = 0; i < map.objects.events.length; i++) {
            let obj = map.objects.events[i];
            // add these events to the group
            let event = new Event(game,obj.x,obj.y,obj.width,obj.height,obj.type);
            eventGroup.add(event);
         }
         
         // make the events invisible and immovable
         eventGroup.alpha = 0;
         eventGroup.setAll('immovable',true);
      }

      // PREFAB SETUP
      var playerGroup = this.game.add.group();
      
      let spawnLayer = map.objects.spawn;
      let playerX = spawnLayer[0].x;
      let playerY = spawnLayer[0].y;
      
      // add the player to the world
      player = new spriteBuild(this.game,1,1,playerX,playerY,'platHero');
      playerGroup.add(player);
      player.body.gravity.y = 1500;
      player.body.collideWorldBounds = true;

      game.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER, .3, .3);

      // ENEMY SPAWNING
      enemyGroup = this.game.add.group();
      bossGroup = this.game.add.group();
      
      var enemyLayer = map.objects.enemies;
      
      for(let i = 0; i < enemyLayer.length; i++) {
         let obj = enemyLayer[i];
         // adds enemies to the tilemaps position bassed on their names
         let enemy;
         if(obj.name === 'demonSpawner'){
            let timer = game.time.create();
            
            timer.add(15000, function() {
               this.spawnEnemyEvent(obj.x,obj.y,obj.name,10000);
            }, this);
            timer.start();
            //this.spawnEnemyEvent(obj.x,obj.y);
         } else if(obj.name === 'swordsManSpawner'
           || obj.name === 'axeManSpawner')
         {
            this.spawnEnemyEvent(obj.x,obj.y,obj.name,4000);
         } else{
            if(obj.name === 'axeMan') {
               enemy = new axeMan(this.game, 1, 1, obj.x, obj.y, 'axeMan-enemy');
            } else if(obj.name === 'swordsMan') {
               enemy = new axeMan(this.game, 1, 1, obj.x, obj.y, 'swordsMan-enemy');
            } else if(obj.name === 'lesserDemon') {
               //enemy = new lesserDemon(this.game, 1, 1, obj.x, obj.y, 'lesserDemon');
            } else if(obj.name === 'darkWizard') {
               enemy = new wizardBuild(this.game, 1, 1, obj.x, obj.y, 'darkWizard');
            }
            enemyGroup.add(enemy);
            enemyGroup.setAll('body.collideWorldBounds', true);
         }
      }
      
      // set appropriate properties to all types of enemies
      enemyGroup.setAll('body.gravity.y', 1500);
      
      // NPC SPAWNING
      npcGroup = this.game.add.group();
      
      var npcLayer = map.objects.npcs;
      
      if(npcLayer.length > 0) {
      for(let i = 0; i < npcLayer.length; i++) {
         let obj = npcLayer[i];
         // spawn npcs based on their names in the objet layers
         let npc;
         if(obj.name === 'dude') {
            npc = new overallDude(this.game, 1, 1, obj.x, obj.y, 'overallDude-npc', 0, obj.type, obj.properties.moves);
         } else if(obj.name === 'dudette') {
            npc = new skirtDudette(this.game, 1, 1, obj.x, obj.y, 'skirtDudette-npc', 0, obj.type, obj.properties.moves);
         }
         npcGroup.add(npc);
      }
      }
      
      // set properties for all npcs
      npcGroup.setAll('body.gravity.y', 1500);
      npcGroup.setAll('body.collideWorldBounds', true);

      // PLAYER UI ELEMENTS
      // create health bar
      playerHealthText = game.add.text(400, 30, "Health:", {font:"Courier", fontSize: "26px", fill: "white"});
      playerHealthText.fontWeight = 'bold';
      playerHealthText.stroke = '#000000';
      playerHealthText.strokeThickness = 6;
      playerHealthText.anchor.setTo(.5);
      playerHealthText.fixedToCamera = true;

      playerHealthBarBack = game.add.sprite(400, 64, 'healthbarback');
      playerHealthBarBack.anchor.setTo(.5);
      playerHealthBarBack.fixedToCamera = true;

      playerHealthBar = game.add.sprite(400, 64, 'healthbar');
      playerHealthBar.anchor.setTo(.5);
      playerHealthBar.fixedToCamera = true;
      playerHealthBar.scale.setTo(1, 1);      

      // BULLETS
      // bullets are actually the crossbow bolts, which are generated by the crossbow
      bulletGroup = this.game.add.group();
      bulletGroup.enableBody = true;

      // play music if its toggled on
      song = this.add.audio(mapObj.music);
      if(global_playMusic) song.play('', 0, 1, true);
      if(global_save_point === 9) song.pause();     // this makes the sound effects for the boss battle work

      // add in the attacking sound effect used in both sword and crossbow
      this.attackSound = game.add.audio('attackSound');

      //fades camera back in
      game.camera.resetFX();
      game.camera.flash(0x000000, 500);
      
      //allow player to move
      canEnter = true;

   },
   update: function() {

      //Spawn the boss if the global is active, then set it false again
      if(spawnBoss) {
         let boss = new bossDemonBuild(this.game,1,1,1216,476,'bossDemon');
         
         bossGroup.add(boss);
         
         boss.body.gravity.y = 1500;
         boss.body.collideWorldBounds = true;
         
         spawnBoss = false;
      }

      //scale player's health bar to match its current health
      playerHealthBar.scale.setTo(player.health/4, 1);

      //updates collision physics
      //checks mouse pressed and overlap, kills the enemy if true.
      if ( game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
         if(player.weapon === 'sword') {
            game.physics.arcade.overlap(player.sword, enemyGroup, this.weaponAttack, null, this);
            game.physics.arcade.overlap(player.sword, bossGroup, this.weaponAttack, null, this);
         }
         else if(player.weapon === 'crossbow' && canShoot) {
            canShoot = false;
            // make the arrows spawn at the correct location
            // the spawn location adjusts according to where the player
            // is facing.
            let fireLocationX = 0;
            let fireLocationY = 0;            
            if ( player.direction == 1 ) {
               fireLocationX = player.body.position.x + 35;
               fireLocationY = player.body.position.y + 30;
            } else if ( player.direction == -1 ) {
               fireLocationX = player.body.position.x - 25;
               fireLocationY = player.body.position.y + 30;               
            }
            let bullet = new bulletBuild(this.game,fireLocationX,fireLocationY,player.direction);
            this.muzzleFlash(bullet);
            this.attackSound.play();

            // create a timer to limit the speed with witch one can fire a crossbow
            let reset = game.time.create();
            reset.add(350, function(){
               canShoot = true;
            }, this);
            reset.start();
            // add the bullet to the bullet group (I know crossbows fire bolts, just go with it)
            bulletGroup.add(bullet);
         }
      }
      // set collisions between all characters and the map layer
      game.physics.arcade.collide(player, layer2);
      game.physics.arcade.collide(enemyGroup, layer2);
      game.physics.arcade.collide(bossGroup,layer2);
      game.physics.arcade.collide(npcGroup, layer2);

      // kill the bullet on collision with an enemy
      game.physics.arcade.collide(bulletGroup, layer2, this.killBullet, null, this);
      
      //Check for death zone
      if(deathExists) {
         game.physics.arcade.overlap(player, killZone, this.gameover, null, this);
      }

      //Check for events on the stage
      if(checkEvents) {
         game.physics.arcade.overlap(player, eventGroup, this.callEvent, null, this);
      }
      
      //Bullets hitting enemies
      if(bulletGroup.children.length > 0) {
         game.physics.arcade.overlap(bulletGroup, enemyGroup, this.bulletHit, null, this);
         game.physics.arcade.overlap(bulletGroup, bossGroup, this.bulletHit, null, this);
      }

      // Walking off the edge of the screen to enter Overworld
      game.physics.arcade.overlap(player, screenEdges, this.enterOver, null, this);
      
      // Make an 'E' appear over the player if overlapping with a door or NPC
      // the player will press 'E' to interact
      if(game.physics.arcade.overlap(player, npcGroup) 
         || game.physics.arcade.overlap(player, doorSpots)) {
         
         player.notifier.visible = true;
      } else {
         player.notifier.visible = false;
      }
      
      // Using doors/NPCs on map
      if(game.input.keyboard.justPressed(Phaser.Keyboard.E) && canEnter) {
         game.physics.arcade.overlap(player, npcGroup, this.interactNPC, null, this);
         if(canEnter) {
            game.physics.arcade.overlap(player, doorSpots, this.enterDoor, null, this);
         }
      }

      // implement the pause menu in the platform world as well
      if(game.input.keyboard.justPressed(Phaser.Keyboard.ESC) && canPause){
         pauseMenu(game);
      }

      // game over if player dies
      if(player.health <= 0){
         game.state.start('GameOver');
      }
   },
   // called when the sword hits the enemy sword does more damage than crossbow
   weaponAttack: function(weapon, enemy) {

      console.log(enemy);
      // make the sword impact sprite visible
      player.swordImpact.alpha = 1;
      // fade out the impact sprite right after 200 milliseconds
      game.time.events.add(200, this.fadePlayerSwordImpact, this);

      // make the enemy's sprite flash red to indicate enemy is taking damage
      enemy.tint = 0xff0000;
      game.time.events.add(200,function() {enemy.tint = 0xffffff},this);

      enemy.health -= 2;
   },
   // called when a bullet hits the enemy
   bulletHit: function(bullet,enemy) {
      // create an impact sprite where the bullet hit
      let arrowImpact = game.add.sprite(bullet.position.x, bullet.position.y, 'arrowImpact');
      arrowImpact.anchor.set(.5,.5);
      arrowImpact.scale.set(1,1);
      // set the correct orientation for the arrow impact sprite
      if ( bullet.direction == 1 ) {
         arrowImpact.scale.set(1,1);
      } else if ( bullet.direction == -1 ) {
         arrowImpact.scale.set(-1,1);
      }
      // fades the arrow impact sprite in 100 milliseconds
      game.add.tween(arrowImpact).to( { alpha: 0 }, 100, Phaser.Easing.Linear.None, true);
      // delete the impact sprite after it has faded out to free up memory
      game.time.events.add(200, function(){arrowImpact.destroy();}, this);

      // make the enemy's sprite flash red to indicate enemy is taking damage
      enemy.tint = 0xff0000;
      game.time.events.add(200,function() {enemy.tint = 0xffffff},this);

      enemy.health -= 1;
      bullet.kill();
   },   
   // called when the timer from weaponAttack: function(weapon, enemy) expires
   fadePlayerSwordImpact: function() {
      // fades the sword impact sprite in 100 milliseconds
      game.add.tween(player.swordImpact).to( { alpha: 0 }, 100, Phaser.Easing.Linear.None, true);
   },
   // called whenever the player fires an arrow
   // it spews dust out of the crossbow
   muzzleFlash: function (bullet) {
      // create an impact sprite where the bullet hit
      let arrowImpact = game.add.sprite(player.body.position.x + 35, player.body.position.y + 20, 'crossbowMuzzleEffect');
      arrowImpact.anchor.set(.5,.5);
      arrowImpact.scale.set(1,1);
      // set the correct orientation for the arrow impact sprite
      if ( bullet.direction == 1 ) {
         arrowImpact.position.x = player.body.position.x + 35;
         arrowImpact.position.y = player.body.position.y + 20;
         arrowImpact.scale.set(1,1);
      } else if ( bullet.direction == -1 ) {
         arrowImpact.position.x = player.body.position.x - 25;
         arrowImpact.position.y = player.body.position.y + 20;         
         arrowImpact.scale.set(-1,1);
      }
      // fades the arrow impact sprite in 100 milliseconds
      game.add.tween(arrowImpact).to( { alpha: 0 }, 100, Phaser.Easing.Linear.None, true);
      // delete the impact sprite after it has faded out to free up memory
      game.time.events.add(200, function(){arrowImpact.destroy();}, this);    
   },
   // allows the player to talk with the npcs
   interactNPC: function(player, npc) {
      
      canEnter = false;
      player.body.velocity.x = 0;
      player.animations.stop();
      
      textObj = TEXT_DATA[npc.textbox];
      textBox(game, game.camera.width/2, game.camera.height/2, 0.5, 0.5, !NAVIGABLE, textObj);
   },
   // if map data calls for an executable function, this will make sure it happens
   callEvent: function(player, event) {
      //make sure update doesn't call the event more times before it executes
      checkEvents = false;

      //Function drawn from the Global map data
      mapObj.events[event.execute]();
      event.destroy(); //remove the event
      
      //If there aren't any events left, stop checking for overlaps
      if(eventGroup.children.length > 0) {
         checkEvents = true;
      }
   },
   // called to sent the player to the cutscene state
   enterCutscene: function(which) {
      global_save_point = which;

      
      //Enter Cutscene state
      canEnter = false; // removes player control
      
      // fade the camera and start the cutscene after a brief pause
      game.camera.fade(0x000000, 200);
      let timer = game.time.create();
      timer.add(180, function() {
         game.state.start('Cutscene');
      }, this);
      timer.start();
   },
   // used whenever the player enters a door that leads to another platform state
   enterDoor: function(player, door) {
      game.sound.stopAll();
      
      global_destination = door.destination;
      
      canEnter = false; // removes player control 
      player.body.velocity.x = 0; //stops player
      
      // fade camera and restart this state after a pause
      game.camera.fade();
      let timer = game.time.create();
      timer.add(380, function() {
         game.state.start('PlayPlatform');
      }, this);
      timer.start();
   },
   // this is called if the player walks off the side of the map into the overworld
   enterOver: function() {
      game.sound.stopAll();
      
      canEnter = false; // removes player control 
      player.body.collideWorldBounds = false; //lets player walk offscreen
      
      // playover starts after fadeout
      game.camera.fade();
      let timer = game.time.create();
      timer.add(480, function() {
         game.state.start('PlayOver');
      }, this);
      timer.start();
   },
   killBullet: function(bullet) {
      // create an impact sprite where the bullet hit
      let arrowImpact = game.add.sprite(bullet.position.x, bullet.position.y, 'arrowImpact');
      arrowImpact.anchor.set(.5,.5);
      arrowImpact.scale.set(1,1);
      // set the correct orientation for the arrow impact sprite
      if ( bullet.direction == 1 ) {
         arrowImpact.scale.set(1,1);
      } else if ( bullet.direction == -1 ) {
         arrowImpact.scale.set(-1,1);
      }
      // fades the arrow impact sprite in 100 milliseconds
      game.add.tween(arrowImpact).to( { alpha: 0 }, 100, Phaser.Easing.Linear.None, true);
      // delete the impact sprite after it has faded out to free up memory
      game.time.events.add(200, function(){arrowImpact.destroy();}, this);
      bullet.kill();
   },   
   gameover: function() {
      canEnter = false; // removes player control 
      player.body.collideWorldBounds = false; //lets player walk offscreen
      
      // fadeout and start the GameOver state
      game.camera.fade(0x000000, 1000);
      let timer = game.time.create();
      timer.add(950, function() {
         game.sound.stopAll();
         game.state.start('GameOver');
      }, this);
      timer.start();
   },
   //self explanatory function, is recursive on a timer
   spawnEnemyEvent: function(sourceX,sourceY,type,frequency){
      let timer = game.time.create();
      
      let enemy;
      if(type === 'demonSpawner') {
         enemy = new lesserDemon(this.game,1,1,sourceX,sourceY,'lesserDemon');
         if(enemy.body.position.x > 1286) {
            enemy.direction = 1;
         } else {
            enemy.direction = -1;
         }
      } else if(type === 'axeManSpawner') {
         enemy = new axeMan(this.game, 1, 1, sourceX, sourceY, 'axeMan-enemy');
      } else if(type === 'swordsManSpawner') {
         enemy = new axeMan(this.game, 1, 1, sourceX, sourceY, 'swordsMan-enemy');
      }
      enemyGroup.add(enemy);
      enemyGroup.setAll('body.gravity.y', 1500);
      enemyGroup.setAll('body.collideWorldBounds', false);

      timer.add(frequency, function() {
         this.spawnEnemyEvent(sourceX,sourceY,type,frequency);
      }, this);
      timer.start();
      
   },

   /////////////////////////
   //REMOVE IN FINAL BUILD//
   /////////////////////////
   render: function() {
      //uncomment to view player collision info in platform
      //game.debug.bodyInfo(player, 64, 64);
      //game.debug.body(player);
      //game.debug.body(bossDemon);
      // debug every sprite under enemyGroup
      /*
      for ( let i = 0, len = enemyGroup.children.length; i < len; i++ ) {
         game.debug.body(enemyGroup.children[i]);
      }
      */
   }
}