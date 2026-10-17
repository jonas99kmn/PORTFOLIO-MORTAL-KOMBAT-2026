// Seleciona TODOS os emblemas da página
const emblemas = document.querySelectorAll('.brand-emblem-2');

// Configuração da animação
function animarEmblemas() {
    const tempoAtual = Date.now() / 1000; // Tempo em segundos

    emblemas.forEach(emblema => {
        // Pega configurações individuais do elemento
        const velocidade = parseFloat(emblema.dataset.velocidade) || 3;
        const eixo = emblema.dataset.eixo || 'Y';
        const suavidade = 0.5; // 0 = rápido, 1 = suave

        // Cálculo do ângulo (vai de 0° a 360° infinitamente)
        const angulo = (tempoAtual * 360 / velocidade) % 360;
        
        // Efeito de parada suave no meio (igual ao seu @keyframes)
        const fase = Math.sin(tempoAtual * Math.PI / velocidade);
        const deslocamento = fase * 180;

        // Aplica a rotação no eixo escolhido
        if (eixo === 'Y') {
            emblema.style.transform = `rotateY(${deslocamento}deg)`;
        } else if (eixo === 'X') {
            emblema.style.transform = `rotateX(${deslocamento}deg)`;
        } else if (eixo === 'ambos') {
            emblema.style.transform = `rotateX(${deslocamento * 0.5}deg) rotateY(${deslocamento}deg)`;
        }
    });

    // Repete a função a cada quadro da animação
    requestAnimationFrame(animarEmblemas);
}

// Inicia a animação quando a página carregar
window.addEventListener('DOMContentLoaded', animarEmblemas);