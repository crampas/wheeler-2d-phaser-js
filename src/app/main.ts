/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>

import { Car, Vehicle, Angle, Vector } from "wheeler-2d"


class BootState extends Phaser.State {

    public car: Car;
    public tender: Vehicle;
    public carSprite: Phaser.Sprite = null;
    public helmSprite: Phaser.Sprite = null;
    public tenderSprite: Phaser.Sprite = null;
    
    public cursors: Phaser.CursorKeys;

    constructor() {
        super();
    }

    preload() {

        this.cursors = game.input.keyboard.createCursorKeys();


        this.game.load.image('logo', 'phaser2.png');
        this.game.load.image('car', 'car.png');
        this.game.load.image('car-helm', 'car-helm.png');
        this.game.load.image('tender', 'tender.png');
        this.game.load.image('background', 'debug-grid-1920x1920.png');
    }

    create() {

        this.game.world.scale.setTo(0.25, 0.25);
        this.game.world.setBounds(0, 0, 20000, 20000);
        this.game.add.tileSprite(0, 0, 20000, 20000, 'background');

        this.car = new Car(new Vector(1000, 1000));
        this.car.axis = -300;
        this.car.velocity = 15 / 3.6 * 100;
        this.car.helm = new Vector(10, 2).normalize();

        this.tender = new Vehicle(new Vector(550, 1000));
        this.tender.axis = -300;
        this.car.tender = this.tender;


        this.carSprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'car');
        this.carSprite.anchor.setTo(0.8, 0.5);
        this.carSprite.width = 500;
        this.carSprite.height = 200;

        this.helmSprite = this.game.make.sprite(0,0, "car-helm");
        this.helmSprite.anchor.setTo(0, 0.5);
        this.helmSprite.width = 100;
        this.helmSprite.height = 200;
        this.carSprite.addChild(this.helmSprite);
        
        this.tenderSprite = this.game.make.sprite(0,0, "tender");
        this.tenderSprite.anchor.setTo(1, 0.5);
        this.tenderSprite.width = 600;
        this.tenderSprite.height = 300;
        this.tenderSprite.x = 550;
        this.tenderSprite.y = 1000;
        this.game.add.existing(this.tenderSprite);


        this.game.camera.follow(this.carSprite, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
    }

    public render() {
        game.debug.text("elapsedMS: " + this.car.helm, 32, 32);
    }

    update() {

        if (this.cursors.left.isDown) {
            this.car.helm = Angle.fromDegre(-20);
        }
        else if (this.cursors.right.isDown) {
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


        this.tenderSprite.x = this.tender.position.x;
        this.tenderSprite.y = this.tender.position.y;
        this.tenderSprite.rotation = Angle.getRad(this.tender.direction);

    }

}

const game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'wheeler-2d-phaser');
game.state.add('boot', new BootState());

game.state.start('boot');

