export default class AbstractInteractiveItem {
	public sprite: any;
	private game: any;
	private name: string;
	private activeText: any;

	constructor(game: any, name: string) {
		this.game = game;		
		this.name = name;
	}

	protected _configActiveText() {		
		this.activeText = this.game.add.text(200, 100, '');
    	this.activeText.anchor.set(0.5);
    	this.activeText.align = 'left';
    	this.activeText.font = 'Arial Black';
    	this.activeText.fontSize = 30;
    	this.activeText.fontWeight = 'bold';
    	this.activeText.fill = '#ec008c';
    	this.activeText.fixedToCamera = true;
	}

	public interact() {
	};
	public damage() {};
	public interrupt() {
		this.activeText.text = '';
		this.game.globalState.interactiveItem = null;
	};

	public update(player: any) {
		if (this.activeText) {
			this.activeText.text = '';
		}
    	this.game.physics.arcade.overlap(this.sprite, player, function() {
    		if (!this.activeText) {
    			this._configActiveText();
    		}
    		if (this.game.globalState.interactiveItem) {
				this.game.globalState.interactiveItem.activeText.text = '';
			}
			this.game.globalState.interactiveItem = this;
			this.game.globalState.interactiveItemCash = this;
			this.activeText.text = this.name;
    	}, null, this);
	}
}	
//module.exports = AbstractInteractiveItem;