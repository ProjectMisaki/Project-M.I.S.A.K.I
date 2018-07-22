const Book1 = require('../../../menues/book/Book');
const LINE_STYLE = {
	font: "32px InventoryLine",
	fill: "#000000",
	align: 'left'
};
class InventoryItem {
	private game: any;
	private text: string;
	private content: any;
	public isEquipable: boolean = false;
	public isReadable: boolean = false;
	private stats: any = {
		speed: 0,
		weight: 0
	};
	public isEquiped: boolean = false;

	constructor(game: any, text: string, stats: any) {
		this.game = game;
    	this.text = text;
    	if (typeof stats === 'object') {
    		this.isEquipable = true;
    		this.isEquiped = false;
    	} else if (typeof stats === 'string') {
    		this.isReadable = true;
    		this.content = new Book1(game, stats);
    	}
    	Object.assign(this.stats, stats);
	}
	public getText() {
		if(this.isEquiped) {
			return `■ ${this.text}`;
		}
		return this.text;
	}
	private _over(clickedItem: any) {
		//clickedItem.fill = '#ffffff'
    	clickedItem.strokeThickness = 2;
	}
	private _out(clickedItem: any) {
		//clickedItem.fill = '#000000'
    	clickedItem.strokeThickness = 0;
	}
	public configText(x: number, y: number) {
		const line = this.game.add.text(x, y, this.getText(), LINE_STYLE);
		line.setShadow(2, 2, "#333333", 2, true, true);
		line.fixedToCamera = true;
		line.anchor.set(0);
		line.setTextBounds(0, 30, this.game.world.width, 0);
   		line.inputEnabled = true;
    	line.stroke = "#ffffff";
    	line.strokeThickness = 0;
		line.events.onInputOut.add(this._out.bind(this, line), this);
		line.events.onInputOver.add(this._over.bind(this, line), this);
   		return line;
	}
	public getContent() {
		return this.content;
	}
	public equip() {
		this.isEquiped = true;
		if(this.isEquipable) {
			this.game.globalState.character.speed += this.stats.speed;
			this.game.globalState.character.weight -= this.stats.weight;
		} else if(this.isReadable) {
			this.content.open()
		}
	}
	public unequip() {
		this.isEquiped = false;
		if(this.isEquipable) {
			this.game.globalState.character.speed -= this.stats.speed;
			this.game.globalState.character.weight += this.stats.weight;
		} else if(this.isReadable) {
			this.content.close()
		}
	}

}

module.exports = InventoryItem;