var UrawazaJS = {
	_sceneManager: null,
	_input: null,
	_screen:null
};

UrawazaJS.press = function() {
	if (arguments.length == 1) {
		var f = arguments[0];
		window[f] = UrawazaJS;
	} else {
		window.U = UrawazaJS;
	}

	UrawazaJS._sceneManager = new UrawazaJS.SceneManager();
	UrawazaJS._input = new UrawazaJS.Input();
};

UrawazaJS.run = function(node, width, height, firstScene) {
	UrawazaJS._screen = new UrawazaJS.Screen();
	setTimeout(function() {
		UrawazaJS._sceneManager.start(firstScene);
		UrawazaJS._screen.start(node, width, height, UrawazaJS.main);
	}, 1);
};

UrawazaJS.main = function() {
	var current_scene = UrawazaJS._sceneManager.current_scene;
	current_scene.stage = UrawazaJS._screen.stage;
	current_scene.input = UrawazaJS._input;

	UrawazaJS._input.onFrame();

	UrawazaJS._sceneManager.onFrame();
};

UrawazaJS.scene = function() {
	if (arguments.length == 2) {
		UrawazaJS._sceneManager.create(arguments[0], arguments[1]);
	}
};

UrawazaJS.merge = function(dst, src) {
	for(key in src) {
		if (!(key in dst)) {
			dst[key] = src[key];
		}
	}
};

