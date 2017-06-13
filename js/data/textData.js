/* textData.js
 * 6/13/2017
 * This file contains an array of data objects used in textboxes
 * it also contains various contant text styles
*/

// Text stlyes

const GLOBAL_TEXT_STYLE = {
   font: "Courier",
   fontSize: "16px",
   fill: 'black',
   wordWrap: true,
   wordWrapWidth: 800,
   align: 'center',
   backgroundColor: '#CFA26B'
}

const MAIN_BUTTON_TEXT_STYLE = {
   font: "Courier",
   fontSize: "32px",
   fill: 'black',
   align: 'center',
   backgroundColor: "#CFA26B"
}

const PAUSE_BUTTON_TEXT_STYLE = {
   font: "Courier",
   fontSize: "64px",
   fill: 'black',
   align: 'center',
   backgroundColor: "#CFA26B"
}

const STORY_STYLE = {
   font: "Courier",
   fontSize: "18px",
   fill: 'black',
   wordWrap: true,
   wordWrapWidth: 500,
   align: 'center',
   backgroundColor: "#CFA26B"
}

// TEXT_DATA will contain words of all text boxes pass objects from 
// this array to the function in the text prefab to create text boxes
// Psuedo code format for TEXT_DATA objects
/*
 {
   // Place a comment here explaining what this textbox is for and any other relevent information
   text: ['text that goes in first screen',
         'text that goes in second screen',
         'and so on...'],
   style: {
      // In here you can define a new object with the same fields as GLOBAL_TEXT_STYLE
      // or define a new single use text box stlye
      // if you think you will want to use the same style multiple times,
      // define it below as const STLYENAME_STYLE = {//object definition//}
   }
}
*/
const TEXT_DATA = [{
      // This is the platWorld test
      // Index 0
      text: ['Screen 1: Platworld test textbox using GLOBAL_TEXT_STYLE',
            'Screen 2: This sentence is very long so that I can see how the world wrap works using this style and so that others can see the world wrap as well',
            'Screen 3: Press \'E\' to continue'],
      style: GLOBAL_TEXT_STYLE,
      after: function() {
         //empty
      }
   },
   {
      // This is the overworld test text box 
      // Index 1
      text: ['This text box will pause the game, press \'E\' to continue to the next screen',
            'text is big to demonstrate that style can change by textBox',
            'Text box is anchored at the top center',
            'Anchor points can be arguments of textBox later if people think it is necessary',
            'press \'E\' to begin your adventure'],
      style: {
         font: "bold Courier",
         fontSize: "28px",
         fill: 'black',
         wordWrap: true,
         wordWrapWidth: 500,
         align: 'center',
         backgroundColor: '#CFA26B'
      },
      after: function() {
         //empty
      }
   },
   {
      // This is the help text box for the title screen (and possibly pause menu later)
      // Index 2
      text: ['~~TEXTBOX~~\n\nWhenever you see a textbox like this, you may press \'E\' to move to the next box, \'Q\' to go back to the previous box, or \'ESC\' to return to the game at any time \nPress \'E\' to continue',
            '~~MAP VIEW~~\n\nThe game has two points of view, the first is a top down "Map View" when in this mode use \'W\' to move north, \'A\' to move west, \'S\' to move south, and \'D\' to move east',
            '~~PLATFORMER~~\n\nWhen in map view, you can walk into a town to enter it. After entering a town or other object from the map view, you will be in a platformer where you can use\'W\' to jump, \'A\' to move left, and \'D\' to move right',
            '~~PLATFORMER CONT.~~\n\n In the platformer levels, you can use \'SPACEBAR\' to attack and \'E\' to go through doors\n To return to the Map View, walk off either side of the screen',
            '~~WEAPONS~~\n\nWhen in the platformer you will have access to weapons press\'1\' to equip the sword, \'2\' to equip the crossbow, and \'3\' to sheath all weapons.',
            '~~THANKS~~\n\n Thank you for playing "Monumental Pain", have fun storming the castle'],
      style: {
         font: 'Courier',
         fontSize: '32px',
         fill: 'black',
         wordWrap: true,
         wordWrapWidth: 600,
         align: 'center',
         backgroundColor: '#CFA26B'
      },
      after: function() {
         //empty
      }
   },
   {
      text: ['Listen! Our town-no, the entire forest-is in grave danger!',
            'A group has recently voiced plans of burning the Tree of Kevn. I\'m not sure what their purpose is, but please, you have to stop them!',
            'Please, masked protector of the forest. No one else seems to h ave the will or the ability to stop this.'],
      style: STORY_STYLE,
      after: function() {
         //empty
      }
   },
   {
      //First textbox/piece of exposition
      text: ['Protector, you are needed in the forest village of Kevn.',
            'Draw your sword and bow against those who wish to destroy the great monument of this land.'],
      style: STORY_STYLE,
      after: function() {
         //empty
      }
   },
   {
      //Cutscene1
      text: ['Someone wishes to destroy this place.',
            'His power grows quietly as the time draws near. You must stop him.'],
      style: {
         font: 'Georgia',
         fontSize: '18px',
         fill: 'white',
         wordWrap: true,
         wordWrapWidth: 800,
         align: 'center',
         backgroundColor: 'black'
      },
      after: function() {
         //empty
      }
   },
   {
      //Cutscene2
      text: ['The town of Kevn is in danger. You must protect the tree.'],
      style: {
         font: 'Georgia',
         fontSize: '18px',
         fill: 'white',
         wordWrap: true,
         wordWrapWidth: 800,
         align: 'center',
         backgroundColor: 'black'
      },
      after: function() {
         //empty
      }
   },
   {
      //Cutscene3
      //Final boss intro
      text: ['Finally.',
            'You have arrived just in time.',
            'The people of this land are so easily manipulated. Those pitiful rocks and bushes you call monuments are worthless.',
            'And yet, so many were wildly motivated by the thought of their destruction, by the thought that it may bring liberation.',
            'Now, you. It was pointless coming here. You should have continued hiding in that forest of yours.',
            'Now you will be destroyed as well.'],
      style: {
         font: 'Georgia',
         fontSize: '18px',
         fill: 'red',
         wordWrap: true,
         wordWrapWidth: 800,
         align: 'center',
         backgroundColor: 'black'
      },
      after: function() {
         
      }
   },
   {
      //Kevn NPC 1
      //Instructions on where to go
      text: ['This is the town of Kevn.',
            'We are currently in a time of restlesness, as political groups debate passionately on the state of our world.',
            'You should speak with others in town. Some of them seek your help.'],
      style: STORY_STYLE,
      after: function() {
         //empty
      }
   },
   {
      //Kevn NPC 2
      //Wife concerned about her husband
      text: ['I am concerned for my husband.',
            'He has been idolizing a man in the castle for his insight on what he calls "our decided oppression."',
            'I did not think much of it, but lately he and others have talked of violence and destruction of "that which oppresses us."',
            'I still do not understand. That makes me fear more.'],
      style: STORY_STYLE,
      after: function() {
         //empty
      }
   },
   {
      //Kevn NPC 3
      //Trigger for Kevn Monument battle
      text: ['Thank the heavens, you have arrived.',
            'Masked protector, I do not know what you have heard, but a man in the castle-an advisor to the king-seems to be gathering a following through his speech.',
            'Our town was caught largely off guard as countless men left wielding swords and axes chanting mantras of burning the sources of their oppression. By that, they evidently mean the Tree of Kevn.',
            'They must be stopped. The Tree of Kevn does not oppress us. It represents our history as a people and the life of this forest.',
            'Please, protector. Do what you must to prevent this destruction.'],
      style: STORY_STYLE,
      after: function() {
         if(global_save_point === 0) {
            global_save_point = 1;
         }
      }
   },
   {
      //Kevn NPC 4
      //Tree of Kevn history
      text: ['The Tree of Kevn has stood since before records show that humankind has existed.',
            'As such, it has appropriately served as our monument of tradition and as who we are as people.',
            'Evidently, some find these notions disagreeable. In fact they find the Tree to stand for the opposite, and they do not see its worth.'],
      style: STORY_STYLE,
      after: function() {
         //empty
      }
   },
   {
      //Kevn NPC 5
      //Heals the player's health
      text: ['You look weary, protector. Let me restore your health.'],
      style: STORY_STYLE,
      after: function() {
         player.health = 5;
      }
   },
   {
      //Cutscene3
      text: ['Burn it down! Burn it down! Burn it down!',
            'Destroy our oppression! Release us from the binds of the past!'],
      style: {
         font: 'Georgia',
         fontSize: '18px',
         fill: 'red',
         wordWrap: true,
         wordWrapWidth: 800,
         align: 'center',
         backgroundColor: 'black'
      },
      after: function() {
         //empty
      }
   },
   {
      //Cutscene4
      text: ['The Tree of Kevn has suffered serious scars from the attack.',
            'It may not survive.',
            'You must attempt to prevent this from happening again. The Tree of Kevn is not the only monument.',
            'Head EAST, protector, to the mountain city of Hatu. They need your strength. Be careful, for many will try to stop you along the way.'],
      style: {
         font: 'Georgia',
         fontSize: '18px',
         fill: 'white',
         wordWrap: true,
         wordWrapWidth: 800,
         align: 'center',
         backgroundColor: 'black'
      },
      after: function() {
         //empty
      }
   },
   {
      //Cutscene5
      text: ['The ancient pillars of Hatu still stand in the mountain town of Hatu.',
            'Move swiftly to the east of Kevn. The monument\'s enemies will attack soon.'],
      style: {
         font: 'Georgia',
         fontSize: '18px',
         fill: 'white',
         wordWrap: true,
         wordWrapWidth: 800,
         align: 'center',
         backgroundColor: 'black'
      },
      after: function() {
         //empty
      }
   },
   {
      //Cutscene6
      text: ['Move the explosives! These pillars of fear no longer stand in our way!',
            'We are beyond the age of oppression! Rise against these petty stones that stand in our way! Show them who is truly powerful!'],
      style: {
         font: 'Georgia',
         fontSize: '18px',
         fill: 'red',
         wordWrap: true,
         wordWrapWidth: 800,
         align: 'center',
         backgroundColor: 'black'
      },
      after: function() {
         //empty
      }
   },
   {
      //Cutscene7
      text: ['It appears the destroyers have moved away from this place.',
            'You cannot guarantee they will not return, but it is time to address the root of this violence.',
            'Travel to the castle to the south of Hatu, where the advisor plots grander deployment of chaos.',
            'As we speak, he calls upon dark magical power to assert dominance over the land.'],
      style: {
         font: 'Georgia',
         fontSize: '18px',
         fill: 'white',
         wordWrap: true,
         wordWrapWidth: 800,
         align: 'center',
         backgroundColor: 'black'
      },
      after: function() {
         //empty
      }
   },
   {
      //Cutscene8
      text: ['An evil power grows in the castle in the center of this continent.',
            'Go, protector.\nYour final stand is there.'],
      style: {
         font: 'Georgia',
         fontSize: '18px',
         fill: 'white',
         wordWrap: true,
         wordWrapWidth: 800,
         align: 'center',
         backgroundColor: 'black'
      },
      after: function() {
         //empty
      }
   },
   {
      //Cutscene10
      text: ['The beast has been stopped.',
            'His followers remain, and the destruction they caused is permanent, but from here you may help this world move forward.',
            'Thank you, protector.'],
      style: {
         font: 'Georgia',
         fontSize: '18px',
         fill: 'white',
         wordWrap: true,
         wordWrapWidth: 800,
         align: 'center',
         backgroundColor: 'black'
      },
      after: function() {
         //empty
      }
   },
   {
      //Kevn Fight Win
      //reached the NPC in the Kevn Monument battle
      text: ['Protector! You have come to save the Tree!',
            'These men have dealt serious damage to the bark and leaves. I am afraid of how it will recover.',
            'Please, we will stay here and attempt to recuperate. You must go stop them from causing further harm.'],
      style: STORY_STYLE,
      after: function() {
         game.sound.stopAll();
         global_save_point = 3;
         game.state.start('Cutscene');
      }
   },
   {
      //Hatu NPC 1
      //Welcome to Hatu
      text: ['Welcome to Hatu. I\'m not sure I have seen you before.',
            'You look like you are from the forest. What has made you come all this way?',
            'Our town is not what it normally is. Many have left and the rest are arguing.'],
      style: STORY_STYLE,
      after: function() {
         //empty
      }
   },
   {
      //Hatu NPC 2
      //Pacing woman
      text: ['I don\'t know what to do. When the king\'s advisor first began giving speeches, I found him inspiring.',
            'He spoke of the hardships in life and how we can fix them. I wanted to fix them. It seemed hopeful.',
            'But then he shifted his eyes toward the monuments of our lands. At that point I did not understand. What could the monuments have to do with hardship?',
            'Why does he call for violence?'],
      style: STORY_STYLE,
      after: function() {
         //empty
      }
   },
   {
      //Hatu NPC 3
      //Arguing person 1
      text: ['How can you not see how counterintuitive this is? Why would you destroy something as harmless and historical as the Pillars of Hatu?',
            'It will only cause more conflict!'],
      style: STORY_STYLE,
      after: function() {
         //empty
      }
   },
   {
      //Hatu NPC 4
      //Arguing person 2
      text: ['Places like the Pillars of Hatu have been looming over us, forcing us into a tradition we do not have consent of taking.',
            'Since we are born, it is shoved down our throats to look up to these monuments, but why? It\'s not right! I want my freedom to practice culture and live my life as I choose.'],
      style: STORY_STYLE,
      after: function() {
         //empty
      }
   },
   {
      //Hatu NPC 5
      //Explosives information
      text: ['Oh, no... this is terrible.',
            'Protector! I heard from a friend in Kevn that you may come to our aide. Please help us!',
            'My son, bless his heart, gathered together massive quantities of explosives we use for mining. He would not tell me where he was going, but I know he and others took them to the Pillars of Hatu',
            'We cannot let them demolish the pillars, but I am too weak to fight them',
            'Meet me at the Pillars of Hatu, and perhaps we can sabotage their plans.'],
      style: STORY_STYLE,
      after: function() {
         if(global_save_point === 4) {
            global_save_point = 5;
         }
      }
   },
   {
      //Hatu Fight Win
      //reached the NPC in the Hatu Monument battle
      text: ['You made it! I apologize for being in such an inconvenient location, but I had to find somewhere I may be safe.',
            'While you distracted them, I collected as many explosives as I could and tried to douse them enough to make them useless.',
            'I cannot express how grateful I am that you came. Thank you, protector.'],
      style: STORY_STYLE,
      after: function() {
         game.sound.stopAll();
         global_save_point = 7;
         game.state.start('Cutscene');
      }
   },
   {
      //Boss Fight Win
      //killed the big ol' demon boy
      text: ['I... I cannot believe this. Someone so small, insignificant was able to destroy a demonic power this great.',
            'I will... I will return..... and you will be destroyed.'],
      style: {
         font: 'Georgia',
         fontSize: '18px',
         fill: 'white',
         wordWrap: true,
         wordWrapWidth: 800,
         align: 'center',
         backgroundColor: 'black'
      },
      after: function() {
         game.sound.stopAll();
         global_save_point = 10;
         game.state.start('Cutscene');
      }
   }
]


