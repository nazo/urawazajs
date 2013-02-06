var lwuSprite = function() {
	return this;
};

lwuSprite.prototype = {
	image: null,
	image_x: 0,
	image_y: 0,
	image_w: 0,
	image_h: 0,

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

