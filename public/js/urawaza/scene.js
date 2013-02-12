UrawazaJS.Scene = (function() {
	function Scene() {
	}

	Scene.prototype = {
		stage: null,
		input: null,

		onFrame: function() {},
		onInit: function() {},
		onDestroy: function() {}
	};

	return Scene;
})();

UrawazaJS.SceneManager = (function() {
	function SceneManager() {
		this.scenes = {};
	}

	SceneManager.prototype = {
		current_scene: null,
		scenes: null,

		onFrame: function() {
			this.current_scene.onFrame();
		},

		create: function(name, proto) {
			if (this.scenes === null) {
				this.scenes = {};
			}
			this.scenes[name] = proto;
		},

		changeScene: function(scene) {
			if (this.current_scene) {
				this.current_scene.onDestroy();
				this.current_scene = null;
			}

			if (!(scene in this.scenes)) {
				alert('Invalid scene define!!');
				return;
			}

			var proto = this.scenes[scene];

			this.current_scene = new UrawazaJS.Scene();
			for(key in proto) {
				this.current_scene[key] = proto[key];
			}

			this.current_scene.onInit();
		},

		start: function(scene) {
			this.changeScene(scene);
		}
	};

	return SceneManager;
})();

