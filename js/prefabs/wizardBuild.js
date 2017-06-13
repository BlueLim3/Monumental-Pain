/* wizardBuild.js
 * 6/13/2017
 * This file is a prefab for creating the wizard npc, used as one
 * of the forms of the main enemy in the game
*/

'use strict';
var wizardBuild = function(game,scaleX,scaleY,x,y,src,frame){
    console.log("wizardBuild: create");
    Phaser.Sprite.call(this,game,x,y,src,frame);

    // add animations
    this.animations.add('DarkWizardWalkRight', [0, 1, 2, 3], 10, true);
    this.animations.add('DarkWizardWalkLeft', [4, 5, 6, 7], 10, true);

    this.timer = game.time.create();
    // add child sprite for vision
    this.rFlag = 0;
    this.vision = this.addChild(game.make.sprite(-128, 0, 'collider'));
    this.vision.scale.set(200, 49);
    this.vision.anchor.set(.5,.5);
    this.vision.alpha = 0;
    game.physics.arcade.enable(this.vision);

    this.anchor.setTo(.5,.5);
    this.scale.setTo(scaleX,scaleY);
    game.physics.arcade.enableBody(this);
    
    this.direction = -1; //positive = right, negative = left
};

wizardBuild.prototype = Object.create(Phaser.Sprite.prototype);
wizardBuild.prototype.constructor = wizardBuild;

wizardBuild.prototype.update = function(){
    // contains the basic package, turn around when it hits a wall, uses appropriate speed and animations
    if(this.body.blocked.right || this.body.blocked.left) {
        this.switchDir();
    }
    if(this.direction < 0) {
        this.body.velocity.x = -100;
    } else {
        this.body.velocity.x = 100;
    }
   if ( this.body.velocity.x === -100 ) {
      this.animations.play('DarkWizardWalkLeft');
   } else if ( this.body.velocity.x === 100 ) {
      this.animations.play('DarkWizardWalkRight');
   }
}
wizardBuild.prototype.switchDir = function() {
    if(this.direction < 0) {
        this.direction = 1;
        this.body.position.x += 1;
    } else{
        this.direction = -1;
        this.body.position.x -= 1;
    }
}