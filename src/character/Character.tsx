const sprite =  require('./sprite.png');
const walkSound =  require('./walk.wav');
const punchSound =  require('./sword.wav');
const missSound =  require('./steelsword.wav');

export default class Character {
	public player: any;
	private game: any;
	private music: any;
	private punchSound: any;
	private walking: boolean = false;
	private attackDown: boolean = true;
	private orientation: string = 'right';
	private missSound: any;

	public speed: number = 250;
	public weight: number = 80;

	constructor(game: any) {
		this.game = game;
    	this.game.load.audio('character.walk', walkSound);
    	this.game.load.audio('character.punch', punchSound);
    	this.game.load.audio('character.miss', missSound);
		game.load.spritesheet('player', sprite, 104, 151, 14);
	}
	create() {	
   		this.music = this.game.add.audio('character.walk');
   		this.punchSound = this.game.add.audio('character.punch');
   		this.missSound = this.game.add.audio('character.miss');
    	this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'player');
    	this._configPhysics();
    	this._configAnimation();
		this.game.camera.follow(
			this.game.globalState.character.player,
			this.game.globalState.Phaser.Camera.FOLLOW_LOCKON,
			0.1, 0.1
		);

//		this.player.tint = 0x333333;

	
	}
	destroy() {
		this.player.destroy()
	}
	update(hitPlatform: any) {
	    this.player.body.velocity.x = 0;
	    this._configKeys(hitPlatform);
	}
	private _configPhysics() {
		this.game.physics.arcade.enable(this.player);
		this.player.body.bounce.y = 0;
		this.player.body.gravity.y = this.weight * 15;    	
		this.player.body.collideWorldBounds = true;
		this.player.body.fixedRotation = true;
	}
	private _configAnimation() {
    	this.player.animations.add('attackRight', [0, 3, 4, 3], 10, true);
    	this.player.animations.add('attackLeft', [6, 9, 10, 9], 10, true);
    	this.player.animations.add('right', [0, 1, 2, 3, 4, 5], 6, true);
    	this.player.animations.add('left', [6, 7, 8, 9, 10, 11], 6, true);
    	this.player.animations.add('stayRight', [12], 1, true);
    	this.player.animations.add('stayLeft', [13], 1, true);
	}
	public moveLeft() {
	    if(!this.walking) {
    		this.music.loopFull(0.1);
	    	this.walking = true;	
    	}
	    this.player.body.velocity.x = - this.speed;	
	    this.player.animations.play('left');
	    this.orientation = 'left'
	}
	public moveRight() {
	    if(!this.walking) {
    		this.music.loopFull(0.1);
	    	this.walking = true;
    	}	
	    this.player.body.velocity.x = this.speed;	
	    this.player.animations.play('right');
	    this.orientation = 'right'
	}
	public attack() {
	    if(this.orientation === 'left') {
	    	this.player.animations.play('attackLeft');
	    	if (this.game.globalState.interactiveItem) {
	    		this.game.globalState.interactiveItem.damage()
	    		if (!this.punchSound.isPlaying) {
    				this.punchSound.play(null, 0.1);
	    		}
	    	} else if (!this.missSound.isPlaying) {
    			this.missSound.play(null, 0.1);
			}
	    } else {
	    	this.player.animations.play('attackRight');
	    	if (this.game.globalState.interactiveItem) {
	    		this.game.globalState.interactiveItem.damage()
	    		if (!this.punchSound.isPlaying) {
    				this.punchSound.play(null, 0.1);
	    		}
	    	} else if (!this.missSound.isPlaying) {
    			this.missSound.play(null, 0.1);
			}
	    }
	}
	public stay() {
	    this.walking = false;
    	this.music.stop();	
	    if(this.orientation === 'left') {
	    	this.player.animations.play('stayLeft');
	    } else {
	    	this.player.animations.play('stayRight');
	    }
	}
	private _configKeys(hitPlatform: any) {
	    //jump
	    if (this.game.globalState.keys.jump.isDown && this.player.body.touching.down && hitPlatform){
	        this.player.body.velocity.y = - this.weight * 6;
	    }
	}
}

//module.exports = Character;