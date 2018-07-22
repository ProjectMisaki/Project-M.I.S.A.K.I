const tile = require('./tile1.png');
const Weather = require('../../weather/Weather');
import Character from '../../npc/man/Npc';
import Building from '../../buildings/house/Building';
const music = require('./edvard-grieg-funeral-march.mp3');
const ground = require('./platform.png');
const grass = require('./grass_hd.png');
import Container from '../../buildings/containers/Container';
const InventoryItem = require('../../character/inventory/inventoryItem/InventoryItem')

export default class ForestLocation {
	game: any;
	weather: any;
	music: any;
	ground: any;
	flowers: any;
	tile: any;
	platforms: any;
    buildings: any;
    characters: any;
    containers: any;
    allItems: any = [];

	constructor(game: any) {
		this.game = game;
    	this.game.load.image('grass', grass);
    	this.game.load.audio('forest.music', music);
    	this.game.load.image('forest.tile', tile);
    	this.game.load.image('forest.ground', ground);

        this.buildings = [
            new Building(game, 'Pizza hut-hut-hut', require('../../presets/buildings/hut/config.js')),
        //    new Building(game, 'Tavern "Back Horse"', require('../../presets/buildings/tavern/config.js'))
        ]; 
        this.characters = [
            new Character(game, 'Zombie', require('../../presets/characters/zombie/config.js'))
        ]; 
        this.containers = [
            new Container(game, [
                new InventoryItem(game, 'leather armor', { speed: -50, weight: 30 }),
                new InventoryItem(game, 'confetti')
            ], 'box', require('../../presets/containers/box/config.js'))
        ];
        console.log(this.allItems, this.buildings)
        this.allItems = this.allItems.concat(this.buildings, this.characters, this.containers);
        console.log(this.allItems)
        this.weather = new Weather(game);
	}
	destroy() {
		if(this.tile){
			this.tile.destroy();
		}
        this.characters.forEach((character: any) => character.destroy());
		this.buildings.forEach((building: any) => building.destroy());
        this.containers.forEach((container: any) => container.destroy());
		this.weather.destroy();
		if(this.music){
    		this.music.destroy();
    	}
		if(this.ground){
    		this.ground.destroy();
    	}
		if(this.flowers){
    		this.flowers.destroy();
    	}
    	this.game.globalState.character.destroy()
    	//this.game.cache.removeSound('forest.music');
	}

	load(Phaser: any) {
    	this.game.load.image('forest.ground', ground);
   		this.music = this.game.add.audio('forest.music');
    	this.music.loopFull(1);

    	this.tile = this.game.add.tileSprite(0, 0, 1920, this.game.world.height-27, 'forest.tile');
        this.buildings.forEach((building: any) => building.load());
        this.characters.forEach((character: any) => character.load());
        this.containers.forEach((container: any) => container.create());

    	this.platforms = this.game.add.group();
    	this.platforms.enableBody = true;
    	this.ground = this.platforms.create(0, this.game.world.height - 32, 'forest.ground');
		this.ground.scale.setTo(20, 1);
    	this.ground.body.immovable = true;

    	this.game.globalState.character.create()

    	//this.flowers = this.game.add.tileSprite(0, this.game.world.height-115, 1920, 50, 'grass');
        //this.flowers.tint = 0x333333;
    	//this.flowers.tileScale.x =0.3
    	//this.flowers.tileScale.y =0.3
    	this.weather.rain();

        this.tile.tint = 0x333333;
        this.ground.tint = 0x333333;

        this.allItems.forEach((item: any) => item.sprite.tint = 0x333333);
        this.game.globalState.character.player.tint = 0x333333
	}

	update(player: any) {
        //this.game.globalState.interactiveItem = undefined;
        this.buildings.forEach((building: any) => building.update(player.player));
        this.characters.forEach((character: any) => character.update(player.player));
        this.containers.forEach((container: any) => container.update(player.player));
        player.update(this.game.physics.arcade.collide(player.player, this.platforms))
        //this.game.physics.arcade.collide(this.game.globalState.container.sprite, this.platforms)
	}
}	
//module.exports = ForestLocation;