const tela = document.getElementById('teladojogo');
const contexto = tela.getContext('2d');
const telaFimDoJogo = document.getElementById('fimdojogo');
const imagemFimDoJogo = document.getElementById('imagemfimdojogo');

const larguraDaTela = tela.width = window.innerWidth;
const alturaDaTela = tela.height = window.innerHeight;

const tamanhoDaCobra = 20;
let cobra = [];
cobra[0] = {
    x: Math.floor(larguraDaTela / 2 / tamanhoDaCobra) * tamanhoDaCobra,
    y: Math.floor(alturaDaTela / 2 / tamanhoDaCobra) * tamanhoDaCobra
};

let comida = {
    x: Math.floor(Math.random() * (larguraDaTela / tamanhoDaCobra)) * tamanhoDaCobra,
    y: Math.floor(Math.random() * (alturaDaTela / tamanhoDaCobra)) * tamanhoDaCobra
};

let dx = tamanhoDaCobra;
let dy = 0;

function desenharcobra() {
    contexto.fillStyle = 'green';
    contexto.fillRect(cobra[0].x, cobra[0].y, tamanhoDaCobra, tamanhoDaCobra);

    for (let i = 1; i < cobra.length; i++) {
        contexto.fillStyle = 'black';
        contexto.fillRect(cobra[i].x, cobra[i].y, tamanhoDaCobra, tamanhoDaCobra);
    }
}

function desenharcomida() {
    contexto.fillStyle = 'red';
    contexto.fillRect(comida.x, comida.y, tamanhoDaCobra, tamanhoDaCobra);
}

function movercobra() {
    const cabeca = {
        x: cobra[0].x + dx,
        y: cobra[0].y + dy
    };

    cobra.unshift(cabeca);

    if (cabeca.x === comida.x && cabeca.y === comida.y) {
        comida = {
            x: Math.floor(Math.random() * (larguraDaTela / tamanhoDaCobra)) * tamanhoDaCobra,
            y: Math.floor(Math.random() * (alturaDaTela / tamanhoDaCobra)) * tamanhoDaCobra
        };
    } else {
        cobra.pop();
    }
}

function verificarcolisao() {
    if (
        cobra[0].x < 0 || cobra[0].x >= larguraDaTela || 
        cobra[0].y < 0 || cobra[0].y >= alturaDaTela ||
        cobra.slice(1).some(segmento => segmento.x === cobra[0].x && segmento.y === cobra[0].y)
    ) {
        fimdojogo();
    }
}

function fimdojogo() {
    telaFimDoJogo.style.display = 'flex';
}

function loopdojogo() {
    contexto.clearRect(0, 0, larguraDaTela, alturaDaTela);
    desenharcobra();
    desenharcomida();
    movercobra();
    verificarcolisao();
}

document.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp' && dy === 0) {
        movercima();
    } else if (e.key === 'ArrowDown' && dy === 0) {
        moverbaixo();
    } else if (e.key === 'ArrowLeft' && dx === 0) {
        moveresquerda();
    } else if (e.key === 'ArrowRight' && dx === 0) {
        moverdireita();
    }
});

let inicioDoToqueX, inicioDoToqueY;

document.addEventListener('touchstart', e => {
    e.preventDefault();
    inicioDoToqueX = e.touches[0].clientX;
    inicioDoToqueY = e.touches[0].clientY;
});

document.addEventListener('touchmove', e => {
    e.preventDefault(); 
    const fimDoToqueX = e.touches[0].clientX;
    const fimDoToqueY = e.touches[0].clientY;

    const dx = fimDoToqueX - inicioDoToqueX;
    const dy = fimDoToqueY - inicioDoToqueY;

    if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0 && dy === 0) {
            moverdireita();
        } else if (dx < 0 && dy === 0) {
            moveresquerda();
        }
    } else {
        if (dy > 0 && dx === 0) {
            moverbaixo();
        } else if (dy < 0 && dx === 0) {
            movercima();
        }
    }
});

document.addEventListener('touchend', () => {
    inicioDoToqueX = null;
    inicioDoToqueY = null;
});

function movercima() {
    if (dy === 0) {
        dx = 0;
        dy = -tamanhoDaCobra;
    }
}

function moverbaixo() {
    if (dy === 0) {
        dx = 0;
        dy = tamanhoDaCobra;
    }
}

function moveresquerda() {
    if (dx === 0) {
        dx = -tamanhoDaCobra;
        dy = 0;
    }
}

function moverdireita() {
    if (dx === 0) {
        dx = tamanhoDaCobra;
        dy = 0;
    }
}

setInterval(loopdojogo, 100);