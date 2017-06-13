/* npcBuild.js
 * 6/13/2017
 * This file is a prefab for creating npcs and controlling their behavior
*/
'use strict';
var npcBuild = function(game, scaleX, scaleY, x, y, src, frame, interact, moves){
    console.log("npcBuild: create");
    Phaser.Sprite.call(this, game, x, y, src, frame);
    
    // the interaction is a textbox conversation
    this.textbox = interact;
    
    // controls if and how the npc moves
    this.moves = moves;

    // sets body size, and anchor point
    this.anchor.setTo(.5,.5);
    this.scale.setTo(scaleX,scaleY);
    game.physics.arcade.enableBody(this);
    
    this.direction = -1; //positive = right, negative = left
};

npcBuild.prototype = Object.create(Phaser.Sprite.prototype);
npcBuild.prototype.constructor = npcBuild;

npcBuild.prototype.update = function(){
    // only use velocity controls if the npc should be moving
    if(this.moves === 1) {
        // turn around if blocked
        if(this.body.blocked.right || this.body.blocked.left) {
            this.switchDir();
        }
        if(this.direction < 0) {
            this.body.velocity.x = -this.speed;
        } else {
            this.body.velocity.x = this.speed;
        }
        // animate the character
        this.animate();
    
    }
}

// this function is used to switch the characters direction
npcBuild.prototype.switchDir = function() {
    if(this.direction < 0) {
        this.direction = 1;
        this.body.position.x += 1;
    } else{
        this.direction = -1;
        this.body.position.x -= 1;
    }
}

//////////////////////
//  Specific NPCs   //
//////////////////////

// OVERALLDUDE
var overallDude = function(game, scaleX, scaleY, x, y, src, frame, interact, moves) { 
   npcBuild.call(this,game,scaleX,scaleY,x,y,src,frame,interact,moves);
   // walk speed
   this.speed = 100;
   // add animations
   this.animations.add('OverallDudeWalkRight', [0, 1, 2, 3], 5, true);
   this.animations.add('OverallDudeWalkLeft', [4, 5, 6, 7], 5, true);
   
}

overallDude.prototype = Object.create(npcBuild.prototype);
overallDude.prototype.constructor = overallDude;

overallDude.prototype.update = function(){
    // only use motion controls if the character should be moving
    if(this.moves === 1) {
        // switch directions at wall
        if(this.body.blocked.right || this.body.blocked.left) {
            this.switchDir();
        }
        if(this.direction < 0) {
            this.body.velocity.x = -this.speed;
        } else {
            this.body.velocity.x = this.speed;
        }
        // animate the character
        this.animate();
    
    }
}

// animates the npc, this is called in enemyBuild's update function
overallDude.prototype.animate = function(){

   if ( this.body.velocity.x == -100 ) {
      this.animations.play('OverallDudeWalkLeft');
   } else if ( this.body.velocity.x == 100 ) {
      this.animations.play('OverallDudeWalkRight');
   }

}

// SKIRTDUDETTE
var skirtDudette = function(game, scaleX, scaleY, x, y, src, frame, interact, moves) { 
   npcBuild.call(this, game, scaleX, scaleY, x, y, src, frame, interact, moves);
   // walk speed
   this.speed = 100;
   // add animations
   this.animations.add('SkirtDudetteWalkRight', [0, 1, 2, 3], 5, true);
   this.animations.add('SkirtDudetteWalkLeft', [4, 5, 6, 7], 5, true);
   
}

skirtDudette.prototype = Object.create(npcBuild.prototype);
skirtDudette.prototype.constructor = overallDude;

skirtDudette.prototype.update = function(){
    // only use movement controls if npc moves
    if(this.moves === 1) {
        
      // switch direction if the character walks into a wall
      if(this.body.blocked.right || this.body.blocked.left) {
          this.switchDir();
      }
      if(this.direction < 0) {
          this.body.velocity.x = -this.speed;
      } else {
          this.body.velocity.x = this.speed;
      }
      // animate the character
      this.animate();
        
    }
}

// animates the npc, this is called in enemyBuild's update function
skirtDudette.prototype.animate = function(){

   if ( this.body.velocity.x == -100 ) {
      this.animations.play('SkirtDudetteWalkLeft');
   } else if ( this.body.velocity.x == 100 ) {
      this.animations.play('SkirtDudetteWalkRight');
   }

}