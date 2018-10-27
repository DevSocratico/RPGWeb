window.onload = function() {
	var cnv = document.querySelector('canvas');
	var ctx = cnv.getContext('2d');

	//Instanciando as imagens
	var imgPlayer = new Image();
	imgPlayer.src = './img/Farisscherwiz.png';

	//Instanciando player
	var player = new Player(imgPlayer);

	//Verifica telas
	var checkStage1 = true;

	//Funções
	var CleanScreen = function() {
		ctx.save();
		ctx.fillStyle = '#873c00';
		ctx.fillRect(0, 0, cnv.width, cnv.height);
		ctx.fill();
		ctx.restore();
	};

	var Stage1 = function() {
		CleanScreen();
		player.DrawPlayer();
	};

	Stage1();

	//Eventos
	function moviment(event, boolean) {
		window.addEventListener(event, function(e) {
			const key = e.keyCode;
			switch (key) {
				case 37:
					player.mvLeft = boolean;
					break;
				case 39:
					player.mvRight = boolean;
					break;
				case 38:
					player.mvUp = boolean;
					break;
				case 40:
					player.mvDown = boolean;
					break;
			}
		});
	}

	moviment('keydown', true);
	moviment('keyup', false);

	function update() {
		player.Move();

		//limite do player
		setPlayerLimitToZero('posX');
		setPlayerLimitInScreen('posX', 'width');
		setPlayerLimitToZero('posY');
		setPlayerLimitInScreen('posY', 'height');
	}

	function setPlayerLimitToZero(position) {
		if (player[position] < 0) {
			player[position] = 0;
		}
	}

	function setPlayerLimitInScreen(position, dimension) {
		if (player[position] + player[dimension] > cnv[dimension]) {
			player[position] = cnv[dimension] - player[dimension];
		}
	}

	function loop() {
		window.requestAnimationFrame(loop, cnv);
		update();
		if (checkStage1) {
			CleanScreen();
			player.DrawPlayer();
		}
	}

	loop();
};
