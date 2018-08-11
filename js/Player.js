var cnv = document.querySelector('canvas');
var ctx = cnv.getContext('2d');

function Player(img){
	//Atributos ****************
	this.mvLeft = this.mvUp = this.mvRight = this.mvDown = false;
	
	//Origem para captura da imagem a ser exibida
	this.srcX = 0;
	this.srcY = 96;
	//Posição no canvas onde a figura será exibida
	this.posX = cnv.width/2 - 32;
	this.posY = cnv.height/2 - 32;
	this.w = 32;
	this.h = 48;
	this.width = 64;
	this.height = 64;
	this.speed = 3;
	this.img = img;
	this.countAnim = 0;

	//Métodos *****************
	//Desenha o personagem
	this.DrawPlayer = function(){
		ctx.drawImage(	this.img,	//Imagem de origem
						//Captura da imagem
						this.srcX,	//Origem da captura no eixo X
						this.srcY,	//Origem da captura no eixo Y
						this.w,	//Largura da imagem que será capturada
						this.h,//Altura da imagem que será capturada
						//Exibição da imagem
						this.posX,	//Posição no eixo X onde a imagem será exibida 
						this.posY,	//Posição no eixo Y onde a imagem será exibida 
						this.width,	//Largura da imagem a ser exibida 
						this.height	//Altura da imagem a ser exibida 
					);
		this.Anime(); 
	}
	
	//Move o personagem
	this.Move = function(){
		if(this.mvRight && !this.mvLeft){
			this.posX += this.speed;
			this.srcY = this.h * 2;
		}
		if(this.mvLeft && !this.mvRight){
			this.posX -= this.speed;
			this.srcY = this.h * 1; 
		}
		if(this.mvUp && !this.mvDown){
			this.posY -= this.speed;
			this.srcY = this.h * 3; 
		}
		if(this.mvDown && !this.mvUp){
			this.posY += this.speed; 
			this.srcY = this.h * 0;
		}
	}
	
	//Anima o personagem
	this.Anime = function(){
		if(this.mvLeft || this.mvUp || this.mvRight || this.mvDown){
			//Caso qualquer seta seja pressionada, o contador de animação é incrementado
			this.countAnim++;
			if(this.countAnim >= 20){
				this.countAnim = 0;
			}
			this.srcX = Math.floor(this.countAnim / 5) * this.w;
		} else {
			//Caso nenhuma tecla seja pressionada, o contador de animação é zerado e a imagem do personagem parado é exibida
			this.srcX = 0;
			this.countAnim = 0;
		}
	}
}
