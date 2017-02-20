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
        console.log("Moving: " + moving)
    };
    this.stopMe = function () {
        sprite.stop();
        moving = false;
        console.log("Moving: " + moving)
    };

    this.updateMe = function () {
        if (moving == true) {
            // Declaring the width and height of the canvas as global variabless
            var width = stage.canvas.width
            var height = stage.canvas.height
            // Set rotation based on the direction property
            sprite.rotation = (direction * 90)
            // 1 = up, 2 = right, 3 = down, 4 = left (clockwise rotation)
            // Move the sprite up
            // if the direction is set to one
            if (direction == 1) {
                // Move up vertically based on the speed variable
                sprite.y = sprite.y - speed
                // Check if the sprite is over the top edge of the canvas
                if (sprite.y < 0) {
                    // Go to the opposite side of the screen (bottom edge)
                    sprite.y = height
                }
                // If the direction is set to 2
            } else if (direction == 2) {
                // Move right based on the speed value
                sprite.x = sprite.x + speed
                // Check if the sprite is outside of the canvas's right edge
                if (sprite.x > width) {
                    // Set x to the opposite side of the screen (left edge)
                    sprite.x = 0
                }
                // If the direction is set to three
            } else if (direction == 3) {
                // Move down based on the speed value
                sprite.y = sprite.y + speed
                // Check if the sprite is under the canvas's bottom edge
                if (sprite.y > height) {
                    // Set y to the opposite side of the screen (top edge)
                    sprite.y = 0
                }
                // If the direction is set to four
            } else if (direction == 4) {
                // Move left based on the speed
                sprite.x = sprite.x - speed;
                // Check if the sprite is outside of the canvas's left edge
                if (sprite.x < 0) {
                    // Set x to the opposite side of the screen (right edge)
                    sprite.x = width;
                }
            }
        }
    };

    // Added event listener to stop sprite, also removed stopMe() function
    sprite.addEventListener("click", function () {
        if (moving) {
            sprite.stop();
            moving = false;
            console.log("Moving: " + moving)
        } else {
            sprite.play();
            moving = true;
            console.log("Moving: " + moving)
        }
    })

}