/* oworldEnemy.js
 * 6/13/2017
 * This file is a prefab for creating enemies that appear
 * in the overworld state (PlayOver.js) 
*/

'use strict';
var oworldEnemy = function(game,obj,zone){
    console.log("oworldEnemy: create");
    Phaser.Sprite.call(this, game, obj.x+16, obj.y+16, obj.name, 0);

    // add animations for all eight directions
    this.animations.add('OWorldEnemyWalkSouth',[0, 1, 2, 3], 10, true);
    this.animations.add('OWorldEnemyWalkNorth',[4, 5, 6, 7], 10, true);
    this.animations.add('OWorldEnemyWalkEast',[8, 9, 10, 11], 10, true);
    this.animations.add('OWorldEnemyWalkWest',[12, 13, 14, 15], 10, true);
    this.animations.add('OWorldEnemyWalkSouthEast',[16, 17, 18, 19], 10, true);
    this.animations.add('OWorldEnemyWalkSouthWest',[20, 21, 22, 23], 10, true);
    this.animations.add('OWorldEnemyWalkNorthEast',[24, 25, 26, 27], 10, true);
    this.animations.add('OWorldEnemyWalkNorthWest',[28, 29, 30, 31], 10, true);

    // create timers used in the control of enemies
    this.spawnTimer = game.time.create();
    this.deathTimer = game.time.create();

    // Kill the foe if it's alive for 20 seconds
    this.deathTimer.add(20000,function(){this.destroy();},this);
    this.deathTimer.start();

    // set anchor point and enable the body
    this.anchor.setTo(.5,.5);
    game.physics.arcade.enableBody(this);
    
    // changes the size of the hitbox with arguments (width, height, offsetX, offsetY)
    // new hitbox size correlates more closely with how enemies appear in game
    this.body.setSize(12, 32, 8, 0);
    
    // Which map the enemy takes you to, for global_destination
    this.destination = obj.type;

    // Defines the enemies parent box, which it cannot leave
    this.zone = zone;
    
    // used to build in a pause before the enemies start chasing the player
    this.spawning = true;
    
    // this boolean is used to make sure the enemy does not have
    // flawless tracking of player movement
    this.justTurned = false;
};

oworldEnemy.prototype = Object.create(Phaser.Sprite.prototype);
oworldEnemy.prototype.constructor = oworldEnemy;

oworldEnemy.prototype.update = function(){
    if(this.spawning) {
        // wait for 900ms before chasing the player
        this.spawnTimer.add(900, function() {this.spawning = false;}, this);
        this.spawnTimer.start();
    }
    else{
        
        this.switchDir(); // Check the velocity and animation frame
    
        this.moveTowardPlayer();
        //this.animate();
    
        // If enemy is out of its box, destroy it
        if(this.body.position.x < this.zone.body.position.x 
        || this.body.position.x > this.zone.body.position.x+this.zone.width-16
        || this.body.position.y < this.zone.body.position.y
        || this.body.position.y > this.zone.body.position.y+this.zone.height-16) {
            this.destroy();
            this.zone.activeFoes--;
        }
    }
}
oworldEnemy.prototype.switchDir = function() {
    // Checks velocity and applies the appropriate direction 
    // for animation purposes
    if(this.body.velocity.x < 0 && this.body.velocity.y == 0) {this.animations.play('OWorldEnemyWalkWest');}
    else if(this.body.velocity.x > 0 && this.body.velocity.y == 0) {this.animations.play('OWorldEnemyWalkEast');}
    
    else if(this.body.velocity.y > 0 && this.body.velocity.x == 0) {this.animations.play('OWorldEnemyWalkSouth');}
    else if(this.body.velocity.y < 0 && this.body.velocity.x == 0) {this.animations.play('OWorldEnemyWalkNorth');}

    else if(this.body.velocity.x < 0 && this.body.velocity.y > 0) {this.animations.play('OWorldEnemyWalkSouthWest');}
    else if(this.body.velocity.x > 0 && this.body.velocity.y < 0) {this.animations.play('OWorldEnemyWalkSouthEast');}

    else if(this.body.velocity.x < 0 && this.body.velocity.y < 0) {this.animations.play('OWorldEnemyWalkSouthWest');}
    else if(this.body.velocity.x > 0 && this.body.velocity.y > 0) {this.animations.play('OWorldEnemyWalkSouthEast');}

}
oworldEnemy.prototype.moveTowardPlayer = function() {
    // Move horizontally toward player
    if(!this.justTurned){
        if(this.body.position.x < player.body.position.x) {
            //this.animations.play('OWorldEnemyWalkEast');
            this.body.velocity.x += 10;
        } else if(this.body.position.x > player.body.position.x) {
            //this.animations.play('OWorldEnemyWalkWest');
            this.body.velocity.x -= 10;
        } else {
            this.body.velocity.x = 0; //equal X value to player
        }
        
        // Move vertically toward player
        if(this.body.position.y < player.body.position.y) {
            //this.animations.play('OWorldEnemyWalkNorth');
            this.body.velocity.y += 10;
        } else if(this.body.position.y > player.body.position.y) {
            //this.animations.play('OWorldEnemyWalkSouth');
            this.body.velocity.y -= 10;
        } else {
            this.body.velocity.y = 0; //on the same Y level as player
        }
        
        // Cap horizontal speed
        if(this.body.velocity.x > 50) {this.body.velocity.x = 50;}
        else if(this.body.velocity.x < -50) {this.body.velocity.x = -50;}
        // Cap vertical speed
        if(this.body.velocity.y > 50) {this.body.velocity.y = 50;}
        else if(this.body.velocity.y < -50) {this.body.velocity.y = -50;}
        
        // sets just turned to true, it will not move toward the player again until it becomes falls
        this.justTurned = true;
        // justTurned will become false after 0.1 seconds
        game.time.events.add(100, function(){this.justTurned = false;}, this);
    }
    
}