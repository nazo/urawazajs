var lwuSprite = function() {
	this.canvas = document.createElement('canvas');
	this.context = this.canvas.getContext('2d');
	this.seed = +new Date();

	if (arguments.length == 1) {
		this.load(arguments[0]);
	} else if (arguments.length == 2) {
		this.create(arguments[0], arguments[1]);
	}
	return this;
};

lwuSprite.prototype = {
	canvas: null,
	context: null,
	width: null,
	height: null,
	seed: null,
	timeout: 4,
	load_start_time: null,

	draw: function(sprite, x, y) {
		var img = sprite.context.getImageData(0, 0, sprite.width, sprite.height);
		this.context.putImageData(img, x, y);
	},

	clear: function() {
		this.context.clearRect(0, 0, this.width, this.height);　
	},

	create: function(w, h) {
		this.canvas.style.width = w + 'px';
		this.canvas.style.height = h + 'px';
		this.canvas.width = w;
		this.canvas.height = h;
		this.width = w;
		this.height = h;
		return this;
	},

	load: function(url) {
		var img = new Image();
		var self = this;
		img.src = url;

		this.imgLoaded = false;
		this.load_start_time = +new Date();

		this.create(1, 1);

		setTimeout(function(){self._onLoadProgress(img);}, 1);

		return true;
	},

	_onLoadProgress: function(img) {
		var self = this;
		if (img.complete) {
			this.imgLoaded = true;
			this._onLoadComplete(img);
		} else {
			var end_time = +new Date();
			if ((end_time - this.load_start_time) / 1000 < this.timeout) {
				setTimeout(function(){self._onLoadProgress(img);}, 1);
			}
		}
	},

	_onLoadComplete: function(img) {
		this.width = img.width;
		this.height = img.height;
		this.create(img.width, img.height);
		this.context.drawImage(img, 0, 0);
		img = null;
	}
};

