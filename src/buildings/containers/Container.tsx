const CONTAINER_BACKGROUND =  require('./paper.jpg');
const CONTAINER_TILE = 'container.tile';
import AbstractInteractiveItem from '../../abstract/AbstractInteractiveItem';
const QUEST_STAGE_STYLE2 = {
	font: "32px InventoryLine",
	fill: "#000000",
	align: 'left'
};
export default class Container extends (AbstractInteractiveItem as { new(game: any, name: string): any; }){
	private items: any;
	private menu: any;
	public isContainer: boolean = true;
	private position: any;
	private isOpen: any = false;
	private displayedItems: any = [];

	constructor(game: any, items: any, name: string, config: any) {
		super(game, name)
    	this.items = items;
    	this.position = config.position;
    	this.game.load.image('container.${name}', config.sprite);
    	this.game.load.image(CONTAINER_TILE, CONTAINER_BACKGROUND);
	}
	public create() {
		this.sprite = this.game.add.sprite(this.position, 200, 'container.${name}');
		this._configPhysics()
	}

	destroy() {
		this.hide()
		this.sprite.destroy();
	}

	interrupt() {
		if(this.isOpen) {
			super.interrupt();
			this.hide();
			this.game.globalState.inventory.hide()
			this.isOpen = false;
		}
	}

	interact() {
		if(!this.isOpen) {
			super.interact();
			this.show();
			this.game.globalState.inventory.show();
			this.isOpen = true;
		}
	}

	private _configPhysics() {
		this.game.physics.enable([this.sprite], this.game.globalState.Phaser.Physics.ARCADE);
    	this.sprite.body.setSize(100, 120, 0,0);
		this.game.physics.arcade.enable(this.sprite);
		this.sprite.body.bounce.y = 0;
		this.sprite.body.gravity.y = 800;    	
		this.sprite.body.collideWorldBounds = true;
		this.sprite.body.fixedRotation = true;
		this.sprite.body.immovable = true;		
	}
	public show() {
		this.menu = this.game.add.tileSprite(0, 0, 300, this.game.world.height, CONTAINER_TILE);
		this.menu.width = 300;
		this.menu.fixedToCamera = true;
		Array.from(this.items).forEach((item: any, i: number)=> {	
			let displayedItems = this.game.add.text(10, 20 + 30 * i, item.getText(), QUEST_STAGE_STYLE2);
			displayedItems.setShadow(2, 2, "#333333", 2, true, true);
			displayedItems.setShadow(2, 2, "#333333", 2, true, true);
			displayedItems.fixedToCamera = true;
			displayedItems.anchor.set(0);
   			displayedItems.inputEnabled = true;
			displayedItems.events.onInputDown.add(this._moveItem.bind(this, displayedItems), this);
			this.displayedItems.push(displayedItems);
		})
	}

	private _moveItem(clickedItem: any) {
		let index = undefined;
		const foundItem = this.items.find((item: any, i: number) => {
			if(clickedItem.text === item.getText()) {
				index = i;
				return true;
			}
			return false;
		});
		this.items.splice(index, 1);
		this.hide()
		this.show()
		this.game.globalState.inventory.add(foundItem);
		this.game.globalState.inventory.hide()
		this.game.globalState.inventory.show()
	}

	public hide() {
		Array.from(this.displayedItems).forEach((item: any) => {
			item.destroy()
		})
		this.displayedItems = [];
		if (this.menu) {      
	    	this.menu.destroy();
	    	this.menu = null;
	    }
	}
	public add(item: string) {
		this.items.push(item);
	}
}

//module.exports = Container;