/* bossDemonBuild.js
 * 6/13/2017
 * This file is a prefab for creating the final boss in the game
 * it is necessary because the final boss has several unique properties
*/
'use strict';
var bossDemonBuild = function(game,scaleX,scaleY,x,y,src,frame){
	console.log("npcBuild: create");
	Phaser.Sprite.call(this,game,x,y,src,frame);

    // add animations
    this.x = x;
    this.y = y;
    this.animations.add('DemonBossWalkRight', [0, 1, 2, 3, 4, 5, 6, 7], 7, true);
    this.animations.add('DemonBossWalkLeft', [8, 9, 10, 11, 12, 13, 14, 15], 7, true);
    this.demonBossSlashRight = this.animations.add('DemonBossSlashRight', [16, 17, 18], 10, false);
    this.demonBossSlashLeft = this.animations.add('DemonBossSlashLeft', [19, 20, 21], 10, false);

    // timer for use in this prefab
    this.timer = game.time.create();

    // properties of the boss demon on spawn
    this.state = 'walking'
    this.health = 100;
    this.speed = 100;
    this.enraged = 0;
    this.enragedTimer = 4;   //initial value is 10 seconds(this is a cooldown)
    this.enragedDivider = 2; //initially half second delay, enraged is quarter second
    this.swordSlashDamage = this.addChild(game.make.sprite(0, 0, 'collider'));

    // add child sprite for vision
    // the sight of the demon is an invisible sprite that works on overlap with the player
    this.rFlag = 0;
    this.vision = this.addChild(game.make.sprite(0, 128, 'collider'));
    this.vision.scale.set(1000, 49);
    this.vision.anchor.set(.5,.5);
    this.vision.alpha = 0;
    game.physics.arcade.enable(this.vision);

    // values and sprite to use with the demons sword
    this.swordSlashHit = this.addChild(game.make.sprite(0, 160, 'collider'));
    this.swordSlashHit.scale.set(400,50);
    this.swordSlashHit.anchor.set(.5,.5);
    this.swordSlashHit.alpha = 0;
    game.physics.arcade.enable(this.swordSlashHit);


    // properties of the boss's body
    game.physics.arcade.enableBody(this);
    this.scale.setTo(scaleX,scaleY);
    this.body.setSize(140,180,140,140);
    this.anchor.setTo(.5,.5);
    
    // Initial direction of movement
    this.direction = -1; //positive = right, negative = left

    //sound
    this.attackSound = game.add.audio('bossAttackSound');
};

bossDemonBuild.prototype = Object.create(Phaser.Sprite.prototype);
bossDemonBuild.prototype.constructor = npcBuild;

bossDemonBuild.prototype.update = function(){
    // this checks for an enraged power for the boss,
    // when it is at low health, it becomes faster and more powerful
    if(this.health < 40 && this.enraged == 0){
        this.speed = 2*this.speed;
        this.enragedTimer = 2;
        this.enragedDivider = 8;
        this.enraged = 1;
    }
    // the demon will turn around if it can move no further
    if(this.body.blocked.right || this.body.blocked.left) {
        this.switchDir();
    }

    // makes the demon move when it is in the walking state
    // plays the correct animations depending on direction
    if(this.state === 'walking') {
        if(this.direction<0){
            this.body.velocity.x = -this.speed;
            this.animations.play('DemonBossWalkLeft');
        } else {
            this.body.velocity.x = this.speed;
            this.animations.play('DemonBossWalkRight');
        }
    } else {
        // if it is not walking, then it should not be moving
        this.body.velocity.x = 0;
    }
    // if the sprite for damaging the player overlaps with the player, the player will take damage
    game.physics.arcade.overlap(player, this.swordSlashDamage, damagePlayer2, null, this);

    // if the demon has 0 or less health, it will be destroyed and the victory screen will start
    if(this.health <= 0){
        game.sound.stopAll();
        this.destroy();
        var roar = game.add.audio('boss-roar');
        roar.play();
        var textObj = TEXT_DATA[BOSS_FIGHT_WIN];
        textBox(game, game.camera.width/2, game.camera.height/2, 0.5, 0.5, !NAVIGABLE, textObj);
    }

    // the player will collide withthe demon making it difficult to manuever around
    game.physics.arcade.collide(player, this, damagePlayer1,null,this);

    // if the the sword did hit the player, set a timer so that the demon will not immediately attack again
    game.physics.arcade.overlap(player, this.swordSlashHit, this.swordSlashtimer, null, this);

    // overlap with vision hitbox, if inside he will follow you
    game.physics.arcade.overlap(player, this.vision, this.bossChase, null, this);
};
// this function will make the boss switch directions
bossDemonBuild.prototype.switchDir = function() {
    if(this.direction < 0) {
        this.direction = 1;
        this.body.setSize(120,180,140,140)
        this.swordSlashHit.position.x = -this.swordSlashHit.position.x;
        this.body.position.x += 1;
    } else{
        this.direction = -1;
        this.body.setSize(120,180,140,140);
        this.swordSlashHit.position.x = -this.swordSlashHit.position.x;
        this.body.position.x -= 1;
    }
};

