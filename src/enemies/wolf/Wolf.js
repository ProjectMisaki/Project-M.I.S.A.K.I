import WolfAnimations from './WolfAnimations';
import './model/model.css';

export default class Wolf {
	constructor() {
		this.animations = new WolfAnimations();
	}

	defited() {
		this.animations.defited();
	}

	stop() {
		this.animations.stop();
	}

	moveRight() {
		this.animations.moveRight();
	}

	moveLeft() {
		this.animations.moveLeft();
	}

	jump() {
		this.animations.jump();
	}

	attack(target) {
		console.log(target)
		alert(target.style.left)
	}
}
