/* enemyBuild.js
 * 6/13/2017
 * This file is a prefab for creating the all enemies in the game
 * with the exception of the final boss
*/

'use strict';
var enemyBuild = function(game, scaleX, scaleY, x, y, src, frame){
   console.log("enemyBuild: create"); 
   Phaser.Sprite.call(this,game,x,y,src,frame);

   // create timer for use in this file
   this.timer = game.time.create();

   // set starting properties for all enemies
   this.rFlag = 0;
   this.stopFlag = 0;
   this.state = 'walking';
   this.vision = this.addChild(game.make.sprite(-128, 0, 'collider')); // add child sprite for vision
   this.vision.scale.set(200, 49);
   this.vision.anchor.set(.5,.5);
   this.vision.alpha = 0;
   game.physics.arcade.enable(this.vision);

   // set scale and anchor points for the enemies
   this.anchor.setTo(.5,.5);
   this.scale.setTo(scaleX,scaleY);
   game.physics.arcade.enableBody(this);
   this.body.setSize(48,64,0,0);

   // add the attack sound for use when attacking
   this.attackSound = game.add.audio('attackSound');

   // set initial direction
   this.direction = -1; //positive = right, negative = left
   this.isAnimDone = 0;
   this.canAttack = 1;
};

enemyBuild.prototype = Object.create(Phaser.Sprite.prototype);
enemyBuild.prototype.constructor = enemyBuild;

enemyBuild.prototype.update = function(){
    // if the enemy cannot move forward, turn aound
    if(this.body.blocked.right || this.body.blocked.left) {
       this.switchDir();
    }

    // set direction and speed if the enemy is walking
    if(this.state === 'walking'){
       if(this.direction < 0) {
          this.body.velocity.x = -this.speed;
       }else {
          this.body.velocity.x = this.speed;
       }
    }
    if(this.state === 'attacking'){
          this.body.velocity.x = 0;
    }
    // begin the animations
    this.animate();
};

// this function is makes the enemy turn around
enemyBuild.prototype.switchDir = function() {
    if(this.direction < 0) {
        this.direction = 1;
        this.body.position.x += 1;
    } else{
        this.direction = -1;
        this.body.position.x -= 1;
    }
};

// this function deals with player damage and handles the knockback effect
enemyBuild.prototype.mobDamagePlayer = function(){
    if(this.direction === player.direction){
        player.body.velocity.y = -200;
        player.body.velocity.x = -8*player.body.velocity.x;
    }else{
        player.body.velocity.y = -200;
        player.body.velocity.x = 8*this.body.velocity.x;
    } 
    if(player.invincibility === 0){
        player.health -= 1;
        player.invincibility = 1;
        game.time.events.add(Phaser.Timer.SECOND,function() {player.invincibility = 0},this);
    }
};

// this function ensures the the enemy's vision sprite remains in the proper place
enemyBuild.prototype.respawnVision = function(){
    // if the enemy is moving left, place it to the left
    if(this.direction === -1){
        this.vision = this.addChild(game.make.sprite(-128,0,'collider'));
        this.vision.scale.set(200,49);
        this.vision.anchor.set(.5,.5);
        this.vision.alpha = 0;
        game.physics.arcade.enable(this.vision);
    }else{ // otherwise, place it to the right
        this.vision = this.addChild(game.make.sprite(128,0,'collider'));
        this.vision.scale.set(200,49);
        this.vision.anchor.set(.5,.5);
        this.vision.alpha = 0;
        game.physics.arcade.enable(this.vision);
    }
    // Kindon, replace this comment with a description of what the line bellow does
    this.stopFlag = 0;
}

//////////////////////
// Specific enemies //
//////////////////////
// AXEMAN
// NOTE: this is also the constructor for the swordsman enemy.
// Changing things here will also effect the swordsman too!
var axeMan = function(game, scaleX, scaleY, x, y, src, frame) { 
    enemyBuild.call(this,game,scaleX,scaleY,x,y,src,frame);
    // walk speed
    this.speed = 100;
    this.health = 3;
    // add animations
    this.animations.add('AxeWalkRight', [0, 1, 2, 3], 10, false);
    this.animations.add('AxeWalkLeft', [4, 5, 6, 7], 10, false);
    this.axeSlashright = this.animations.add('AxeSlashRight', [8, 9, 10, 11], 10, false);
    this.axeSlashleft = this.animations.add('AxeSlashLeft', [12, 13, 14, 15], 10, false);
   // Add child sprite for the weapon impact effect.
   // This creates an impact sprite that is attached to the enemy sprite and
   // faces the direction of the player the enemy's sword has hit.
   // By default its alpha is 0; its alpha is set to 1 whenever the weapon collider
   // collides with the player sprite. 
   this.weaponImpact = this.addChild(game.make.sprite(8, -23, 'smallWeaponImpact'));
   this.weaponImpact.scale.set(1, 1);
   this.weaponImpact.alpha = 0;
   game.physics.arcade.enable(this.weaponImpact);
};

