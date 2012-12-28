var lwuSprite = function(context) {
	this.context = context;
};

lwuSprite.prototype = {
	context: null,

	draw: function(sprite, x, y) {
		this.context.putImageData(sprite.context, x, y);
	}
};

var lwuSpriteManager = function(canvas) {
	this.context = canvas;
	this.seed = +new Date();
};

lwuSpriteManager.prototype = {
	context: null,
	seed: null,
	timeout: 4,

	create: function(w, h) {
		var s = new lwuSprite(this.context.createImageData(w, h));
		return s;
	},

	load: function(url) {
		var img = new Image();
		img.src = url;
		var self = this;

		self.imgLoaded = false;
		var start_time = +new Date();
		while(!self.imgLoaded) {
			var end_time = +new Date();
			if ((end_time - start_time) / 1000 > self.timeout) {
				break;
			}
			if (img.complete) {
				self.imgLoaded = true;
				break;
			}
		}

		if (!self.imgLoaded) {
			return this.create(1, 1);
		}

		var s = this.create(img.width, img.height);
		s.context.drawImage(img, 0, 0);

		return s;
	}
};

