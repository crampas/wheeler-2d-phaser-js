/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>

import {Car, Vehicle, Angle, Vector} from "wheeler-2d"




class SimpleGame {
    
        constructor() {
            this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'wheeler-2d-phaser', { preload: this.preload, create: this.create });
        }
    
        game: Phaser.Game;
    
        preload() {
            this.game.load.image('logo', 'phaser2.png');
        }
    
        create() {
            var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
            logo.anchor.setTo(0.5, 0.5);

            let car1 = new Car();
            console.log("car1", car1);
        }
    
    }
    
    window.onload = () => {
    
        var game = new SimpleGame();
    
    };