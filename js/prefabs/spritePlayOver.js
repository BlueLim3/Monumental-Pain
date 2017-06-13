/* spritePlayOver.js
 * 6/13/2017
 * This file is a prefab for creating the overworld sprite
*/

// I didn't have the heart to delete this comment, it shall forever be a part of our game
//////////////////////////////////////////////////////////////////////////////////////////////////////
/* 5/9/2017, KIEFER
this file is Satan.
It just keeps saying spritePlayOver is not defined and I don't know why, it's right fucking here
EDIT: OK, figured out it just wasn't in index.html; I'm going to eat my fists whole
*/
//////////////////////////////////////////////////////////////////////////////////////////////////////

'use strict';
var spritePlayOver = function(game, x, y, src, frame){
    console.log("spritePlayOver: create");
    Phaser.Sprite.call(this, game, x, y, src, frame);

    // add animations for all directions
    this.animations.add('OWorldHeroWalkSouth',[0, 1, 2, 3], 10, true);
    this.animations.add('OWorldHeroWalkNorth',[4, 5, 6, 7], 10, true);
    this.animations.add('OWorldHeroWalkEast',[8, 9, 10, 11], 10, true);
    this.animations.add('OWorldHeroWalkWest',[12, 13, 14, 15], 10, true);
    this.animations.add('OWorldHeroWalkSouthEast',[16, 17, 18, 19], 10, true);
    this.animations.add('OWorldHeroWalkSouthWest',[20, 21, 22, 23], 10, true);
    this.animations.add('OWorldHeroWalkNorthEast',[24, 25, 26, 27], 10, true);
    this.animations.add('OWorldHeroWalkNorthWest',[28, 29, 30, 31], 10, true);

    this.anchor.setTo(.5,.5);
    this.game.physics.arcade.enableBody(this);
    this.body.collideWorldBounds = true;

    // changes the size of the hitbox with arguments (width, height, offsetX, offsetY)
    // new size makes navication feel more natural
    this.body.setSize(12, 32, 8, 0);
};

spritePlayOver.prototype = Object.create(Phaser.Sprite.prototype);
spritePlayOver.prototype.constructor = spritePlayOver;

spritePlayOver.prototype.update = function(){

    if(canEnter) { //only allow the player to move after they've been allowed to
        
        //Various movement controls
        if(game.input.keyboard.isDown(Phaser.Keyboard.W)){
            //move slower during diagnal movement
            if(game.input.keyboard.isDown(Phaser.Keyboard.D)) {
                this.animations.play('OWorldHeroWalkNorthEast');
                this.body.velocity.y = -60;
                this.body.velocity.x = 60;
            } else if(game.input.keyboard.isDown(Phaser.Keyboard.A)) {
                this.animations.play('OWorldHeroWalkNorthWest');
                this.body.velocity.y = -60;
                this.body.velocity.x = -60;
            } else {
                this.animations.play('OWorldHeroWalkNorth');
                this.body.velocity.x = 0;
                this.body.velocity.y = -90;
            }
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.S)){
            //move slower during diagnal movement
            if(game.input.keyboard.isDown(Phaser.Keyboard.D)) {
                this.animations.play('OWorldHeroWalkSouthEast');
                this.body.velocity.y = 60;
                this.body.velocity.x = 60;
            } else if(game.input.keyboard.isDown(Phaser.Keyboard.A)) {
                this.animations.play('OWorldHeroWalkSouthWest');
                this.body.velocity.y = 60;
                this.body.velocity.x = -60;
            } else {
                this.animations.play('OWorldHeroWalkSouth');
                this.body.velocity.x = 0;
                this.body.velocity.y = 90;
            }
        } else if(game.input.keyboard.isDown(Phaser.Keyboard.D)) {
            this.animations.play('OWorldHeroWalkEast');
            this.body.velocity.y = 0;
            this.body.velocity.x = 90;
        } else if(game.input.keyboard.isDown(Phaser.Keyboard.A)) {
            this.animations.play('OWorldHeroWalkWest');
            this.body.velocity.y = 0;
            this.body.velocity.x = -90;
        } else {
            this.frame = 1;
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
        }
        
    }
        
}