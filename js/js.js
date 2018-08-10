window.onload = function(){
	var cnv = document.querySelector('canvas');
	var ctx = cnv.getContext('2d');

	//Instanciando as imagens
	var imgPlayer = new Image();
	imgPlayer.src = "./img/Farisscherwiz.png";
	
	//Instanciando player
	var player = new Player(imgPlayer);

	//Verifica telas
	var checkStage1 = true;

	//Funções
	var CleanScreen = function(){
		ctx.save();
		ctx.fillStyle = "#C0C0C0";
		ctx.fillRect(0, 0, cnv.width, cnv.height);
		ctx.fill();
		ctx.restore();
	}

	var Stage1 = function(){
		CleanScreen();
		player.DrawPlayer();
	}

	Stage1();

	//Eventos
	function moviment(event, boolean){
		window.addEventListener(event, function(e){
			const key = e.keyCode;
			switch(key){
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

	function update(){
		player.Move();
		
		//limite do player
		if(player.posX < 0){
			player.posX = 0;
		}
		if(player.posX + player.width > cnv.width){
			player.posX = cnv.width - player.width;
		}
		if(player.posY < 0){
			player.posY = 0;
		}
		if(player.posY + player.height > cnv.height){
			player.posY = cnv.height - player.height;
		}
	}

	function loop(){
		window.requestAnimationFrame(loop,cnv);
		update();
		if(checkStage1){
			CleanScreen();
			player.DrawPlayer();		
		}
	}

	loop();
}