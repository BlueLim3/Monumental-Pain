/* Door.js
 * 6/13/2017
 * This file contains a prefab for creating doors used to navigate
 * between different tilemaps, it also contains a prefab for Events
 * which are sprites that carry a function which execute on some
 * sort of interaction with the player
*/
var Door = function(game,x,y,dest,width,height,retX,retY){
    console.log("Door: create");
    Phaser.Sprite.call(this,game,x,y,'collider',0);

    // sets the destination and the return location
    this.destination = dest;
    this.retX = retX;
    this.retY = retY;
    
    // ensure that the door is big enough to interact with
    this.scale.set(width,height);

    // if you do not ensure that all sound stops, there is wierd interference
    game.sound.stopAll();
};

Door.prototype = Object.create(Phaser.Sprite.prototype);
Door.prototype.constructor = Door;

// Event prefab
var Event = function(game,x,y,width,height,execute){
    console.log("Event: create");
    Phaser.Sprite.call(this,game,x,y,'collider',0);
    
    // set the objects size
    this.scale.set(width,height);
    
    // set a variable for the function that it carries
    this.execute = execute;
};

Event.prototype = Object.create(Phaser.Sprite.prototype);
Event.prototype.constructor = Event;
