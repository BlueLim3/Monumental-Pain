/* bulletBuild.js
 * 6/13/2017
 * This file is a prefab for creating crossbow bolts
 * in this code crossbow bolts are always refered to as bullets
 * Don't ask why
*/
'use strict';
var bulletBuild = function(game, x, y, direction){
    console.log("bulletBuild: create");
    Phaser.Sprite.call(this, game, x, y, 'arrow', 0);

    // enable the bullets body
    this.game.physics.arcade.enableBody(this);
    
    // control variable to kill the bullets when out of bounds
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    
    // setting speed and direction
    this.speed = 600;
    this.direction = direction;
    
    // set anchor based on direction so that the bolt looks normal
    // when it is fired
    if(direction === 1) {
        this.anchor.setTo(.5,1);
        this.body.velocity.x = this.speed;
    }
    else if(direction === -1) {
        this.anchor.setTo(.5,0);
        this.body.velocity.x = -this.speed;
    }

    // ensure the sprite is facing the right direction
    this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
};

bulletBuild.prototype = Object.create(Phaser.Sprite.prototype);
bulletBuild.prototype.constructor = bulletBuild;