// this function stops the sword from immediately attacking again
bossDemonBuild.prototype.swordSlashtimer = function(){
    this.state = 'swordslashing'
    this.stopAnimation();
    //destroys detection hitbox
    this.swordSlashHit.destroy();
    //delay before his attack goes down
    game.time.events.add(Phaser.Timer.SECOND/this.enragedDivider, this.swordSlashAnimated, this); // no need to start the timer because game.time is allways running
};

// this function deels with when and how the demon will wield the sword
bossDemonBuild.prototype.swordSlashAnimated = function(){
    // if the boss is facing left
    if(this.direction < 0){
        // and if it is not enraged
        if(this.enraged === 0){
            // play the animation and create the damaging sprite
            this.animations.play('DemonBossSlashLeft',10,false);
            this.demonBossSlashRight.onComplete.add(function() {this.isAnimDone === 1;},this);
            if(this.isAnimDone = 1){
                game.physics.arcade.collide(player,this.body,damagePlayer2,null,this);
                this.swordSlashDamage = this.addChild(game.make.sprite(-96,160,'collider'));
                this.swordSlashDamage.scale.set(-320,50);
                this.swordSlashDamage.anchor.set(.5,.5);
                this.swordSlashDamage.alpha = 0;
                game.physics.arcade.enable(this.swordSlashDamage);
            }
        }else{ // i.e. it is enraged
            // play the animation and create a different damaging sprite
            this.animations.play('DemonBossSlashLeft',20,false);
            game.physics.arcade.collide(player,this.body,damagePlayer2,null,this);
            this.swordSlashDamage = this.addChild(game.make.sprite(-96,160,'collider'));
            this.swordSlashDamage.scale.set(-160,50);
            this.swordSlashDamage.anchor.set(.5,.5);
            this.swordSlashDamage.alpha = 0;
            game.physics.arcade.enable(this.swordSlashDamage);
            
        }
    }else{ // if the boss is facing right
        // and if the boss is not enraged
        if(this.enraged === 0){
            // play the right facing animation and create the damaging sprite
            this.animations.play('DemonBossSlashRight',10,false);
            game.physics.arcade.collide(player,this.body,damagePlayer2,null,this);
            this.swordSlashDamage = this.addChild(game.make.sprite(96,160,'collider'));
            this.swordSlashDamage.scale.set(160,50);
            this.swordSlashDamage.anchor.set(.5,.5);
            this.swordSlashDamage.alpha = 0;
            game.physics.arcade.enable(this.swordSlashDamage);
        }else{ // if the boss is enraged
            // create the other damaging sprite
            this.animations.play('DemonBossSlashRight',20,false);
            game.physics.arcade.collide(player,this.body,damagePlayer2,null,this);
            this.swordSlashDamage = this.addChild(game.make.sprite(96,160,'collider'));
            this.swordSlashDamage.scale.set(160,50);
            this.swordSlashDamage.anchor.set(.5,.5);
            this.swordSlashDamage.alpha = 0;
            game.physics.arcade.enable(this.swordSlashDamage);
        }
    }

    //plays sound
    this.attackSound.play();
    // timer controlling when the sword can attack and when the demon will start walking again
    // timer is shorter when the demon is enraged, so his attack is faster
    game.time.events.add(Phaser.Timer.SECOND*this.enragedTimer, createSwordSlashHit, this);
    game.time.events.add(Phaser.Timer.SECOND, this.startWalking, this);
    //this.state = 'walking'
};

