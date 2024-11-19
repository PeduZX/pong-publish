// Elementos do HTML
const raquete1 = document.getElementById('raquete1');
const raquete2 = document.getElementById('raquete2');
const bola = document.getElementById('bola');
const pauseButton = document.getElementById('pause');
const playButton = document.getElementById('play');
const placar = document.getElementById('placar');
const fase = document.getElementById('FaseAtual');

// Variáveis para o movimento da bola
let posicaoBolaX = 500; // Posição inicial X da bola
let posicaoBolaY = 200; // Posição inicial Y da bola
let velocidadeBolaX = 5; // Velocidade horizontal da bola
let velocidadeBolaY = 5; // Velocidade vertical da bola
const larguraAreaBola = 1100; // Largura da área de movimento
const alturaAreaBola = 520; // Altura da área de movimento
let posicaoRaquete1X = 0;
let posicaoRaquete1Y = 0;
let posicaoRaquete2X = 950;
let posicaoRaquete2Y = 0;
let pontosJogador1 = 0;
let pontosJogador2 = 0;
const movimentoRaquete = 10;

// Variável para controlar a fase
let faseAtual = 1;

playButton.addEventListener('click', function () {
    velocidadeBolaX = 5;
    velocidadeBolaY = 5;
});

pauseButton.addEventListener('click', function () {
    velocidadeBolaX = 0;
    velocidadeBolaY = 0;
});

// Função para verificar e trocar de fase
function verificarFase() {
    if (faseAtual === 1 && (pontosJogador1 >= 5 || pontosJogador2 >= 5)) {
        alert("Fase 2! Agora a bola está mais rápida!");
        alert("Boa sorte!");
        fase.innerText = "Fase Atual: 2";
        faseAtual = 2;
        velocidadeBolaX = 8;
        velocidadeBolaY = 8;
    } else if (faseAtual === 2 && (pontosJogador1 >= 10 || pontosJogador2 >= 10)) {
        alert("Fase 3! Agora a bola está mais rápida!");
        alert("Boa sorte!");
        fase.innerText = "Fase Atual: 3";
        faseAtual = 3;
        velocidadeBolaX = 10;
        velocidadeBolaY = 10;
    } else if (faseAtual === 3 && (pontosJogador1 >= 15 || pontosJogador2 >= 15)) {
        alert("Fase 4! Agora a bola está mais rápida e menor!");
        alert("Boa sorte!");
        fase.innerText = "Fase Atual: 4";
        faseAtual = 4;
        velocidadeBolaX = 10;
        velocidadeBolaY = 10;
        bola.style.width = "35px";
        bola.style.height = "35px";
    } else if (faseAtual === 4 && (pontosJogador1 >= 20 || pontosJogador2 >= 20)) {
        alert("Fase 5! Agora a bola está muito mais rápida e menor ainda!");
        alert("Essa é a ultima fase ou seja o ultimo nivel de dificuldade!");
        alert("Boa sorte!");
        fase.innerText = "Fase Atual: 5";
        faseAtual = 5;
        velocidadeBolaX = 12;
        velocidadeBolaY = 12;
        bola.style.width = "30px";
        bola.style.height = "30px";
    } else if (faseAtual === 5 && (pontosJogador1 >= 40 || pontosJogador2 >= 40)) {
        alert("Acabou as Fases voce zerou o jogo , Parabéns!");
        fase.innerText =`Acabou ! o jogador 1: ${pontosJogador1} e o jogador 2: ${pontosJogador2}`;
        faseAtual = 6;
       reiniciarBola();
       pontosJogador1 = 0; 
       pontosJogador2 = 0;
    }
}


function moverBola() {
    // Atualiza a posição da bola
    posicaoBolaX += velocidadeBolaX;
    posicaoBolaY += velocidadeBolaY;

    // Verifica e atualiza a fase
    verificarFase();

    // Verifica se a bola bateu nas bordas horizontais (esquerda e direita)
    if (posicaoBolaX <= 0) {
        pontosJogador2 += 1; // Pontuação para o jogador 2
        placar.innerText = `${pontosJogador1} x ${pontosJogador2}`;
        reiniciarBola(); // Reinicia a bola no centro
    } else if (posicaoBolaX >= larguraAreaBola - bola.offsetWidth) {
        pontosJogador1 += 1; // Pontuação para o jogador 1
        placar.innerText = `${pontosJogador1} x ${pontosJogador2}`;
        reiniciarBola(); // Reinicia a bola no centro
    }

    // Verifica se a bola bateu nas bordas verticais
    if (posicaoBolaY <= 0 || posicaoBolaY >= alturaAreaBola - bola.offsetHeight) {
        velocidadeBolaY *= -1; // Inverte a direção vertical
    }

    //Define a unidade de medida    
    bola.style.left = posicaoBolaX + 'px';
    bola.style.top = posicaoBolaY + 'px';
}

// Configura um intervalo para mover a bola
setInterval(moverBola, 45);

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        posicaoRaquete2Y -= movimentoRaquete;
        if (posicaoRaquete2Y < 0) {
            posicaoRaquete2Y = 0;
        }
    } else if (event.key === 'ArrowDown') {
        posicaoRaquete2Y += movimentoRaquete;
        if (posicaoRaquete2Y > alturaAreaBola - raquete2.offsetHeight) {
            posicaoRaquete2Y = alturaAreaBola - raquete2.offsetHeight;
        }
    } else if (event.key === 'w') {
        posicaoRaquete1Y -= movimentoRaquete;
        if (posicaoRaquete1Y < 0) {
            posicaoRaquete1Y = 0;
        }
    } else if (event.key === 's') {
        posicaoRaquete1Y += movimentoRaquete;
        if (posicaoRaquete1Y > alturaAreaBola - raquete1.offsetHeight) {
            posicaoRaquete1Y = alturaAreaBola - raquete1.offsetHeight;
        }
    }

    //Define a unidade de medida   
    raquete2.style.top = posicaoRaquete2Y + 'px';
    raquete2.style.left = posicaoRaquete2X + 'px';
    raquete1.style.top = posicaoRaquete1Y + 'px';
    raquete1.style.left = posicaoRaquete1X + 'px';

    testarColisao();
});

function testarColisao() {
    const retanguloRaquete2 = raquete2.getBoundingClientRect();
    const retanguloRaquete1 = raquete1.getBoundingClientRect();
    const retanguloBola = bola.getBoundingClientRect();

    if (
        retanguloBola.left < retanguloRaquete2.right &&
        retanguloBola.right > retanguloRaquete2.left &&
        retanguloBola.top < retanguloRaquete2.bottom &&
        retanguloBola.bottom > retanguloRaquete2.top
    ) {
        velocidadeBolaX *= -1; // Inverte a direção da bola ao colidir com a raquete2
    }

    if (
        retanguloBola.left < retanguloRaquete1.right &&
        retanguloBola.right > retanguloRaquete1.left &&
        retanguloBola.top < retanguloRaquete1.bottom &&
        retanguloBola.bottom > retanguloRaquete1.top
    ) {
        velocidadeBolaX *= -1; // Inverte a direção da bola ao colidir com a raquete1
    }
}

function reiniciarBola() {
    //Gera uma posição aleatoria de reninicio
    posicaoBolaX = Math.random() * (larguraAreaBola - bola.offsetWidth);
    posicaoBolaY = alturaAreaBola / 2;

    //Define a unidade de medida   
    bola.style.left = posicaoBolaX + 'px';
    bola.style.top = posicaoBolaY + 'px';
}
