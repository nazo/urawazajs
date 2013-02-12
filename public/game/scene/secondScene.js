sm.create('secondScene', {
	onInit: function() {
		this.chr = new lwuSprite();
		this.chr.register(new lwuImage('curesexy.png'), 0, 0, 64, 64);
		this.enemy = new lwuSprite();
		this.enemy.register(new lwuImage('sprite.png'), 0, 0, 16, 16);
		this.enemy.addAnimation(16*1, 0, 16, 16, 5);
		this.enemy.addAnimation(16*2, 0, 16, 16, 5);
		this.enemy.addAnimation(16*3, 0, 16, 16, 8);
		this.enemy.addAnimation(16*4, 0, 16, 16, 7);
		this.shot = new lwuSprite();
		this.shot.register( (new lwuImage(8,8)).box(0, 0, 8, 8, 'white'), 0, 0, 8, 8);
		this.chr.x = 300;
		this.chr.y = 200;
		this.shot.x = 0;
		this.shot.y = 0;
		this.enemy.x = 700;
		this.enemy.y = 200;
		this.shot_show = false;
		this.enemy_live = true;
	},
	onFrame: function() {
		if (this.input.getKey(lwuInput.KEY_LEFT)) {
			this.chr.x -= 2;
		}
		if (this.input.getKey(lwuInput.KEY_RIGHT)) {
			this.chr.x += 2;
		}
		if (this.input.getKey(lwuInput.KEY_UP)) {
			this.chr.y -= 2;
		}
		if (this.input.getKey(lwuInput.KEY_DOWN)) {
			this.chr.y += 2;
		}
		if (this.input.getKey(lwuInput.KEY_BUTTON1)) {
			if (!this.shot_show) {
				this.shot_show = true;
				this.shot.x = this.chr.x;
				this.shot.y = this.chr.y;
			}
		}

		this.chr.drawTo(this.stage);
		if (this.enemy_live) {
			this.enemy.drawTo(this.stage);
		}
		if (this.shot_show) {
			this.shot.drawTo(this.stage);
			this.shot.x += 16;
			if (this.shot.x > 854) {
				this.shot_show = false;
			}
			if (this.shot.hitRect(this.enemy)) {
				this.enemy_live = false;
			}
		}
	}
});

