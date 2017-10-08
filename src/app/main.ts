/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>

import { Car, Vehicle, Angle, Vector } from "wheeler-2d"


class BootState extends Phaser.State {

    public car: Car;
    public tender: Vehicle;
    public carSprite: Phaser.Sprite = null;
    public helmSprite: Phaser.Sprite = null;
    public tenderSprite: Phaser.Sprite = null;

    public map: Phaser.Tilemap = null;
    public backgroundlayer: Phaser.TilemapLayer = null;
    
    public cursors: Phaser.CursorKeys;

    constructor() {
        super();
    }

    preload() {

        this.cursors = game.input.keyboard.createCursorKeys();

        this.load.tilemap('desert', 'tileset/desert.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tmw_desert_spacing', 'tileset/tmw_desert_spacing.png');

        this.load.tilemap('wheeler', 'tileset/wheeler/wheeler-20x20.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('wheeler-street', 'tileset/wheeler/street-100.png');
        this.load.image('wheeler-building', 'tileset/wheeler/building-100.png');
        this.load.image('wheeler-factory', 'tileset/wheeler/factory-100.png');


        this.game.load.image('logo', 'phaser2.png');
        this.game.load.image('car', 'car.png');
        this.game.load.image('car-helm', 'car-helm.png');
        this.game.load.image('tender', 'tender.png');
        this.game.load.image('background', 'debug-grid-1920x1920.png');
    }

    create() {

        // this.game.world.scale.setTo(0.25, 0.25);
        // this.game.world.setBounds(0, 0, 20000, 20000);


        // this.map = this.game.add.tilemap('desert');
        // this.map.addTilesetImage('Desert', 'tmw_desert_spacing');
        // this.backgroundlayer = this.map.createLayer('Ground');
        // this.backgroundlayer.resizeWorld();

        this.map = this.game.add.tilemap('wheeler');
        this.map.addTilesetImage('street-100', 'wheeler-street');
        this.map.addTilesetImage('factory-100', 'wheeler-factory');
        this.map.addTilesetImage('building-100', 'wheeler-building');
        this.backgroundlayer = this.map.createLayer('Background');
        this.backgroundlayer.resizeWorld();




        // this.game.add.tileSprite(0, 0, 20000, 20000, 'background');

        this.car = new Car(new Vector(1000, 1000));
        this.car.axis = -30;
        this.car.velocity = 0;
        this.car.helm = new Vector(10, 2).normalize();

        this.tender = new Vehicle(new Vector(960, 1000));
        this.tender.axis = -30;
        this.car.tender = this.tender;


        this.carSprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'car');
        this.carSprite.anchor.setTo(0.8, 0.5);
        this.carSprite.width = 50;
        this.carSprite.height = 20;

        this.helmSprite = this.game.make.sprite(0,0, "car-helm");
        this.helmSprite.anchor.setTo(0, 0.5);
        this.carSprite.addChild(this.helmSprite);
        
        this.tenderSprite = this.game.make.sprite(0,0, "tender");
        this.tenderSprite.anchor.setTo(1, 0.5);
        this.tenderSprite.width = 60;
        this.tenderSprite.height = 30;
        this.tenderSprite.x = 550;
        this.tenderSprite.y = 1000;
        this.game.add.existing(this.tenderSprite);


        this.game.camera.follow(this.carSprite, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
    }

    public render() {
        game.debug.text("elapsedMS: " + this.game.time.elapsedMS, 32, 32);
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

        if (this.cursors.up.isDown) {
            this.car.velocity += 1;
        }
        else if (this.cursors.down.isDown) {
            this.car.velocity -= 1;
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

