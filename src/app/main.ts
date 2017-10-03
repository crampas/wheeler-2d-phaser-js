/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>

import {Car, Vehicle, Angle, Vector} from "wheeler-2d"



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
    
      changeDirection(){
        var spd = 400;
        this.body.velocity.y = Math.random() * spd*2 - spd;
        this.body.velocity.x = Math.random() * spd*2 - spd;
    
        this.game.time.events.add(Phaser.Timer.SECOND * 0.25, this.changeDirection, this);
      }
    
     
    
}


class SimpleGame {
    
        constructor() {
            this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'wheeler-2d-phaser', { preload: this.preload, create: this.create });
        }
    
        game: Phaser.Game;
    
        preload() {
            this.game.load.image('logo', 'phaser2.png');
            this.game.load.image('car', 'car.png');
        }
    
        create() {
            var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
            logo.anchor.setTo(0.5, 0.5);

            var car = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'car');
            car.anchor.setTo(0.5, 0.5);
            car.rotation = Math.PI / 4;
            

            var gfx = this.game.add.graphics(100, 100);
            gfx.lineStyle(2, 0xFF00FF, 1);
            gfx.drawRect(0, 0, 100, 50);
            gfx.rotation = Math.PI / 8;


            let car1 = new Car();
            console.log("car1", car1);
        }
    
    }
    
    window.onload = () => {
    
        var game = new SimpleGame();
    
    };