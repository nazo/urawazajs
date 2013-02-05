var lwuInput = function() {
	var self = this;
	$(window).keydown(function(e) {
		self.addKey(e.keyCode);
	});
};

lwuInput.KEY_UP = 1 << 1;
lwuInput.KEY_DOWN = 1 << 2;
lwuInput.KEY_LEFT = 1 << 3;
lwuInput.KEY_RIGHT = 1 << 4;
lwuInput.KEY_BUTTON1 = 1 << 5;
lwuInput.KEY_BUTTON2 = 1 << 6;
lwuInput.KEY_BUTTON3 = 1 << 7;
lwuInput.KEY_BUTTON4 = 1 << 8;
lwuInput.KEY_BUTTON5 = 1 << 9;
lwuInput.KEY_BUTTON6 = 1 << 10;
lwuInput.KEY_BUTTON7 = 1 << 11;
lwuInput.KEY_BUTTON8 = 1 << 12;
lwuInput.KEY_BUTTON9 = 1 << 13;
lwuInput.KEY_BUTTON10 = 1 << 14;

lwuInput.prototype = {
	buffer: null,
	keyboard_buffer: null,

	addKey: function(code) {
		if (code == 37) {
			this.keyboard_buffer |= lwuInput.KEY_LEFT;
		}
		if (code == 38) {
			this.keyboard_buffer |= lwuInput.KEY_UP;
		}
		if (code == 39) {
			this.keyboard_buffer |= lwuInput.KEY_RIGHT;
		}
		if (code == 40) {
			this.keyboard_buffer |= lwuInput.KEY_DOWN;
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
						buffer = buffer | lwuInput.KEY_LEFT;
					} else if ((window.wiiu.gamepad.hold & 0x00000400) || (window.wiiu.gamepad.hold & 0x20000000)) {
						buffer = buffer | lwuInput.KEY_RIGHT;
					}

					if ((window.wiiu.gamepad.hold & 0x00000200) || (window.wiiu.gamepad.hold & 0x10000000)) {
						buffer = buffer | lwuInput.KEY_UP;
					} else if ((window.wiiu.gamepad.hold & 0x00000100) || (window.wiiu.gamepad.hold & 0x08000000)) {
						buffer = buffer | lwuInput.KEY_DOWN;
					}

					if (window.wiiu.gamepad.hold & 0x00008000) {
						buffer = buffer | lwuInput.KEY_BUTTON1;
					}
					if (window.wiiu.gamepad.hold & 0x00004000) {
						buffer = buffer | lwuInput.KEY_BUTTON2;
					}
					if (window.wiiu.gamepad.hold & 0x00002000) {
						buffer = buffer | lwuInput.KEY_BUTTON3;
					}
					if (window.wiiu.gamepad.hold & 0x00001000) {
						buffer = buffer | lwuInput.KEY_BUTTON4;
					}
					if (window.wiiu.gamepad.hold & 0x00000020) {
						buffer = buffer | lwuInput.KEY_BUTTON5;
					}
					if (window.wiiu.gamepad.hold & 0x00000010) {
						buffer = buffer | lwuInput.KEY_BUTTON6;
					}
					if (window.wiiu.gamepad.hold & 0x00000080) {
						buffer = buffer | lwuInput.KEY_BUTTON7;
					}
					if (window.wiiu.gamepad.hold & 0x00000040) {
						buffer = buffer | lwuInput.KEY_BUTTON8;
					}
					if (window.wiiu.gamepad.hold & 0x00000004) {
						buffer = buffer | lwuInput.KEY_BUTTON9;
					}
					if (window.wiiu.gamepad.hold & 0x00000008) {
						buffer = buffer | lwuInput.KEY_BUTTON10;
					}

				}
			}
		}

		buffer |= this.keyboard_buffer;

		this.buffer = buffer;
		this.keyboard_buffer = 0;
	}
};

