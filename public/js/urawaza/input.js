UrawazaJS.Input = (function() {
	function Input() {
		var self = this;
		$(window).keydown(function(e) {
			self.addKey(e.keyCode);
		});
		$(window).keyup(function(e) {
			self.removeKey(e.keyCode);
		});
	}

	Input.KEY_UP = 1 << 1;
	Input.KEY_DOWN = 1 << 2;
	Input.KEY_LEFT = 1 << 3;
	Input.KEY_RIGHT = 1 << 4;
	Input.KEY_BUTTON1 = 1 << 5;
	Input.KEY_BUTTON2 = 1 << 6;
	Input.KEY_BUTTON3 = 1 << 7;
	Input.KEY_BUTTON4 = 1 << 8;
	Input.KEY_BUTTON5 = 1 << 9;
	Input.KEY_BUTTON6 = 1 << 10;
	Input.KEY_BUTTON7 = 1 << 11;
	Input.KEY_BUTTON8 = 1 << 12;
	Input.KEY_BUTTON9 = 1 << 13;
	Input.KEY_BUTTON10 = 1 << 14;

	Input.prototype = {
		buffer: null,
		keyboard_buffer: null,
		keyboard_map: {
			37: Input.KEY_LEFT,
			38: Input.KEY_UP,
			39: Input.KEY_RIGHT,
			40: Input.KEY_DOWN,
			68: Input.KEY_BUTTON1,
			88: Input.KEY_BUTTON2,
			83: Input.KEY_BUTTON3,
			65: Input.KEY_BUTTON4
		},

		removeKey: function(code) {
			if (code in this.keyboard_map) {
				this.keyboard_buffer &= (~this.keyboard_map[code]);
			}
		},

		addKey: function(code) {
			if (code in this.keyboard_map) {
				this.keyboard_buffer |= this.keyboard_map[code];
			}
		},

		getKey: function(code) {
			return (this.buffer & code);
		},

		onFrame: function() {
			var buffer = 0;

			if (window.wiiu) {
				if (window.wiiu.gamepad) {
					if (window.wiiu.gamepad.isEnabled) {
						if ((window.wiiu.gamepad.hold & 0x00000800) || (window.wiiu.gamepad.hold & 0x40000000)) {
							buffer = buffer | Input.KEY_LEFT;
						}
						if ((window.wiiu.gamepad.hold & 0x00000400) || (window.wiiu.gamepad.hold & 0x20000000)) {
							buffer = buffer | Input.KEY_RIGHT;
						}

						if ((window.wiiu.gamepad.hold & 0x00000200) || (window.wiiu.gamepad.hold & 0x10000000)) {
							buffer = buffer | Input.KEY_UP;
						}
						if ((window.wiiu.gamepad.hold & 0x00000100) || (window.wiiu.gamepad.hold & 0x08000000)) {
							buffer = buffer | Input.KEY_DOWN;
						}

						if (window.wiiu.gamepad.hold & 0x00008000) {
							buffer = buffer | Input.KEY_BUTTON1;
						}
						if (window.wiiu.gamepad.hold & 0x00004000) {
							buffer = buffer | Input.KEY_BUTTON2;
						}
						if (window.wiiu.gamepad.hold & 0x00002000) {
							buffer = buffer | Input.KEY_BUTTON3;
						}
						if (window.wiiu.gamepad.hold & 0x00001000) {
							buffer = buffer | Input.KEY_BUTTON4;
						}
						if (window.wiiu.gamepad.hold & 0x00000020) {
							buffer = buffer | Input.KEY_BUTTON5;
						}
						if (window.wiiu.gamepad.hold & 0x00000010) {
							buffer = buffer | Input.KEY_BUTTON6;
						}
						if (window.wiiu.gamepad.hold & 0x00000080) {
							buffer = buffer | Input.KEY_BUTTON7;
						}
						if (window.wiiu.gamepad.hold & 0x00000040) {
							buffer = buffer | Input.KEY_BUTTON8;
						}
						if (window.wiiu.gamepad.hold & 0x00000004) {
							buffer = buffer | Input.KEY_BUTTON9;
						}
						if (window.wiiu.gamepad.hold & 0x00000008) {
							buffer = buffer | Input.KEY_BUTTON10;
						}

					}
				}
			}

			buffer |= this.keyboard_buffer;

			this.buffer = buffer;
		}
	};

	return Input;
})();

