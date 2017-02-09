function Mover(sprite, stage) {
    "use strict";

    // private property variables
    var speed = 2;
    var direction = 4;
    var moving = false;


    // stop the sprite animating just in case
    sprite.stop();

    // ------------------------------------------ get/set methods
    this.setSpeed = function (value) {
        speed = value;
    };
    this.getSpeed = function () {
        return speed;
    };

    this.getMoving = function () {
        return moving;
    };

    this.setDirection = function (value) {
        direction = value;
    };

    // ------------------------------------------ public methods
    this.startMe = function () {
        sprite.play();
        moving = true;
    };


    this.updateMe = function () {
        if (moving == true) {
            // Declaring the width and height of the canvas as global vars
            var width = stage.canvas.width
            var height = stage.canvas.height
            // Set rotation based on the direction property
            sprite.rotation = (direction*90)
            // 1 = up, 2 = right, 3 = down, 4 = left (clockwise rotation)
            // move the sprite up
            if (direction == 1) {
                sprite.y = sprite.y - speed
                // Check if the sprite is offscreen
                if (sprite.y < 0) {
                    sprite.y = height
                }
            } else if (direction == 2) {
                sprite.x = sprite.x + speed
                // Check if the sprite is offscreen
                if (sprite.x > width) {
                    console.log(sprite.getBounds().width)
                    sprite.x = 0
                }
            } else if (direction == 3) {
                sprite.y = sprite.y + speed
                // Check if the sprite is offscreen
                if (sprite.y > height) {
                    sprite.y = 0
                }
            } else if (direction == 4) {
                sprite.x = sprite.x - speed;
                // is sprite off the stage?
                if (sprite.x < 0) {
                    sprite.x = width;
                }
            }
        }
    };

    // Added event listener to stop sprite, also removed stopMe() function
    sprite.addEventListener("click", function () {
        sprite.stop()
        moving = false
        console.log("Stopped")
    })

};