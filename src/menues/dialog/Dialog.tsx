const paper =  require('./paper.jpg');
const TILE = 'dialog.tile';

class Dialog {
	private game: any;
	private menu: any;
	private dialogJson: any;
	private text: any;
	private answers: any;
	private openSound: any;
	public isVisible: boolean = false;

	constructor(game : any, dialogJson: any) {
		this.game = game;
		this.dialogJson = dialogJson;
    	this.game.load.image(TILE, paper);
	};
	public open() {
		if (!this.isVisible) {
			this.isVisible = true;
	    	//this.menu = this.game.add.sprite(0,0, TILE);
	    	//this.menu.fixedToCamera = true;
	    	this._buildNode(this.dialogJson)
	    }
	};
	public close() { 
		if (this.isVisible) { 
			this._destroy();
		}
	};
	private _destroy() {  
		this.isVisible = false;
		//if (this.menu) {      
	    //	this.menu.kill();
	    //	this.menu = null;
	    //}
	    this._cleanText();
	};
	private _cleanText() {
		if (this.answers) {      
	    	Array.from(this.answers).forEach(
	    		(answer : any) => answer.destroy()
	    	)
	    	this.answers = null;
	    }
		if (this.text) {      
	    	this.text.destroy();
	    	this.text = null;
	    }		
	};
	private _buildNode(node: any) {
		this._cleanText()
		this.text = this._buildText(100, 100, node.text)
		this.text.wordWrap = true;
		this.text.wordWrapWidth = this.game.width - 200;
		if (node.answers) {
			this._loadAnswers(node);
		}
		if (node.update) {
			this._update(node.update)
		}
	};
	private _overAnswer(text: any) {
		text.fill = '#ffffff'
    	text.stroke = "#000000";
	};
	private _outAnswer(text: any) {
		text.fill = '#000000'
    	text.stroke = "#ffffff";
	};
	private _buildText(x: number, y: number, text1: string): any {
		let text = this.game.add.text(x, y, text1);
		text.fill = '#000000'
    	text.fontSize = 20;
    	text.font = 'InventoryLine';
    	text.fixedToCamera = true;
    	text.stroke = "#ffffff";
    	text.strokeThickness = 1;
    	return text;
	};
	private _loadAnswers (node: any) {
		let pos = this.game.world.height - 150;
		this.answers = [];
		Array.from(node.answers).forEach(function(answer: any) {
			if(!answer.conditions || (answer.conditions && this._checkPermission(answer.conditions))) {
				let text = this._buildText(50, pos, answer.phrase);
				pos -= 30;
   				text.inputEnabled = true;
    			text.events.onInputDown.add(this._buildNode.bind(this, answer), this);
    			text.events.onInputOver.add(this._overAnswer.bind(this, text), this);
    			text.events.onInputOut.add(this._outAnswer.bind(this, text), this);
				this.answers.push(text);
			}
		}, this);
	};
	private _update(node: any) {
		if (node.quest) {
			this._updateQuest(node.quest);
		}
	};
	private _updateQuest (node: any) {
		if(this.game.globalState.quests[node.name]) {
			let quest = this.game.globalState.quests[node.name];
			quest.setState(node.stage)
		}
	};
	private _checkPermission (node: any): boolean {
		if(node.quest) {
			return this._checkQuestPermission(node.quest)
		}
		return true
	};
	private _checkQuestPermission (node: any): boolean {
		if(this.game.globalState.quests[node.name] && this.game.globalState.quests[node.name].currentStage === node.stage) {
			return true
		}
		return false
	};
}

module.exports = Dialog;