const doorSound = require('./door.wav');
import AbstractInteractiveItem from '../../abstract/AbstractInteractiveItem';

export default class Building extends (AbstractInteractiveItem as { new(game: any, name: string): any; }){
	private position: number;
	private entrance: any;
	private indoor: boolean;
	private doorSound: any;
	private doorSize: any = [100, 200];

	constructor(game: any, name: any, config: any) {
		super(game, name);
		this.entrance = config.entrance;
		this.position = config.position;		
        this.game.load.image(name, config.sprite);
		this.game.load.audio(`${this.name}.door.sound`, doorSound);
		if(this.doorSound){
			this.doorSound.destroy();
		}
	}
	public destroy() {
		if(this.sprite){
			this.sprite.kill();
		}
	}
	public load() {
   		this.doorSound = this.game.add.audio(`${this.name}.door.sound`);
    	this.sprite = this.game.add.sprite(this.position, -1000, this.name);


//		this.sprite.tint = 0x333333;
		


		this._configPhysics()
	}
	private _configPhysics() {
    	this.game.physics.enable([this.sprite], this.game.globalState.Phaser.Physics.ARCADE);
    	this.sprite.body.setSize(...this.doorSize, ...this.entrance);
    	this.game.physics.arcade.enable(this.sprite);
    	this.sprite.body.bounce.y = 0;
    	this.sprite.body.gravity.y = 800;    	
    	this.sprite.body.collideWorldBounds = true;
    	this.sprite.body.fixedRotation = true;
    	this.sprite.body.immovable = true;		
	}
	public interact () {
		super.interact();
		this.doorSound.play();
	}
	public damage () {
	}
	public interrupt() {
		super.interrupt();
	}
}	
//module.exports = Building;