/////////////////////////////
//CONSTANT VARIABLES BELOW //
//HOLD TEXT_DATA INDICES   //
//WITH MORE MEMORABLE NAMES//
/////////////////////////////

const PLATWORLD_TEXTBOX_TEST = 0;
const OWORLD_TEXTBOX_TEST = 1;
const HELP = 2;
const YOU_ARE_A_FOOL = 3;
const EXPOSITION = 4;
const CUTSCENE1 = 5;
const CUTSCENE2 = 6;
const CUTSCENE9 = 7;
const KEVN_NPC1 = 8;
const KEVN_NPC2 = 9;
const KEVN_NPC3 = 10;
const KEVN_NPC4 = 11;
const KEVN_NPC5 = 12;
const CUTSCENE3 = 13;
const CUTSCENE4 = 14;
const CUTSCENE5 = 15;
const CUTSCENE6 = 16;
const CUTSCENE7 = 17;
const CUTSCENE8 = 18;
const CUTSCENE10 = 19;
const KEVN_FIGHT_WIN = 20;
const HATU_NPC1 = 21;
const HATU_NPC2 = 22;
const HATU_NPC3 = 23;
const HATU_NPC4 = 24;
const HATU_NPC5 = 25;
const HATU_FIGHT_WIN = 26;
const BOSS_FIGHT_WIN = 27;

////////////////////////////////////////////
// THIS CONSTANT IS A BOOLEAN VALUES THAT //
// EXPRESSES THE NAVIGATION LIMITATIONS   //
////////////////////////////////////////////

const NAVIGABLE = true;