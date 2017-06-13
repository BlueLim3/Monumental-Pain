/* Load.js
 * 6/13/2017
 * This file contains the Load state it it displays the loading bar
 * and Loads all assets in the game, once all loading is complete
 * and the music is decoded it will begin the Title state
*/


var Load = function(game) {};

Load.prototype = {



   preload: function() {

      console.log("Load: preload");

      

      // Loading bar, contains a label that sais loading and the bar fills in using built in Phaser functions

      let loadLabel = game.add.text(game.world.centerX, game.world.centerY - 36, "Loading...", {font:"Courier",fontSize: "32px", fill: "white"});
      loadLabel.anchor.set(0.5);
      game.preloadBar = game.add.sprite(game.world.centerX - 100, game.world.centerY, 'bar');
      game.load.setPreloadSprite(game.preloadBar);


      // align the game window to center of webpage
      game.scale.pageAlignHorizontally = true;

      game.scale.pageAlignVertically = true;

      

      // an array of keys and files; listed in pairs i.e. ['key', 'key.file',...]
      // Varius images
      let imgList = ['collider','collider.png','kevn-bg','kevn-bg.png','textbox','textbox.png','titleart','TitleArt.png', 'gameOver', 'gameOver.png','hatu-bg','hatu-bg.png','boss-bg','boss-bg.png','healthbar','healthbar.png','healthbarback','healthbarback.png'];
      
      // cutscenes
      let sceneList = ['cutscene1','cutscene1.png'];

      // sprites that are not part of spritesheets
      let spriteList = ['arrow','crossbowBolt.png','swordImpact','swordImpact.png','smallWeaponImpact','smallweaponImpact.png','arrowImpact','arrowImpact.png','crossbowMuzzleEffect','crossbowMuzzleEffect.png'];

      // spritesheets
      let sheetList = ['platHero','hero-tall.png',64,64,'axeMan-enemy','axeMan.png',64,64,'swordsMan-enemy','swordsMan.png',64,64,'lesserDemon','lesserDemon.png',64,64,'overallDude-npc','overallDude.png',64,64,'skirtDudette-npc','skirtDudette.png',64,64,'bossDemon','bossDemon.png',340,340,'hero','hero.png',32,32,'baddie','baddie.png',32,32,'darkWizard','darkWizard.png',64,64];

      // tilesets
      let tilesetList = ['oworld-tile','oworld-tile.png','forest-tile','forest-tile.png','ice-tile','ice-tile.png','mountain-tile','mountain-tile.png'];

      // JSON files
      let jsonList = ['oworld','oworld-complete.json','forestbattle','forest-battle.json','forestbattle2','forest-battle2.json','kevn1-map','kevn1.json','kevn2-map','kevn2.json','xanzik1-map','xanzik1.json','ice1-map','ice-platform1.json','hatu1-map','hatu1.json','herosanctuary','hero-sanctuary.json','boss-battle','demon-battle.json','mountainbattle1','mountain-battle1.json','mountainbattle2','mountain-battle2.json','hatubattle','hatu-battle.json','plainsbattle1','plains-battle1.json','hatu2-map','hatu2.json','kevnbattle','kevn-battle.json'];

      // music
      let musicList = ['oworld-song','overworld.ogg','battle-song','engage.ogg','title-song','savior-among-us.ogg','gameover-song','failure.ogg','boss-song','all-ends-here.ogg'];
      
      // sound effects
      let sfxList = ['bump','collide.ogg','attackSound','attack.ogg','jumpSound','jump.ogg','transformation','transformation.ogg','bossAttackSound','big-crash.ogg','boss-roar','roar.ogg'];

      

      // load backgrounds and stuff
      game.load.path = 'assets/img/';

      for(let i=0; i<imgList.length; i+= 2) {game.load.image(imgList[i],imgList[i+1]);}
      
      // load cutscene backgrounds
      game.load.path = 'assets/img/cutscenes/';

      for(let i=0; i<sceneList.length; i+= 2) {game.load.image(sceneList[i],sceneList[i+1]);}

      // load sprite graphics
      game.load.path = 'assets/img/sprites/';

      for(let i=0; i<spriteList.length; i+= 2) {game.load.image(spriteList[i],spriteList[i+1]);}

      // Load spritesheets
      for(let i=0; i<sheetList.length; i+= 4) {game.load.spritesheet(sheetList[i],sheetList[i+1],sheetList[i+2],sheetList[i+3]);}

      // load tilesets
      game.load.path = 'assets/img/tilesets/';
      for(let i=0; i<tilesetList.length; i+= 2) {game.load.image(tilesetList[i],tilesetList[i+1]);}


      // load json data
      game.load.path = 'assets/json/';

      for(let i=0; i<jsonList.length; i+= 2) {game.load.tilemap(jsonList[i],jsonList[i+1],null,Phaser.Tilemap.TILED_JSON);}


      // load music
      game.load.path = 'assets/audio/';
      for(let i=0; i<musicList.length; i+= 2) {game.load.audio(musicList[i],musicList[i+1]);}

      // load sfx
      game.load.path = 'assets/audio/sfx/';

      for(let i=0; i<sfxList.length; i+= 2) {game.load.audio(sfxList[i],sfxList[i+1]);}

      

      //Scale the game based on window size
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

      game.scale.setMinMax(400, 300, 1200, 900);

   },

   create: function() {

      console.log("Load: create");

   },

   update: function() {

      //wait for songs to decode before begining title state

      if(this.cache.isSoundDecoded('battle-song')) {

         game.state.start('Title');

      }

   }

}
