// The spaghetti code masterpiece
var game = {
	canvas: document.getElementById('canvas'),
	context: this.canvas.getContext('2d', {alpha: false}),
	counter: document.getElementById('counter'),
	textures: {
		player: new Image(),
		map: new Image(),
	},
	drawPending: false,
	backgrounds: {
			'sky': {
				image: new Image(),
				loaded: false
			},
			'trees': {
				image: new Image(),
				loaded: false
			}
	},
	sounds: {
		jump: new Audio('sounds/jump.wav')
	},
	options: {
		texturesPath: "textures.png",
		playerPath: "player.png",
		tileWidth: 24,
		tileHeight: 24,
		playerWidth:64,
		playerHeight:64,
		canvasWidth: window.innerWidth / 3,
		canvasHeight: window.innerHeight / 3
	},
	pressedKeys: {},
	init: function (onInit) {
		this.canvas.width = this.options.canvasWidth
		this.canvas.height = this.options.canvasHeight
		this.context.imageSmoothingEnabled = false

    this.backgrounds['sky'].image.src = "background.png"
		this.backgrounds['trees'].image.src = "trees.png"

		for (var key in this.backgrounds) {
			this.backgrounds[key].image.onload = function (currentKey) {
				this.backgrounds[currentKey].loaded = true
			}.bind(this, key)
		}

		this.textures.map.src = this.options.texturesPath
		this.textures.map.onload = onInit
		this.textures.player.src = this.options.playerPath
		this.textures.player.onload = onInit
	},
	map: {
		structures: []
	},
	isOver: false
}
