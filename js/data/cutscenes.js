// Cutscene data

GLOBAL_CUTSCENE_DATA = [
   {
      //0
      // New game cutscene
      text: CUTSCENE1,
      bg: 'cutscene1',
      music: 'gameover-song',
      //which state to return to
      state: 'PlayPlatform',
      //destination to return to
      dest: HERO_SANCTUARY,
      execute: function() {
         //empty
      },
      onetime: false,
      played: false
   },
   {
      //1
      // "Protect Kevn"
      text: CUTSCENE2,
      bg: null,
      music: 'title-song',
      state: 'PlayPlatform',
      dest: KEVN_1,
      execute: function() {
         //empty
      },
      onetime: false,
      played: false
   },
   {
      //2
      //Kevn Monument Battle
      text: CUTSCENE3,
      bg: null,
      music: 'gameover-song',
      state: 'PlayPlatform',
      dest: KEVN_BATTLE,
      execute: function() {
         //empty
      },
      onetime: false,
      played: false
   },
   {
      //3
      //Kevn Beat Monument
      text: CUTSCENE4,
      bg: null,
      music: 'title-song',
      state: 'PlayOver',
      dest: O_WORLD,
      execute: function() {
         global_x = 576;
         global_y = 704;
         global_save_point = 4;
      },
      onetime: false,
      played: false
   },
   {
      //4
      //Protect Hatu
      text: CUTSCENE5,
      bg: null,
      music: 'title-song',
      state: 'PlayPlatform',
      dest: KEVN_1,
      execute: function() {
         //empty
      },
      onetime: false,
      played: false
   },
   {
      //5
      //Protect Hatu
      text: CUTSCENE5,
      bg: null,
      music: 'title-song',
      state: 'PlayPlatform',
      dest: KEVN_1,
      execute: function() {
         //empty
      },
      onetime: false,
      played: false
   },
   {
      //6
      //Hatu Monument Battle
      text: CUTSCENE6,
      bg: null,
      music: 'gameover-song',
      state: 'PlayPlatform',
      dest: HATU_FIGHT,
      execute: function() {
         //empty
      },
      onetime: false,
      played: false
   },
   {
      //7
      //Hatu Beat Monument
      text: CUTSCENE7,
      bg: null,
      music: 'title-song',
      state: 'PlayOver',
      dest: O_WORLD,
      execute: function() {
         global_x = 1632;
         global_y = 864;
         global_save_point = 8;
      },
      onetime: false,
      played: false
   },
   {
      //8
      //Go to the castle
      text: CUTSCENE8,
      bg: null,
      music: 'title-song',
      state: 'PlayPlatform',
      dest: HATU_1,
      execute: function() {
         global_x = 1632;
         global_y = 864;
      },
      onetime: false,
      played: false
   },
   {
      //9
      //Boss fight
      text: CUTSCENE9,
      bg: null,
      music: 'gameover-song',
      state: 'PlayPlatform',
      dest: BOSS_FIGHT,
      execute: function() {
         //empty
      },
      onetime: false,
      played: false
   },
   {
      //10
      //Defeated boss
      text: CUTSCENE10,
      bg: null,
      music: 'title-song',
      state: 'Victory',
      dest: HERO_SANCTUARY,
      execute: function() {
         //empty
      },
      onetime: false,
      played: false
   }
]