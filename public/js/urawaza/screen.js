UrawazaJS.Screen = (function() {
	function Screen() {
		this.stages = [];
	}

	Screen.prototype = {
		fps: 30,
		fps_timeout_sec: 0,
		last_fps: 0,
		canvas: null,
		stage: null,
		stages: null,
		current_stage: 0,
		mainscreen: null,
		device_width: 0,
		device_height: 0,
		main_function: null,

		runLoop: function() {
			var start_time = +new Date();

			this.main_function();

			var end_time = +new Date();

			this.last_fps = Math.floor(1000 / (end_time - start_time) * 100) / 100;
			if (this.last_fps > this.fps) {
				this.last_fps = this.fps;
			}

			var next_stage = 1 - this.current_stage;
			this.mainscreen.appendChild(this.stages[this.current_stage].canvas);
			this.mainscreen.removeChild(this.stages[next_stage].canvas);

			this.current_stage = next_stage;
			this.stage = this.stages[this.current_stage];
			this.stage.clear();

			var self = this;
			setTimeout(function() { self.runLoop(); }, this.fps_timeout_sec);
		},

		start: function(node, width, height, main_function) {
			this.fps_timeout_sec = 1000 / this.fps;

			this.mainscreen = document.getElementById(node);
			this.main_function = main_function;

			this.device_width = this.mainscreen.offsetWidth;
			this.device_height = this.mainscreen.offsetHeight;

			this.stages[0] = new UrawazaJS.Image(width, height);
			this.stages[0].canvas.style.position = 'fixed';
			this.stages[1] = new UrawazaJS.Image(width, height);
			this.stages[1].canvas.style.position = 'fixed';
			this.stage = this.stages[this.current_stage];
			this.mainscreen.appendChild(this.stages[1 - this.current_stage].canvas);

			var self = this;
			setTimeout(function() { self.runLoop(); }, this.fps_timeout_sec);
		}
	};

	return Screen;
})();


