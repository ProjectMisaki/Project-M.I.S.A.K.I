class KeyListener {
	private game: any;
	private keys: object;
	private inventoryOpen: boolean = false;

	constructor(game: any, Phaser: any) {
		this.game = game
		const keys = {
    		attack: game.input.keyboard.addKey(Phaser.Keyboard.R),
    		map: game.input.keyboard.addKey(Phaser.Keyboard.M),
    		close: game.input.keyboard.addKey(Phaser.Keyboard.ESC),
    		jump: game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
    		left: game.input.keyboard.addKey(Phaser.Keyboard.A),
    		right: game.input.keyboard.addKey(Phaser.Keyboard.D),
    		inventory: game.input.keyboard.addKey(Phaser.Keyboard.C),
    		action: game.input.keyboard.addKey(Phaser.Keyboard.F)
    	}
    	game.globalState.keys = keys;
    	game.input.keyboard.createCursorKeys();
	}
	run() {	
		//Movement
	    if (this.game.globalState.keys.left.isDown){
	    	this.game.globalState.character.moveLeft();
	    } else if (this.game.globalState.keys.right.isDown){
	    	this.game.globalState.character.moveRight();
	    } else if (this.game.globalState.keys.attack.isDown){
	    	this.game.globalState.character.attack();
	    }
	    else{
	    	this.game.globalState.character.stay();
	    }

	    //Interaction
	    if (this.game.globalState.keys.action.isDown && this.game.globalState.interactiveItem) {
				this.game.globalState.interactiveItem.interact();
		} else if(!this.game.globalState.interactiveItem && this.game.globalState.interactiveItemCash){
			this.game.globalState.interactiveItemCash.interrupt();
		} else if(this.game.globalState.interactiveItem && this.game.globalState.keys.close.isDown){
			this.game.globalState.interactiveItem.interrupt();
		}

	    //Inventory
	    if (this.game.globalState.keys.inventory.isDown && !this.game.globalState.inventory.isOpen) {
			this.game.globalState.inventory.show();
		} else if (this.game.globalState.keys.close.isDown && this.game.globalState.inventory.isOpen) {
			this.game.globalState.inventory.hide();
		}
   	}	
}

module.exports = KeyListener;