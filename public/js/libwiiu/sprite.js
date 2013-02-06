var lwuSprite = function() {
	return this;
};

lwuSprite.prototype = {
	image: null,
	image_x: 0,
	image_y: 0,
	image_w: 0,
	image_h: 0,
	x: 0,
	y: 0,

	hitRect: function(target) {
		if ((target.x <= (this.x + this.image_w)) && (this.x <= (target.x + target.image_w))) {
			if ((target.y <= (this.y + this.image_h)) && (this.y <= (target.y + target.image_h))) {
				return true;
			}
		}
		return false;
	},

	drawTo: function(dst) {
		dst.draw(this.image, this.x, this.y);
	},

	register: function(image, x, y, w, h) {
		this.image = image;
		this.image_x = x;
		this.image_y = y;
		this.image_w = w;
		this.image_h = h;
	},

	square: function(size) {
		this.image = new lwuImage(size, size);
	},

	circle: function(size) {
		this.image = new lwuImage(size, size);
	}

};

