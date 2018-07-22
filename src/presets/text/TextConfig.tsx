//const CONTAINER_BACKGROUND =  require('./paper.jpg');
//const CONTAINER_TILE = 'container.tile';
//const InteractiveObject = require('../../abstract/AbstractInteractiveItem');
const INVENTORY_ITEM = {
	font: "14px Arial Black",
	fill: "#ffffff",
	align: 'left'
};
class TextConfig {

	public static inventoryItem(game: any, x: number, y: number, text: string) {
		let displayedItems = game.add.text(x, y, text, INVENTORY_ITEM);
		displayedItems.setShadow(2, 2, "#333333", 2, true, true);
		displayedItems.setShadow(2, 2, "#333333", 2, true, true);
		displayedItems.fixedToCamera = true;
		displayedItems.anchor.set(0);
   		displayedItems.inputEnabled = true;
		return displayedItems
	}
}

module.exports = TextConfig;