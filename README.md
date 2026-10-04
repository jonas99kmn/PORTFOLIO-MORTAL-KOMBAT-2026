# ⚡ LANDING PAGE // MORTAL KOMBAT 2026 EDITION

Landing page e portfólio de alta fidelidade visual inspirado no modelo [PORTFOLIO-MTK-2026](https://github.com/jonas99kmn/PORTFOLIO-MTK-2026), desenvolvido com foco em desenvolvimento Web Front-End moderno, performance, design temático e rica interatividade.

---

## 🎮 Destaques e Funcionalidades

1. **Borda Elétrica com Procedural Noise 2D (HTML5 Canvas)**
   - Algoritmo matemático de ruído 2D octavado que desenha em tempo real raios elétricos dinâmicos ao redor do card principal.
   - Suporte a telas de alta densidade (Retina/DPR) e atualização suave via `requestAnimationFrame`.

2. **Card 3D Interativo (Flip Effect)**
   - Efeito 3D com rotação de 180° no eixo Y ao passar o mouse ou tocar na tela (otimizado para dispositivos móveis).
   - Frente com a foto do desenvolvedor e efeito de máquina de escrever com multi-frases e cursor pulsante.
   - Verso temático com Scorpion ("GET OVER HERE! // Flawless Execution").

3. **Ambiente Cósmico & Luzes Neon**
   - Fundo com 3 camadas de estrelas em movimento vertical contínuo (`animStar`).
   - Luzes de neblina e esferas de brilho neon animadas com transições orgânicas.

4. **Sistema de Som Interativo (Web Audio & SFX)**
   - Botão no cabeçalho para ativar/desativar efeitos sonoros (`⚡ SFX ON/OFF`).
   - Falas icônicas do Shao Kahn e Scorpion ao interagir com o card, os lutadores e o formulário.
   - Equalizador de ondas sonoras animado no reprodutor da seção *Sobre Mim*.

5. **Seções da Landing Page Completa**:
   - **Hero / Apresentação**: Título impactante com destaque neon, botões de ação e links sociais rápidos.
   - **Kombat Stats**: Indicadores de vitórias, dedicação e tecnologias.
   - **História do Guerreiro (Sobre Mim)**: Trajetória, localização (Senhor do Bonfim, BA) e influência gamer na criação de interfaces.
   - **Arsenal Técnico (Skills)**: Barras de poder e especialidades (HTML5, CSS3, JS ES6+, Canvas 2D, React, UI/UX, Git, Performance).
   - **Escolha seu Kombatente (Roster)**: Cards com os GIFs originais do Scorpion, Sub-Zero e Kung Lao com áudio e shimmer hover.
   - **Arenas de Projetos**: Vitrine de projetos com tags de tecnologias, descrições e botões de demonstração e código.
   - **Desafie para um Kombat (Contato)**: Formulário com validação e feedback com estilo arcade.
   - **Rodapé Temático**: Símbolo do Dragão com brilho pulsante e botão de retorno suave ao topo.

---

## 📁 Estrutura de Arquivos

```text
├── index.html              # Landing Page principal unificada
├── about.html              # Página dedicada 'Sobre Mim'
├── styles/
│   └── styles.css          # Estilos completos, variáveis, efeitos e responsividade
├── scripts/
│   └── main.js             # Lógica do Canvas 2D, máquina de escrever, áudio e navegação
├── assets/                 # Ícones de redes sociais e imagens do card 3D
├── audio/                  # Efeitos sonoros originais (Shao Kahn, Scorpion Wins)
└── mortalk/                # Imagens e GIFs dos cenários e guerreiros de Mortal Kombat
```

---

## 🚀 Como Executar

Por ser um projeto web puramente estático em HTML5, CSS3 e JavaScript Vanilla, não necessita de nenhuma instalação prévia ou dependência de build:

1. Dê um duplo-clique no arquivo `index.html` para abrir diretamente no seu navegador preferido (Chrome, Edge, Firefox, Safari, etc.).
2. Ou utilize extensões como o **Live Server** no VS Code para desenvolvimento com recarregamento automático.
