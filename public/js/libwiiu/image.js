var lwuImage = function() {
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

lwuImage.prototype = {
	canvas: null,
	context: null,
	width: null,
	height: null,
	seed: null,
	timeout: 4,
	load_start_time: null,

	draw: function(src, x, y) {
		var img = src.context.getImageData(0, 0, src.width, src.height);
		this.context.putImageData(img, x, y);
		return this;
	},

	box: function(x, y, w, h, color) {
		this.context.beginPath();
		this.context.fillStyle = color;
		this.context.fillRect(x, y, w, h);
		return this;
	},

	circle: function(x, y, radius, color) {
		this.context.beginPath();
		this.context.fillStyle = color;
		this.context.arc(x, y, radius, 0, 2 * Math.PI, false);
		this.context.fill();
		return this;
	},

	clear: function() {
		this.context.clearRect(0, 0, this.width, this.height);　
		return this;
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

		if (this.width == null) {
			this.create(1, 1);
		}

		setTimeout(function(){self._onLoadProgress(img);}, 1);

		return this;
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