// this is called to stop all animations
bossDemonBuild.prototype.stopAnimation = function(){
    this.animations.stop(null,true);
};

// called to make the demon start walking again
bossDemonBuild.prototype.startWalking = function(){
    this.swordSlashDamage.destroy();
    this.state = 'walking';
};

// this funciton allows the boss to chase after the player if he's on the same platform
bossDemonBuild.prototype.bossChase = function(){
    if((this.body.position.x > player.body.position.x) && (this.direction > 0)){
        this.switchDir();
    }
    if((this.body.position.x < player.body.position.x) && (this.direction < 0)){
        this.switchDir();
    }

}

// Creates the hitbox for the actual strike, enables physics,
// this allows it to  be called as an overlap in update
var createSwordSlashHit = function(){
    if(this.direction < 0){
        this.swordSlashHit = this.addChild(game.make.sprite(0,160, 'collider'));
        this.swordSlashHit.scale.set(250,50);
        this.swordSlashHit.anchor.set(.5,.5);
        this.swordSlashHit.alpha = 0;
        game.physics.arcade.enable(this.swordSlashHit);
    }else{
        this.swordSlashHit = this.addChild(game.make.sprite(150,160, 'collider'));
        this.swordSlashHit.scale.set(250,50);
        this.swordSlashHit.anchor.set(.5,.5);
        this.swordSlashHit.alpha = 0;
    }
};

// this function causes the player to take damage from the demon
// and places a knockback effect on the player
var damagePlayer2 = function(){
    //this.swordSlashDamage.destroy();
    //demon is always facing target for attack, no need for checks here
    player.body.velocity.x = 8*this.speed;
    player.body.velocity.y = -800;
    //if not invincible, damage and set invincible
    if(player.invincibility == 0){
        player.health -= 2;
        player.invincibility = 1;
        //timer to reset players invincibility
        game.time.events.add(Phaser.Timer.SECOND*1.5,function() {player.invincibility = 0},this);
    }
};

//this function causes the player to take 1 damage, not 2
var damagePlayer1 = function(){
    // if the player is to the left of the demon, and the demon is facing left, launch left
    if((player.body.position.x < this.body.position.x) && (this.direction < 0)){
        player.body.velocity.x = 8*this.speed;
    }else{
    // else, the player is to the left of the demon, and the demon is facing right, launch left
        player.body.velocity.x = -8*this.speed;
    }

    // if the player is to the right of the demon, and the demon is facing right, launch right
    if((player.body.position.x > this.body.position.x) && (this.direction > 0)){
        player.body.velocity.x = 8*this.speed;
    }else{
    // else the player is to the right, and the demon is facing left, launch right
        player.body.velocity.x = -8*this.speed;
    }

    // player goes flying
    player.body.velocity.y = -800;

    // if player is not currently invincible, damage and set invincible
    if(player.invincibility == 0){
        player.health -= 1;
        player.invincibility = 1;
        //timer to reset players invincibility back to 0
        game.time.events.add(Phaser.Timer.SECOND*1.5,function() {player.invincibility = 0},this);
    }
}