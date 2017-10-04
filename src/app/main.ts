/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>

import { Car, Vehicle, Angle, Vector } from "wheeler-2d"



class Target extends Phaser.Sprite {

    //initialization code in the constructor
    constructor(game, x, y, frame) {
        super(game, x, y, 'color-wheel', frame);

        //setup physics properties
        this.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enableBody(this);
        this.body.collideWorldBounds = true;

        this.changeDirection();
    }

    changeDirection() {
        var spd = 400;
        this.body.velocity.y = Math.random() * spd * 2 - spd;
        this.body.velocity.x = Math.random() * spd * 2 - spd;

        this.game.time.events.add(Phaser.Timer.SECOND * 0.25, this.changeDirection, this);
    }



}


class BootState extends Phaser.State {

    public car: Car = new Car(new Vector(100, 100));
    public carSprite: Phaser.Sprite = null;
    public aaaaaMySpecialMmeber: number = 16384;

    constructor() {
        super();
    }

    preload() {
        this.game.load.image('logo', 'phaser2.png');
        this.game.load.image('car', 'car.png');
    }

    create() {
        // var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        // logo.anchor.setTo(0.5, 0.5);

        this.car.axis = -5;
        this.car.velocity = 1;
        this.car.helm = new Vector(10, 2).normalize();

        this.carSprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'car');
        this.carSprite.anchor.setTo(1, 0.5);
        this.carSprite.width = 5;
        this.carSprite.height = 10;
        


        var gfx = this.game.add.graphics(100, 100);
        gfx.lineStyle(2, 0xFF00FF, 1);
        gfx.drawRect(0, 0, 100, 50);
        gfx.rotation = Math.PI / 8;

        console.log("create", this);


        this.game.time.events.add(Phaser.Timer.SECOND * 0.25, this.update, this);
    }

    update() {
        this.car.update(0.25);

        this.carSprite.x = this.car.position.x;
        this.carSprite.y = this.car.position.y;
        this.carSprite.rotation = Angle.getRad(this.car.direction);

    }

}

const game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'wheeler-2d-phaser');
game.state.add('boot', new BootState());

game.state.start('boot');

class SimpleGame {

    public game: Phaser.Game;
    public car: Phaser.Sprite = null;
    public aaaaaMySpecialMmeber: number = 16384;

    constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'wheeler-2d-phaser', { preload: this.preload, create: this.create });
    }


    preload() {
        this.game.load.image('logo', 'phaser2.png');
        this.game.load.image('car', 'car.png');
    }



    create() {
        var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);

        this.car = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'car');
        this.car.anchor.setTo(0.5, 0.5);
        this.car.rotation = Math.PI / 4;


        var gfx = this.game.add.graphics(100, 100);
        gfx.lineStyle(2, 0xFF00FF, 1);
        gfx.drawRect(0, 0, 100, 50);
        gfx.rotation = Math.PI / 8;

        console.log("create", this);

        let car1 = new Car();
        console.log("car1", car1);
    }

    public updateFrame() {
        console.log("updateFrame", this);

        this.car.x += 1;
    }

}

// var game = new SimpleGame();

// function gameLoop() {
//     game.updateFrame();
//     // window.requestAnimationFrame(gameLoop);
// }


// window.onload = () => {
//     window.requestAnimationFrame(gameLoop);
// };

