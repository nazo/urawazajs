UrawazaJS.Sprite = (function() {
	function Sprite() {
		this._frames = [];

		return this;
	}

	Sprite.prototype = {
		image: null,
		image_x: 0,
		image_y: 0,
		image_w: 0,
		image_h: 0,
		x: 0,
		y: 0,
		hide: false,
		_frames: null,
		_animation_frame: 0,
		_animation_count: 0,

		hitRect: function(target) {
			if ((target.x <= (this.x + this.image_w)) && (this.x <= (target.x + target.image_w))) {
				if ((target.y <= (this.y + this.image_h)) && (this.y <= (target.y + target.image_h))) {
					return true;
				}
			}
			return false;
		},

		drawTo: function(dst) {
			if (!this.hide) {
				if (this._frames.length > 0) {
					var anim = this._frames[this._animation_count];
					var sx = anim.x;
					var sy = anim.y;
					var sw = anim.w;
					var sh = anim.h;
					var frame = anim.frame;
					dst.draw(this.image, this.x, this.y, sx, sy, sw, sh);
					this._animation_frame ++;
					if (this._animation_frame >= frame) {
						this._animation_count ++;
						this._animation_frame = 0;
						if (this._animation_count >= this._frames.length) {
							this._animation_count = 0;
						}
					}
				} else {
					dst.draw(this.image, this.x, this.y);
				}
			}
		},

		addAnimation: function(x, y, w, h, frame) {
			this._frames.push({'x': x, 'y': y, 'w': w, 'h': h, 'frame': frame});
		},

		register: function(image, x, y, w, h) {
			this.image = image;
			this.image_x = x;
			this.image_y = y;
			this.image_w = w;
			this.image_h = h;
		},

		square: function(size) {
			this.image = new UrawazaJS.Image(size, size);
			this.image_x = 0;
			this.image_y = 0;
			this.image_w = size;
			this.image_h = size;
		},

		circle: function(size) {
			this.image = new UrawazaJS.Image(size, size);
			this.image_x = 0;
			this.image_y = 0;
			this.image_w = size;
			this.image_h = size;
		}

	};

	return Sprite;
})();

