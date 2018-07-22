const tile = require('./tile.png');
const Weather = require('../../weather/Weather.tsx');
const Npc = require('../../npc/man/Npc.tsx');
const Building = require('../../buildings/house/Building');
const music = require('./edvard-grieg-funeral-march.mp3');
const ground = require('./platform.png');
const grass = require('./grass_hd.png');
const tavern = require('../../buildings/house/building.png');
const hut = require('../../buildings/house/hut.png');
const man = require('../../npc/man/man.png');
const dialogJson = require('../../dialogs/man.dialog.js');

export default class ForestLocation {

	game: any;
	house: any;
    house2: any;
	weather: any;
	music: any;
	ground: any;
	flowers: any;
	tile: any;
	platforms: any;
    npc: any;

	constructor(game: any) {
		this.game = game;
    	this.game.load.image('grass', grass);
    	this.game.load.audio('forest.music', music);
    	this.game.load.image('forest.tile', tile);
    	this.game.load.image('forest.ground', ground);

        this.game.load.image('Pizza hut-hut-hut', hut);
        this.house2 =  new Building(game, 'Pizza hut-hut-hut', 1500, [310, 450]);
        this.game.load.image('man', man);
        this.npc = new Npc(game, 'man', 100, dialogJson);

        this.game.load.image('Tavern "Back Horse"', tavern);
    	this.house = new Building(game, 'Tavern "Back Horse"', 500, [500, 350]);
    	this.weather = new Weather(game);
    	this.music = null;
	}
	destroy() {
		if(this.tile){
			this.tile.kill();
		}
		this.house.destroy();
        this.house2.destroy();
		this.weather.destroy();
		if(this.music){
    		this.music.destroy();
    	}
		if(this.ground){
    		this.ground.kill();
    	}
		if(this.flowers){
    		this.flowers.kill();
    	}
    	this.game.globalState.character.destroy()
    	//this.game.cache.removeSound('forest.music');
	}

	load(Phaser: any) {
    	this.game.load.image('forest.ground', ground);
   		this.music = this.game.add.audio('forest.music');
    	this.music.loopFull(1);

    	this.tile = this.game.add.tileSprite(0, 0, 1920, this.game.world.height-27, 'forest.tile');
    	this.house.load();
        this.house2.load();
        this.npc.load();

    	this.platforms = this.game.add.group();
    	this.platforms.enableBody = true;
    	this.ground = this.platforms.create(0, this.game.world.height - 64, 'forest.ground');
		this.ground.scale.setTo(20, 1);
    	this.ground.body.immovable = true;

    	this.game.globalState.character.create()

    	this.flowers = this.game.add.tileSprite(0, this.game.world.height-115, 1920, 50, 'grass');
        this.flowers.tint = 0x333333;
    	this.flowers.tileScale.x =0.3
    	this.flowers.tileScale.y =0.3
    	this.weather.rain();

        this.tile.tint = 0x333333;
        this.ground.tint = 0x333333;

		this.game.globalState.interface.activeText = this.game.add.text(200, 100, '');
    	this.game.globalState.interface.activeText.anchor.set(0.5);
    	this.game.globalState.interface.activeText.align = 'left';
    	this.game.globalState.interface.activeText.font = 'Arial Black';
    	this.game.globalState.interface.activeText.fontSize = 30;
    	this.game.globalState.interface.activeText.fontWeight = 'bold';
    	this.game.globalState.interface.activeText.fill = '#ec008c';
    	this.game.globalState.interface.activeText.fixedToCamera = true;
	}

	update(character: any) {
		this.game.globalState.interface.activeText.text = '';
        this.game.globalState.interactiveItem = undefined;
    	this.house.update(character.player);
        this.house2.update(character.player);
        this.npc.update(character.player);
        character.update(this.game.physics.arcade.collide(character.player, this.platforms))
        this.game.globalState.container.update(character.player)
	}
}	