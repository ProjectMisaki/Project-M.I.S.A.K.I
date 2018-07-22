//const notificationSound = require('./notification.mp3')
const QUEST_NAME_STYLE = {
	font: "24px Arial Black",
	fill: "#ffffff",
	align: 'right'
};

const QUEST_STAGE_STYLE = {
	font: "14px Arial Black",
	fill: "#ffffff",
	align: 'right'
};

class Quest {
	private currentStage: string = '0'; 
	private name: number;
	private state: number = 0;
	private stages: any;
	private game: any;
	private notificationSound: any;

	constructor(game : any, questJson: any) {
		this.game = game;
		this.stages = questJson.stage;
		this.name = questJson.name;
		this.notificationSound = this.game.add.audio('quest.notification.sound');
		this.notificationSound.volume = 0.1
		this.setState('1');
	};
	public setState(stage: string) {
		this.currentStage = stage;
		this._showInfo();
	}
	public getState(): string {
		return this.currentStage;
	}
	public getStageDescription(): string {
		return this.stages[this.currentStage];
	}
	private _showInfo() {
		this.notificationSound.play();
		let questNameText: any, questDescriptionText: any;
		
		let showNotification = function() {
			questNameText = this.game.add.text(this.game.width - 10, 50, this.name, QUEST_NAME_STYLE);
			questNameText.stroke = "#33adf3";
			questNameText.strokeThickness = 10;
			questNameText.setShadow(2, 2, "#333333", 2, true, true);
			questNameText.fixedToCamera = true; 
			questNameText.anchor.set(1);
			questNameText.setTextBounds(0, 0, this.game.world.width, 0);
			
			questDescriptionText = this.game.add.text(this.game.width - 10, 50, this.getStageDescription(), QUEST_STAGE_STYLE);
			questDescriptionText.setShadow(2, 2, "#333333", 2, true, true);
			questDescriptionText.stroke = "#a481da3";
			questDescriptionText.strokeThickness = 6;
			questDescriptionText.setShadow(2, 2, "#333333", 2, true, true);
			questDescriptionText.fixedToCamera = true;
			questDescriptionText.anchor.set(1);
			questDescriptionText.setTextBounds(0, 30, this.game.world.width, 0);
			
		
		}
		let hideNotification = function() {
			questNameText.destroy()
			questDescriptionText.destroy()
		}
		
		showNotification.call(this)
		setTimeout(hideNotification.bind(this), 5000)
	}

}

module.exports = Quest;