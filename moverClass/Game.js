(function () {
	"use strict";

	var KEYCODE_LEFT = 37,
		KEYCODE_RIGHT = 39,
		KEYCODE_UP = 38,
		KEYCODE_DOWN = 40;

	window.addEventListener("load", onInit);

	// game variables
	var stage = null;
	var canvas = null;


	// frame rate of game
	var frameRate = 24;
	// spritesheet object
	var spriteSheet = null;
	// game objects
	var snake1 = null;
	var bug1 = null;
	var snakeMover1 = null;
	var bugMover1 = null;

	var snake2 = null;
	var bug2 = null;
	var snakeMover2 = null;
	var bugMover2 = null;

	// spritesheet data object
	var data = {
		"framerate": 24,
		"images": ["lib/assets.png"],
		"frames": [
			[350, 148, 71, 17, 0, -5, -16],
			[209, 148, 67, 22, 0, -2, -13],
			[140, 148, 65, 25, 0, -4, -15],
			[165, 80, 27, 44, 0, -15, -9],
			[132, 80, 29, 51, 0, -20, -8],
			[98, 80, 30, 60, 0, -25, -4],
			[327, 2, 32, 66, 0, -29, -1],
			[239, 2, 35, 70, 0, -35, 1],
			[194, 2, 41, 70, 0, -40, 1],
			[278, 2, 45, 68, 0, -46, -1],
			[2, 2, 63, 74, 0, -49, 1],
			[69, 2, 60, 74, 0, -52, 1],
			[133, 2, 57, 74, 0, -55, 1],
			[411, 2, 44, 64, 0, -55, -5],
			[363, 2, 44, 64, 0, -55, -5],
			[459, 2, 44, 64, 0, -55, -5],
			[2, 80, 44, 64, 0, -55, -5],
			[50, 80, 44, 64, 0, -55, -5],
			[507, 2, 0, 0, 0, 21, 13],
			[117, 148, 19, 29, 0, -9, -5],
			[62, 148, 22, 29, 0, -7, -5],
			[88, 148, 25, 29, 0, -7, -5],
			[487, 80, 21, 37, 0, -8, -1],
			[37, 148, 21, 37, 0, -8, -1],
			[231, 80, 22, 37, 0, -7, -1],
			[287, 80, 24, 37, 0, -5, -1],
			[257, 80, 26, 37, 0, -3, -1],
			[420, 80, 28, 37, 0, -2, -1],
			[315, 80, 31, 37, 0, 0, -1],
			[350, 80, 31, 37, 0, 0, -1],
			[385, 80, 31, 37, 0, 0, -1],
			[196, 80, 31, 37, 0, 0, -1],
			[2, 148, 31, 37, 0, 0, -1],
			[452, 80, 31, 37, 0, 0, -1],
			[315, 148, 31, 22, 0, 1, 1],
			[280, 148, 31, 22, 0, 1, 1]
		],
		"animations": {
			"snakeAlive": {
				"frames": [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2],
				"speed": 1
			},
			"snakeDead": {
				"frames": [
					3,
					4,
					5,
					6,
					7,
					8,
					9,
					10,
					11,
					12,
					12,
					12,
					12,
					12,
					12,
					12,
					12,
					12,
					12,
					12,
					12,
					12,
					13,
					14,
					15,
					16,
					17,
					18
				],
				"speed": 1
			},
			"bugDead": {
				"frames": [
					22,
					23,
					24,
					25,
					26,
					27,
					28,
					28,
					28,
					28,
					28,
					28,
					29,
					30,
					31,
					32,
					33,
					18
				],
				"speed": 1
			},
			"bugAlive": {
				"frames": [19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21],
				"speed": 1
			},
			"btnNavDown": {
				"frames": [35],
				"speed": 1
			},
			"btnNavUp": {
				"frames": [34],
				"speed": 1
			}
		}
	};

	// ------------------------------------------------------------ event handlers
	function onInit() {
		console.log(">> initializing");

		// get reference to canvas
		canvas = document.getElementById("stage");
		// set canvas to as wide/high as the browser window
		canvas.width = 600;
		canvas.height = 600;
		// create stage object
		stage = new createjs.Stage(canvas);

		// construct Spritesheet object using data - will preload the assets.png
		spriteSheet = new createjs.SpriteSheet(data);
		if (spriteSheet.complete == false) spriteSheet.addEventListener("complete", onReady);
		else onReady();

		// startup the ticker
		createjs.Ticker.setFPS(frameRate);
		createjs.Ticker.addEventListener("tick", onTick);
	}

	function onReady(e) {
		console.log(">> adding sprites to game");
		spriteSheet.removeEventListener("complete", onReady);

		// construct snake sprites and movers
		snake1 = new createjs.Sprite(spriteSheet);
		snake1.x = 250;
		snake1.y = 250;
		snake1.gotoAndStop("snakeAlive");
		stage.addChild(snake1);
		snakeMover1 = new Mover(snake1, stage);
		snakeMover1.setSpeed(6);
		snakeMover1.startMe();
		snakeMover1.setDirection(1)

		snake2 = new createjs.Sprite(spriteSheet);
		snake2.x = 250;
		snake2.y = 150;
		snake2.gotoAndStop("snakeAlive");
		stage.addChild(snake2);
		snakeMover2 = new Mover(snake2, stage);
		snakeMover2.setSpeed(6);
		snakeMover2.startMe();
		snakeMover2.setDirection(2)


		// Construct bug sprites and movers
		bug1 = new createjs.Sprite(spriteSheet);
		bug1.x = 100;
		bug1.y = 100;
		bug1.gotoAndStop("bugAlive");
		stage.addChild(bug1);
		bugMover1 = new Mover(bug1, stage);
		bugMover1.startMe();
		bugMover1.setDirection(3)


		bug2 = new createjs.Sprite(spriteSheet);
		bug2.x = 100;
		bug2.y = 350;
		bug2.gotoAndStop("bugAlive");
		stage.addChild(bug2);
		bugMover2 = new Mover(bug2, stage);
		bugMover2.startMe();
		bugMover2.setDirection(4)


		console.log("is bug moving? " + bugMover1.getMoving());
		console.log(">> game ready");

	}

	function onTick(e) {
		// TESTING FPS
		document.getElementById("fps").innerHTML = createjs.Ticker.getMeasuredFPS();

		// game loop code here
		snakeMover1.updateMe();
		snakeMover2.updateMe()
		bugMover1.updateMe();
		bugMover2.updateMe()

		// update the stage!
		stage.update();
	}

})();