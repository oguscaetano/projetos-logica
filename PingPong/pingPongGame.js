//Elementos
let vbtIniciar;
let vbola;
let vcpu;
let vjogador;
let vPainelTxtPontos;

//Controle de animacao
let frames;

//Posicoes
let posBolaX, posBolaY;
let posJogadorX, posJogadorY;
let posCpuX, posCpuY;

//Direcao de acordo com a tecla
let dirJy;

//Direcoes iniciais
let posJogIniY = 180, posJogIniX = 10, posCpuIniY = 180, posCpuIniX = 930, posBolaIniX = 475, posBolaIniY = 240;

//Tamanhos
let campoX = 0, campoY = 0, campoW = 960, campoH = 500;
let barraW = 20, barraH = 140, bolaW = 20, bolaH = 20;

//Direcao
let bolaX, bolaY;
let cpuY = 0;

//Velocidade
let velBola, velCpu, velJogador;

//Controle
let pontos = 0;
let tecla;
jogo = false;

function controlaJog() {
  if (jogo) {
    posJogadorY += velJogador * dirJy;
    if (((posJogadorY + barraH) >= campoH) || ((posJogadorY) <= 0)) {
      posJogadorY += (velJogador * dirJy) * (-1);
    }
    vjogador.style.top = posJogadorY + 'px';
  }
}

function controlaCpu() {
  if (jogo) {
    if ((posBolaX > (campoW / 2)) && (bolaX > 0)) {
      //movimentar cpu
      if (((posBolaY + (bolaH / 2)) > ((posCpuY + (barraH / 2))) + velCpu)) {
        //mover para baixo
        if ((posCpuY + barraH) <= campoH) {
          posCpuY += velCpu;
        }
      } else if ((posBolaY + (bolaH / 2)) < (posCpuY + (barraH / 2)) - velCpu) {
        //mover para cima
        if (posCpuY >= 0) {
          posCpuY -= velCpu;
        }
      }
    } else {
      //posicionar cpu no centro
      if ((posCpuY + (barraH / 2)) < (campoH / 2)) {
        posCpuY += velCpu;
      } else if ((posCpuY + (barraH / 2)) > (campoH / 2)) {
        posCpuY -= velCpu;
      }
    }
    vcpu.style.top = posCpuY + 'px';
  }
}

function controlaBola() {
  //movimentacao da bola
  posBolaX += velBola * bolaX;
  posBolaY += velBola * bolaY;

  //colisao com jogador
  if ((posBolaX <= posJogadorX + barraW) && ((posBolaY + bolaH >= posJogadorY) && (posBolaY <= posJogadorY + barraH))) {
    bolaY = (((posBolaY + (bolaH / 2)) - (posJogadorY + (barraH / 2))) / 64);
    bolaX *= - 1;
  }

  //colisao cpu
  if ((posBolaX >= posCpuX - barraW) && ((posBolaY + bolaH >= posCpuY) && (posBolaY <= posCpuY + barraH))) {
    bolaY = (((posBolaY + (bolaH / 2)) - (posCpuY + (barraH / 2))) / 64);
    bolaX *= - 1;
  }

  //limites superior e inferior
  if ((posBolaY >= 480) || (posBolaY <= 0)) {
    bolaY *= - 1;
  }

  //saiu da tela pela direita e pela esquerda
  if (posBolaX >= (campoW - bolaW)) {
    velBola = 0;
    posBolaX = posBolaIniX;
    posBolaY = posBolaIniY;
    posJogadorY = posJogIniY;
    posCpuY = posCpuIniY;
    pontos += 1;
    vPainelTxtPontos.value = pontos;
    jogo = false;
    vjogador.style.top = posJogadorY + 'px';
    vcpu.style.top = posCpuY + 'px';
  } else if (posBolaX <= 0) {
    velBola = 0;
    posBolaX = posBolaIniX;
    posBolaY = posBolaIniY;
    posJogadorY = posJogIniY;
    posCpuY = posCpuIniY;
    pontos -= 1;
    vPainelTxtPontos.value = pontos;
    jogo = false;
    vjogador.style.top = posJogadorY + 'px';
    vcpu.style.top = posCpuY + 'px';
  }

  vbola.style.top = posBolaY + 'px';
  vbola.style.left = posBolaX + 'px';
}

function teclaDw() {
  tecla = event.keyCode;
  if (tecla === 38) {
    dirJy -= 1;
  } else if (tecla === 40) {
    dirJy += 1;
  }
}

function teclaUp() {
  tecla = event.keyCode;
  if (tecla == 38) {
    dirJy = 0;
  } else if (tecla == 40) {
    dirJy = 0;
  }
}

function game() {
  if (jogo) {
    controlaJog();
    controlaBola();
    controlaCpu();
  }
  frames = requestAnimationFrame(game);
}

function iniciaJogo() {
  if (!jogo) {
    velBola = velCpu = velJogador = 8;
    cancelAnimationFrame(frames);
    jogo = true;
    dirJy = 0;
    bolaY = 0;
    if ((Math.random() * 10) < 5) {
      bolaX = - 1;
    } else {
      bolaX = 1;
    }

    posBolaX = posBolaIniX;
    posBolaY = posBolaIniY;
    posJogadorY = posJogIniY;
    posJogadorX = posJogIniX;
    posCpuX = posCpuIniX;
    posCpuY = posCpuIniY;

    game();
  }
}

function inicializa() {
  // velBola = velCpu = velJogador = 8;
  vbtIniciar = document.getElementById('btIniciar');
  vbtIniciar.addEventListener('click', iniciaJogo);
  vjogador = document.getElementById('dvJogador');
  vcpu = document.getElementById('dvCPU');
  vbola = document.getElementById('dvBola');
  vPainelTxtPontos = document.getElementById('txtPontos');
  document.addEventListener('keydown', teclaDw);
  document.addEventListener('keyup', teclaUp);
}

window.addEventListener('load', inicializa);
