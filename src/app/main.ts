/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>

import { Car, Vehicle, Angle, Vector } from "wheeler-2d"


class BootState extends Phaser.State {

    public car: Car = new Car(new Vector(100, 100));
    public carSprite: Phaser.Sprite = null;
    public helmSprite: Phaser.Sprite = null;

    public aaaaaMySpecialMmeber: number = 16384;

    public keyLeft;
    public keyRight;

    constructor() {
        super();
    }

    preload() {
        this.game.load.image('logo', 'phaser2.png');
        this.game.load.image('car', 'car.png');
        this.game.load.image('car-helm', 'car-helm.png');
    }

    create() {

        this.keyLeft = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.keyRight = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

        this.car.axis = -40;
        this.car.velocity = 20 / 3.6 * 10;
        this.car.helm = new Vector(10, 2).normalize();

        this.carSprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'car');
        this.carSprite.anchor.setTo(1, 0.5);
        this.carSprite.width = 50;
        this.carSprite.height = 20;

        this.helmSprite = this.game.make.sprite(0,0, "car-helm");
        this.helmSprite.anchor.setTo(0, 0.5);
        this.helmSprite.width = 20;
        this.helmSprite.height = 20;
        this.helmSprite.z = 1;
        this.carSprite.addChild(this.helmSprite);
        


        var gfx = this.game.add.graphics(100, 100);
        gfx.lineStyle(2, 0xFF00FF, 1);
        gfx.drawRect(0, 0, 100, 50);
        gfx.rotation = Math.PI / 8;

        console.log("create", this);


        // this.game.time.events.add(Phaser.Timer.SECOND * 0.25, this.update, this);
    }

    public render() {
        game.debug.text("elapsedMS: " + this.car.helm, 32, 32);
    }

    update() {

        if (this.keyLeft.isDown) {
            this.car.helm = Angle.fromDegre(-20);
        }
        else if (this.keyRight.isDown) {
            this.car.helm = Angle.fromDegre(20);
        }
        else {
            this.car.helm = Angle.fromDegre(0);
        }

        
        this.car.update(game.time.elapsedMS / 1000.0);
        this.carSprite.x = this.car.position.x;
        this.carSprite.y = this.car.position.y;
        this.carSprite.rotation = Angle.getRad(this.car.direction);

        this.helmSprite.rotation = Angle.getRad(this.car.helm);
    }

}

const game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'wheeler-2d-phaser');
game.state.add('boot', new BootState());

game.state.start('boot');

