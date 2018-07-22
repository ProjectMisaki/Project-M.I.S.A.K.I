const INVENTORY_BACKGROUND =  require('./paper.jpg');
const INVENTORY_TILE = 'inventory.tile';
const QUEST_STAGE_STYLE1 = {
	font: "14px Arial Black",
	fill: "#ffffff",
	align: 'right'
};
class Inventory {
	private game: any;
	private items: any;
	private header: any;
	private menu: any;
	public isOpen: boolean = false;
	private displayedItems: any = [];

	constructor(game: any, items: any) {
		this.game = game;
    	this.items = items;
    	this.game.load.image(INVENTORY_TILE, INVENTORY_BACKGROUND);
	}
	public show() {
	    this.menu = this.game.add.tileSprite(this.game.width - 300, 0, this.game.width, this.game.world.height, INVENTORY_TILE);
	    this.menu.width = this.game.width - 300;
	    this.menu.fixedToCamera = true;
	    this.header = this.game.add.text(this.game.width - 300 + 20, 0, 'Inventory', {font: "40px InventoryLine", fill: "ffffff"});
		this.header.setShadow(2, 2, "#333333", 2, true, true);
		this.header.fixedToCamera = true;
		this.header.anchor.set(0);
		this.header.setTextBounds(0, 30, this.game.world.width, 0);
		Array.from(this.items).forEach((item: any, i: number)=> {
			let line = item.configText(this.game.width - 300 + 20, 50 + 30 * i)
			line.events.onInputDown.add(this._moveItem.bind(this, line), this);
			this.displayedItems.push(line);
		})
		this.isOpen = true;
	}
	public hide() {
		Array.from(this.displayedItems).forEach((item: any) => {
				item.destroy()
		})
		if (this.header) {  
			this.header.destroy()
			this.header = null;
		}
		this.displayedItems = [];
		this.isOpen = false;
		if (this.menu) {      
	    	this.menu.destroy();
	    	this.menu = null;
	    }
	}
	public add(item: string) {
		this.items.push(item);
	}

	private _moveItem(clickedItem: any) {
		let index;
		let triggered = false;
		const foundItem = this.items.find((item: any, i: number) => {
			if(clickedItem.text === item.getText()) {
				index = i;
				if (item.isEquiped) {
					item.unequip();
					triggered = true;
				}
				return true;
			}
			return false;
		});
		if (typeof index !== 'undefined' && this.game.globalState.interactiveItem && this.game.globalState.interactiveItem.isOpen) {
			this.items.splice(index, 1);
			this.game.globalState.interactiveItem.add(foundItem);
			this.game.globalState.interactiveItem.hide()
			this.game.globalState.interactiveItem.show()
		} else if (typeof index !== 'undefined' && !triggered) {
			this.items[index].equip();
		}
		this.hide();
		this.show();
	}
}

module.exports = Inventory;