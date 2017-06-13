//A global array that stores static data for map loading

const TILE_SIZE = 32;

GLOBAL_MAP_DATA = [
   {
       // 0
       //This is the overworld object
       
       //TILEMAP FILES
       mapKey: 'oworld', //key for tilemap
       setKey: 'oworld-tile',
       
       events: [
          function() {
             //enter boss fight
             if(global_save_point === 8) {
                game.sound.stopAll();
                global_save_point = 9;
                game.state.start('Cutscene');
             }
          },
          function() {
             //enter Kevn Monument battle
             if(global_save_point === 1) {
                game.sound.stopAll();
                global_save_point = 2;
                game.state.start('Cutscene');
             }
          },
          function() {
             //enter Hatu Monument battle
             if(global_save_point === 5) {
                game.sound.stopAll();
                global_save_point = 6;
                game.state.start('Cutscene');
             }
          },
       ]
   },
   {
       // 1
       //Kevn1 map definition
       //TILEMAP FILES
       mapKey: 'kevn1-map',
       setKey: 'forest-tile', //key for tilemap
       
       bgKey: 'kevn-bg',
       
       music: 'oworld-song',
       
       events: []
   },
   {
       // 2
       //Kevn2 map definition
       //TILEMAP FILES
       mapKey: 'kevn2-map',
       setKey: 'forest-tile', //key for tilemap
       
       bgKey: 'kevn-bg',
       
       music: 'oworld-song',
       
       events: []
   },
   {
       // 3
       //Hatu map definition
       //TILEMAP FILES
       mapKey: 'hatu1-map',
       setKey: 'mountain-tile', //key for tilemap
       
       bgKey: 'hatu-bg',
       
       music: 'oworld-song',
       
       events: []
   },
   {
       // 4
       //Hatu2 map definition
       //TILEMAP FILES
       mapKey: 'hatu2-map',
       setKey: 'mountain-tile', //key for tilemap
       
       bgKey: 'hatu-bg',
       
       music: 'oworld-song',
       
       events: []
   },
   {
       // 5
       //Kevn battle definition
       //TILEMAP FILES
       mapKey: 'kevnbattle',
       setKey: 'forest-tile', //key for tilemap
       
       bgKey: 'kevn-bg',
       
       music: 'battle-song',
       
       events: []
   },
   {
       // 6
       //forestbattle1 map definition
       //TILEMAP FILES
       mapKey: 'forestbattle',
       setKey: 'forest-tile', //key for tilemap
       
       bgKey: 'kevn-bg',
       
       music: 'battle-song',
       
       events: []
   },
   {
       // 7
       //hero sanctuary map
       mapKey: 'herosanctuary',
       setKey: 'forest-tile',
       
       bgKey: 'kevn-bg',
       
       music: 'title-song',
       
       events: []
   },
   {
       // 8
       //Boss fight
       mapKey: 'boss-battle',
       setKey: 'mountain-tile',
       
       bgKey: 'boss-bg',
       
       music: 'boss-song',
       
       events: [
          function() {
            canEnter = false;
            game.physics.arcade.isPaused = true;
          
            //put the wizard on the floor
            var wizard = game.add.sprite(1216,576,'darkWizard',4);
          
            let timer = game.time.create();
             timer.add(2000, function() {
                game.sound.stopAll();
            
               wizard.tint = 0xff0000; //turn wizard red
               var sound = game.add.audio('transformation');
               var song = game.add.audio('boss-song');
               sound.play();
               //wait for the sound effect to be done
               //then kill the wizard and tell PlayPlatform
               //it's demon time
               var timer = game.time.create();
               timer.add(7000, function() {
                  wizard.kill();
                  spawnBoss = true;
                  canEnter = true;
                  game.physics.arcade.isPaused = false;
                  song.play('', 0, 1, true);
               }, this);
               timer.start();
             }, this);
             timer.start();
         }
       ]
   },
   {
       // 9
       //forestbattle2
       mapKey: 'forestbattle2',
       setKey: 'forest-tile',
      
       bgKey: 'kevn-bg',
      
       music: 'battle-song',
       
       events: []
   },
   {
       // 10
       //mountainbattle1
       mapKey: 'mountainbattle1',
       setKey: 'mountain-tile',
      
       bgKey: 'hatu-bg',
      
       music: 'battle-song',
       
       events: []
   },
   {
       // 11
       //mountainbattle2
       mapKey: 'mountainbattle2',
       setKey: 'mountain-tile',
      
       bgKey: 'hatu-bg',
      
       music: 'battle-song',
       
       events: []
   },
   {
       // 12
       //plainsbattle1
       mapKey: 'plainsbattle1',
       setKey: 'forest-tile',
      
       bgKey: 'kevn-bg',
      
       music: 'battle-song',
       
       events: []
   },
   {
       // 13
       //UNDEFINED
       mapKey: 'plainsbattle1',
       setKey: 'forest-tile',
      
       bgKey: 'kevn-bg',
      
       music: 'battle-song',
       
       events: []
   },
   {
       // 14
       //hatu-fight
       mapKey: 'hatubattle',
       setKey: 'mountain-tile',
      
       bgKey: 'hatu-bg',
      
       music: 'battle-song',
       
       events: []
   }
]

const O_WORLD = 0;
const KEVN_1 = 1;
const KEVN_2 = 2;
const HATU_1 = 3;
const HATU_2 = 4;
const KEVN_BATTLE = 5;
const FORESTBATTLE_1 = 6;
const HERO_SANCTUARY = 7;
const BOSS_FIGHT = 8;
const FORESTBATTLE_2 = 9;
const MOUNTAINBATTLE_1 = 10;
const MOUNTAINBATTLE_2 = 11;
const PLAINSBATTLE_1 = 12;
const BLAHBLAH = 13;
const HATU_FIGHT = 14;