axeMan.prototype = Object.create(enemyBuild.prototype);
axeMan.prototype.constructor = axeMan;

axeMan.prototype.update = function(){
    // if the axeman is blocked turn around
    if(this.body.blocked.right || this.body.blocked.left) {
        this.switchDir();
        //resets vision box
        if(this.direction < 0){
            this.vision.body.position.x = this.body.position.x - 192;
        }else{
            this.vision.body.position.x = this.body.position.x + 48;
        }
    }
    // ensures that the axeman moves in the right direction 
    if(this.state === 'walking'){
       if(this.direction < 0) {
          this.body.velocity.x = -this.speed;
       }else {
          this.body.velocity.x = this.speed;
       }
    }
    // don't move if attacking
    if(this.state === 'attacking'){
        this.body.velocity.x = 0;
    }
    // begin animations
    this.animate();
    
    // ensure that the sprite is destroyed if it dies
    if(this.health <= 0){
         // enemy stops moving
         this.animations.stop();
         this.body.velocity.x = 0;
         // quickly fade out the enemy sprite before destroying it
         game.add.tween(this).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
         // delete the enemy sprite after it has faded out to free up memory
         game.time.events.add(300, function(){this.destroy();}, this);
    }

    // if it sees the player it will give chase
    game.physics.arcade.overlap(player, this.vision, this.chase, null, this);

    // if it reaches the plaeyr it will attack
    if(this.canAttack == 1){
        game.physics.arcade.collide(player, this, this.playAttack, null, this);
    }
};

// this is the chase function which causes the axeman to move faster
axeMan.prototype.chase = function(){
   if(this.direction > 0){
      this.body.velocity.x = 200;
   }else{
      this.body.velocity.x = -200;
   }
};

// this function handles the axemans attakc
axeMan.prototype.playAttack = function(){
    // set the state correctly
    this.state = 'attacking';
    this.body.velocity.x = 0;
    this.axeSlashright.onComplete.add(function() {this.isAnimDone === 1; this.state = 'walking'}, this);
    this.axeSlashleft.onComplete.add(function() {this.isAnimDone === 1; this.state = 'walking'},this);
    // reset the animations
    this.canAttack = 0;
    game.time.events.add(Phaser.Timer.SECOND,function() {this.canAttack = 1}, this);
    if(this.isAnimDone === 1){
      this.isAnimDone = 0;
    }else{ // damage the player
      this.mobDamagePlayer();
      console.log("axeman is attacking");
      // play the correct animation based on where the sprite is facing
      // and set the correct orientation for the weapon impact sprite
      if(this.direction < 0){
          this.animations.play('AxeSlashLeft');
          this.weaponImpact.position.x = -8;
          this.weaponImpact.scale.set(-1, 1);
      }else{
          this.animations.play('AxeSlashRight');
          this.weaponImpact.position.x = 8;
          this.weaponImpact.scale.set(1, 1);
      }
      // make the impact sprite visible
      this.weaponImpact.alpha = 1;
      // fade out the impact sprite right after 200 milliseconds
      game.time.events.add(200, this.fadeEnemyWeaponImpact, this);
      // play the attacking sound
      this.attackSound.play();
   }
};

// animates the npc, this is called in enemyBuild's update function
axeMan.prototype.animate = function(){
    if ( this.body.velocity.x == -100 ) {
        this.animations.play('AxeWalkLeft');
    }else if ( this.body.velocity.x == 100 ) {
        this.animations.play('AxeWalkRight');
    }else{
        if(this.direction < 0){
            this.animations.play('AxeSlashLeft');
        }else{
            this.animations.play('AxeSlashRight');
        }
    }
};

axeMan.prototype.fadeEnemyWeaponImpact = function(){
   // fades the weapon impact sprite in 100 milliseconds
   game.add.tween(this.weaponImpact).to( { alpha: 0 }, 100, Phaser.Easing.Linear.None, true);   
}


