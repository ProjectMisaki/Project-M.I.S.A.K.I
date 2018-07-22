export default class WolfAnimations {
	constructor(coord) {
		this.model = document.getElementById("wolf");
		this.model.style.top = '400px';
		this.model.style.left = '-1000px';
		this.isDefited = false;
	}

	defited() {
		if (!this.isDefited) {
			this.isDefited = true;
			self = this;
			this.model.style.opacity = 0;
			setTimeout(function(){
				self.model.remove();
				alert('Квест "Найди и убей волка" завершен.')
			}, 1000)
		}
	}

	stop() {
		this.model.style.left = getComputedStyle(this.model).left;
	}

	moveRight() {
		this.model.style.left = +getComputedStyle(this.model).left.replace('px', '') - 100 + 'px'; 
	}

	moveLeft() {
		this.model.style.left = +getComputedStyle(this.model).left.replace('px', '') + 100 + 'px'; 
	}

	jump() {
	}

	attack(target) {
		console.log(target)
	}

}
