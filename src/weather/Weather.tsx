const snowSprite = require('./snow.png');
const rainSprite = require('./rain.png');
const rainSound = require('./rain.wav');

class Weather {

	emitter: any;
	game: any;
	music: any;

	constructor(game: any) {
		this.game = game;
    	this.game.load.audio('weather.rainSound', rainSound);
    	this.game.load.image('weather.snow', snowSprite);
    	this.game.load.spritesheet('weather.rain', rainSprite, 17, 17);
	}

	destroy() {
		if (this.emitter) {
			this.emitter.destroy();
			this.emitter = false;
		}
		if(this.music){
    		this.music.destroy();
    	}
	}

	_configBasicEmitter(sprite: any) {
		if (!this.emitter)	{
    		this.emitter = this.game.add.emitter(this.game.world.width, 0, 10000);
    		this.emitter.width = this.game.width * 2;
    		//console.log(this.game.width)
    	}
    	this.emitter.fixedToCamera = true;
    	this.emitter.makeParticles(sprite);
	}

	snow() {
		this._configBasicEmitter('weather.snow')
    	this.emitter.minParticleSpeed.setTo(-300, 30);
    	this.emitter.maxParticleSpeed.setTo(300, 100);
    	this.emitter.minParticleScale = 0.03;
    	this.emitter.maxParticleScale = 0.05;
    	this.emitter.gravity = 50;
    	this.emitter.flow(4000, 1000, 20, -1);
	}

	rain() {
   		this.music = this.game.add.audio('weather.rainSound');
    	this.music.loopFull(0.1);
		this._configBasicEmitter('weather.rain')
		this.emitter.minParticleScale = 0.3;
		this.emitter.maxParticleScale = 0.4;
		this.emitter.setYSpeed(800, 1000);
		//this.emitter.angle = 30;
		this.emitter.setXSpeed(-5, 5);
		this.emitter.minRotation = 0;
		this.emitter.maxRotation = 0;
		this.emitter.start(false, 1000, 1);
	}
}
module.exports = Weather;
