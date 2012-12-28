var lwuScene = function() {
};
lwuScene.prototype = {
	spriteManager: null,
	stage: null,

	onFrame: function() {},
	onInit: function() {},
	onDispose: function() {}
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
	spriteManager: null,

	runLoop: function() {
		var start_time = +new Date();

		this.current_scene.onFrame();

		var end_time = +new Date();

		this.last_fps = Math.floor(1000 / (end_time - start_time) * 100) / 100;
		if (this.last_fps > this.fps) {
			this.last_fps = this.fps;
		}

		this.spriteManager.context.putImageData(this.stage.context, 0, 0);

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

		var mainscreen = $('#main-screen');
		this.canvas = document.createElement('canvas');
		$(this.canvas).width(mainscreen.width());
		$(this.canvas).height(mainscreen.height());
		$(this.canvas).css('position', 'fixed');
		mainscreen.append(this.canvas);

		this.spriteManager = new lwuSpriteManager(this.canvas.getContext('2d'));
		this.stage = this.spriteManager.create(mainscreen.width(), mainscreen.height());

		this.current_scene.spriteManager = this.spriteManager;
		this.current_scene.stage = this.stage;
		this.current_scene.onInit();

		var self = this;
		setTimeout(function() { self.runLoop(); }, this.fps_timeout_sec);
	}
};

