import MountainsLocation from '../../location/mountains/MountainsLocation';
import ForestLocation from '../../location/forest/ForestLocation';

const SOUND = 'dialog.sound';

export default class Map {

	game: any;
	menuIsVisible: boolean;
	button: any;
	button2: any;
	menu: any;
	location: any;
	mountainsLocation: any;
	forestLocation: any;
	openSound: any;

	constructor(game : any) {
		this.game = game;
    	this.game.load.image('map.paper', require('./paper.jpg'));
    	this.game.load.spritesheet('map.forest', require('./forest.png'), 50, 50);
    	this.game.load.audio(SOUND, require('./door_lock.wav'));
    	this.game.load.spritesheet('map.mountains', require('./mountains.png'), 50, 50);
	};

	destroy() {            
	    this.menu.kill();
	    this.button.kill();
	    this.button2.kill();
	    this.menu = null;
	    this.button = null;
	    this.button2 = null;
	    this.menuIsVisible = false;
	};

	create(Phaser: any) {
	    this.game.camera.onFadeComplete.add(this.switchTo, this);
		this.game.camera.resetFX()
	};

	update() {	
	    if (this.game.globalState.keys.map.isDown) {
	        if(!this.menu && !this.menuIsVisible) {

				this.openSound = this.game.add.audio(SOUND);
				this.openSound.volume = 0.1
				this.openSound.play();

	        	//this.menu = this.game.add.tileSprite(0, 0, 800, this.game.world.height-27, 'map.background');
	            this.menu = this.game.add.sprite(0,0, 'map.paper');
	            this.menu.fixedToCamera = true;
	            this.button = this.game.add.button(250, 300, 'map.mountains', this.actionOnClick, this, 1,0,0);
	            this.button2 = this.game.add.button(250, 400, 'map.forest', this.actionOnClick2, this, 1,0,0);
	            this.button.fixedToCamera = true;
	            this.button2.fixedToCamera = true;
	        } else if(this.menu && this.menuIsVisible){
	        	
		this.openSound.play();
	            this.destroy();
	            this.menuIsVisible = true;
	        }
	    }
	
	    if (this.game.globalState.keys.map.isUp)
	    {
	        if (this.menu) {
	            this.menuIsVisible = true;
	        } else {
	            this.menuIsVisible = false;
	        }
	    }
	    if (this.game.globalState.keys.close.isDown)
	    {
	        if (this.menu) {
		this.openSound.play();
	            this.destroy();
	        }
	    }
	}
	actionOnClick () {
		//this.location = new MountainsLocation(this.game)
		//location = mountainsLocation
		this.location = new MountainsLocation(this.game);
	    this.game.camera.fade(0x000000, 1000);
	
	}
	actionOnClick2 () {
		//this.location = new ForestLocation(this.game)
		this.location = new ForestLocation(this.game);
	    this.game.camera.fade(0x000000, 1000);
	
	}
	
	switchTo() {
	    this.destroy();
		this.game.globalState.location.destroy();
		console.log(this.game.globalState.location)
		console.log(this.location)
		this.game.globalState.location = this.location;
		this.game.globalState.location.load(this.game.globalState.Phaser);
		//mountainsLocation.destroy();
		//forestLocation.destroy();
		//createLocation()
		this.game.camera.resetFX()
	
	}
}