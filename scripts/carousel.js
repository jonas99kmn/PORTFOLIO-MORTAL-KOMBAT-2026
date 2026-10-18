const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.hero-dot');
const btnPrev = document.querySelector('.hero-arrow.prev');
const btnNext = document.querySelector('.hero-arrow.next');
let indiceAtivo = 0;
let tempo;

// Mostra o slide pela posição
function mostrarSlide(indice) {
  // Remove a classe de todos
  slides.forEach(s => s.classList.remove('ativo'));
  dots.forEach(d => d.classList.remove('ativo'));
  
  // Coloca a classe só no escolhido
  slides[indice].classList.add('ativo');
  dots[indice].classList.add('ativo');
  indiceAtivo = indice;
  
  // Reinicia o temporizador
  clearInterval(tempo);
  tempo = setInterval(proximoSlide, 5000); // Troca a cada 5s
}

function proximoSlide() {
  const proximo = (indiceAtivo + 1) % slides.length;
  mostrarSlide(proximo);
}

function slideAnterior() {
  const anterior = (indiceAtivo - 1 + slides.length) % slides.length;
  mostrarSlide(anterior);
}

// Clique nos botões
btnNext.addEventListener('click', proximoSlide);
btnPrev.addEventListener('click', slideAnterior);

// Clique nos pontinhos
dots.forEach((dot, posicao) => {
  dot.addEventListener('click', () => mostrarSlide(posicao));
});

// Inicia o carrossel
tempo = setInterval(proximoSlide, 5000);