var lwuScene = function() {
};
lwuScene.prototype = {
	stage: null,
	input: null,

	onFrame: function() {},
	onInit: function() {},
	onDestroy: function() {}
};

var lwuSceneManager = function(scene) {
	this.current_scene = scene;
};
lwuSceneManager.prototype = {
	fps: 30,
	fps_timeout_sec: 0,
	last_fps: 0,
	current_scene: null,
	canvas: null,
	stage: null,
	stages: [],
	current_stage: 0,
	mainscreen: null,
	input: null,

	runLoop: function() {
		var start_time = +new Date();

		this.input.onFrame();

		this.current_scene.onFrame();

		var end_time = +new Date();

		this.last_fps = Math.floor(1000 / (end_time - start_time) * 100) / 100;
		if (this.last_fps > this.fps) {
			this.last_fps = this.fps;
		}

		var next_stage = 1 - this.current_stage;
		this.mainscreen.appendChild(this.stages[this.current_stage].canvas);
		this.mainscreen.removeChild(this.stages[next_stage].canvas);

		this.stage = this.stages[next_stage];
		this.stage.clear();

		this.current_stage = next_stage;
		this.current_scene.stage = this.stage;

		$('#fps').text(this.last_fps + 'FPS');

		var self = this;
		setTimeout(function() { self.runLoop(); }, this.fps_timeout_sec);
	},

	start: function() {
		this.fps_timeout_sec = 1000 / this.fps;
		if (!this.current_scene) {
			alert('no scene found!!');
			return;
		}

		this.mainscreen = document.getElementById('main-screen');
		var width = this.mainscreen.offsetWidth;
		var height = this.mainscreen.offsetHeight;

		this.stages[0] = new lwuImage(width, height);
		this.stages[0].canvas.style.position = 'fixed';
		this.stages[1] = new lwuImage(width, height);
		this.stages[1].canvas.style.position = 'fixed';
		this.stage = this.stages[this.current_stage];
		this.mainscreen.appendChild(this.stages[1 - this.current_stage].canvas);

		this.current_scene.stage = this.stage;
		this.current_scene.onInit();

		this.input = new lwuInput();
		this.current_scene.input = this.input;

		var self = this;
		setTimeout(function() { self.runLoop(); }, this.fps_timeout_sec);
	}
};

