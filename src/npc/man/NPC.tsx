const Dialog1 = require('../../menues/dialog/Dialog');
import AbstractInteractiveItem from '../../abstract/AbstractInteractiveItem';

export default class Npc extends (AbstractInteractiveItem as { new(game: any, name: string): any; }){
	public health: 100;
	public attack: 10;

	private position: number;
	private indoor: boolean;
	private doorSound: any;
	private menu: any;
	private dialog: any;
	private doorSize: any = [100, 160];

	constructor(game: any, name: string, config: any) {
		super(game, name)
		this.position = config.position;		
        this.game.load.image(name, config.sprite);
		this.dialog = new Dialog1(this.game, config.dialog);
	}
	public destroy() {
		if(this.sprite){
			this.sprite.kill();
		}
	}
	public load() {
   		this.sprite = this.game.add.sprite(this.position, -1000, this.name);
		this._configPhysics()

//		this.sprite.tint = 0x333333;
	}
	private _configPhysics() {
    	this.game.physics.enable([this.sprite], this.game.globalState.Phaser.Physics.ARCADE);
    	this.sprite.body.setSize(87, 165, 0,0);
    	this.game.physics.arcade.enable(this.sprite);
    	this.sprite.body.bounce.y = 0;
    	this.sprite.body.gravity.y = 800;    	
    	this.sprite.body.collideWorldBounds = true;
    	this.sprite.body.fixedRotation = true;
    	this.sprite.body.immovable = true;		
	}
	public damage() {
    	this.destroy()		
	}
	public interact() {
		if (!this.dialog.isVisible) {
			super.interact();
			this.dialog.open();
		}		
	}
	public interrupt() {
		if (this.dialog.isVisible) {
			super.interrupt();
			this.dialog.close();
		}	
	}
}
//module.exports = Npc;