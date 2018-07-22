const BOOK_BACKGROUND =  require('./paper.jpg');
const BOOK_TILE = 'book.tile';

class Book {
	private game: any;
	private menu: any;
	private dialogJson: any;
	private text: any;
	private textObject: any;
	private answers: any;
	private openSound: any;
	public isVisible: boolean = false;

	constructor(game : any, text: any) {
		this.game = game;
		this.text = text;
    	this.game.load.image(BOOK_TILE, BOOK_BACKGROUND);
	};
	public open() {
		if (!this.isVisible) {
			this.isVisible = true;
	    	this.menu = this.game.add.tileSprite(0, 0, this.game.width - 300, this.game.world.height, BOOK_TILE);
	    	//this.game.add.sprite(0,0, BOOK_TILE);
	    	this.menu.width = this.game.width - 300;
	    	this.menu.fixedToCamera = true;
	    	this._buildText(this.text)
	    }
	};
	public close() { 
		if (this.isVisible) {
			this._destroy();
		}
	};
	private _destroy() {  
		this.isVisible = false;
		if (this.menu) {      
	    	this.menu.destroy();
	    	this.menu = null;
	    }
	    this._clearText();
	};
	private _clearText() {
		if (this.textObject) {      
	    	this.textObject.destroy();
	    	this.textObject = null;
	    }		
	};
//	private _buildNode(node: any) {
//		this._clearText()
//		this.text = this._buildText(100, 100, node.text)
//	};
	private _buildText(text: string): any {
		this.textObject = this.game.add.text(50, 50, text);
		this.textObject.fill = '#000000'
    	this.textObject.fontSize = 40;
    	this.textObject.font = 'FantasyFont';
    	this.textObject.fixedToCamera = true;
		this.textObject.wordWrap = true;
		this.textObject.wordWrapWidth = this.game.width - 300 - 100;
	};
//	private _update(node: any) {
//		if (node.quest) {
//			this._updateQuest(node.quest);
//		}
//	};
}

module.exports = Book;