// LESSERDEMON
var lesserDemon = function(game, scaleX, scaleY, x, y, src, frame) { 
    enemyBuild.call(this,game,scaleX,scaleY,x,y,src,frame);
    // walk speed
    this.speed = -100;
    this.speed2 = -100;
    this.health = 2;
    // add the sprite used for vision
    this.vision2 = this.addChild(game.make.sprite(96, 0, 'collider'));
    this.vision2.scale.set(200,49);
    this.vision2.anchor.set(.5,.5);
    this.vision2.alpha = 0;
    game.physics.arcade.enable(this.vision2);

    // add animations
    this.animations.add('WalkRight', [0, 1, 2, 3], 10, true);
    this.animations.add('WalkLeft', [4, 5, 6, 7], 10, true);
    this.slashRight = this.animations.add('SlashRight', [8, 9, 10, 11], 10, false);
    this.slashLeft = this.animations.add('SlashLeft', [12, 13, 14, 15], 10, false);
   // Add child sprite for the weapon impact effect.
   // This creates an impact sprite that is attached to the enemy sprite and
   // faces the direction of the player the enemy's sword has hit.
   // By default its alpha is 0; its alpha is set to 1 whenever the weapon collider
   // collides with the player sprite. 
   this.weaponImpact = this.addChild(game.make.sprite(8, -23, 'smallWeaponImpact'));
   this.weaponImpact.scale.set(1, 1);
   this.weaponImpact.alpha = 0;
   game.physics.arcade.enable(this.weaponImpact);  
};

lesserDemon.prototype = Object.create(enemyBuild.prototype);
lesserDemon.prototype.constructor = lesserDemon;

// animates the npc, this is called in enemyBuild's update function
lesserDemon.prototype.animate = function(){
    if ( this.body.velocity.x == -100 ) {
        this.animations.play('WalkLeft');
    }else if ( this.body.velocity.x == 100 ) {
        this.animations.play('WalkRight');
    }else{
        if(this.direction < 0){
            this.animations.play('SlashLeft');
        }else{
            this.animations.play('SlashRight');
        }
    }
};

lesserDemon.prototype.update = function(){
   // turns around to face player or when blocked
   if(this.body.blocked.right || this.body.blocked.left || game.physics.arcade.overlap(player,this.vision)) {
        this.switchDir();
        if(this.direction < 0){
            this.vision.body.position.x = this.body.position.x -192;
            this.vision2.body.position.x = this.body.position.x +48;
        }else{
            this.vision.body.position.x = this.body.position.x +48;
            this.vision2.body.position.x = this.body.position.x -192;
        }
    }
    // ensures proper velocity based on speed
    if(this.state === 'walking'){
        if(this.direction < 0) {
            this.body.velocity.x = -this.speed;
        } else {
            this.body.velocity.x = this.speed;
        }
    }

    if(this.state === 'attacking'){
        this.body.velocity.x = 0;
    }
    // begin animation
    this.animate();
    // destroy the lesser demon when it no longer has health
    if(this.health <= 0){
         // enemy stops moving
         this.animations.stop();
         this.body.velocity.x = 0;
         // quickly fade out the enemy sprite before destroying it
         game.add.tween(this).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
         // delete the enemy sprite after it has faded out to free up memory
         game.time.events.add(300, function(){this.destroy();}, this);     
    }
    // demon will seek to attack player and does damage on overlap
    game.physics.arcade.overlap(player, this.vision2, this.lunge, null, this);
    if(this.canAttack == 1){
        game.physics.arcade.overlap(player, this, this.playAttack, null, this);
    }
};


// the demon will chase down and attack the player
lesserDemon.prototype.lunge = function(){
    //this.body.velocity.x = 3.5*this.body.velocity.x;
}; 

// this is the demons attack function
lesserDemon.prototype.playAttack = function(src){
    //this function acts the same as axeman.playAttack, see above for comments on it
    this.state = 'attacking';
    this.slashRight.onComplete.add(function() {this.isAnimDone === 1; this.state = 'walking'},this);
    this.slashLeft.onComplete.add(function() {this.isAnimDone ===1; this.state = 'walking'},this);

    this.canAttack = 0;
    game.time.events.add(Phaser.Timer.SECOND,function() {this.canAttack = 1}, this);

    if(this.isAnimDone === 1){
        this.isAnimDone = 0;
    }else{
        //this.mobDamagePlayer();
        if(this.direction < 0){
            this.animations.play('slashLeft');
            this.weaponImpact.position.x = -8;
            this.weaponImpact.scale.set(-1, 1); 
            this.mobDamagePlayer();   
        }else{
            this.animations.play('slashRight');
            this.weaponImpact.position.x = 8;
            this.weaponImpact.scale.set(1, 1); 
            this.mobDamagePlayer();           
        }
         // make the impact sprite visible
         this.weaponImpact.alpha = 1;
         // fade out the impact sprite right after 200 milliseconds
         game.time.events.add(200, this.fadeEnemyWeaponImpact, this);
        this.attackSound.play();
    }
};

lesserDemon.prototype.fadeEnemyWeaponImpact = function(){
   // fades the weapon impact sprite in 100 milliseconds
   game.add.tween(this.weaponImpact).to( { alpha: 0 }, 100, Phaser.Easing.Linear.None, true);   
}
