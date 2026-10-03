/**
 * ==========================================================================
 * LANDING PAGE // MORTAL KOMBAT 2026 EDITION
 * Scripts principais: Borda Elétrica Canvas, Máquina de Escrever, 
 * Áudio Interativo e Navegação Suave.
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    /* ----------------------------------------------------------------------
       1. BORDA ELÉTRICA COM PROCEDURAL NOISE 2D (CANVAS)
       ---------------------------------------------------------------------- */
    const electricBorder = document.querySelector(".electric-border");
    const canvas = document.querySelector(".eb-canvas");

    if (electricBorder && canvas) {
        const ctx = canvas.getContext("2d");
        const electricColor = "#7df9ff";
        const speed = 1.1;
        const chaos = 0.12;
        const borderRadius = 16;
        const thickness = 2.5;
        const borderOffset = 60;
        const displacement = 55;

        let width = 0;
        let height = 0;
        let time = 0;
        let lastFrameTime = performance.now();

        function random(x) {
            return (Math.sin(x * 12.9898) * 43758.5453) % 1;
        }

        function noise2D(x, y) {
            const i = Math.floor(x);
            const j = Math.floor(y);
            const fx = x - i;
            const fy = y - j;

            const a = random(i + j * 57);
            const b = random(i + 1 + j * 57);
            const c = random(i + (j + 1) * 57);
            const d = random(i + 1 + (j + 1) * 57);

            const ux = fx * fx * (3 - 2 * fx);
            const uy = fy * fy * (3 - 2 * fy);

            return a * (1 - ux) * (1 - uy) + b * ux * (1 - uy) + c * (1 - ux) * uy + d * ux * uy;
        }

        function octavedNoise(x, octaves, lacunarity, gain, amplitude, frequency, currentTime, seed) {
            let result = 0;
            let currentAmplitude = amplitude;
            let currentFrequency = frequency;

            for (let i = 0; i < octaves; i++) {
                result += currentAmplitude * noise2D(
                    currentFrequency * x + seed * 100,
                    currentTime * currentFrequency * 0.3
                );
                currentFrequency *= lacunarity;
                currentAmplitude *= gain;
            }
            return result;
        }

        function getCornerPoint(centerX, centerY, radius, startAngle, arcLength, progress) {
            const angle = startAngle + progress * arcLength;
            return {
                x: centerX + radius * Math.cos(angle),
                y: centerY + radius * Math.sin(angle)
            };
        }

        function getRoundedRectPoint(t, left, top, rectWidth, rectHeight, radius) {
            const straightWidth = rectWidth - 2 * radius;
            const straightHeight = rectHeight - 2 * radius;
            const cornerArc = (Math.PI * radius) / 2;
            const totalPerimeter = 2 * straightWidth + 2 * straightHeight + 4 * cornerArc;
            const distance = t * totalPerimeter;

            let accumulated = 0;

            // Top edge
            if (distance <= accumulated + straightWidth) {
                const progress = (distance - accumulated) / straightWidth;
                return { x: left + radius + progress * straightWidth, y: top };
            }
            accumulated += straightWidth;

            // Top-right corner
            if (distance <= accumulated + cornerArc) {
                const progress = (distance - accumulated) / cornerArc;
                return getCornerPoint(left + rectWidth - radius, top + radius, radius, -Math.PI / 2, Math.PI / 2, progress);
            }
            accumulated += cornerArc;

            // Right edge
            if (distance <= accumulated + straightHeight) {
                const progress = (distance - accumulated) / straightHeight;
                return { x: left + rectWidth, y: top + radius + progress * straightHeight };
            }
            accumulated += straightHeight;

            // Bottom-right corner
            if (distance <= accumulated + cornerArc) {
                const progress = (distance - accumulated) / cornerArc;
                return getCornerPoint(left + rectWidth - radius, top + rectHeight - radius, radius, 0, Math.PI / 2, progress);
            }
            accumulated += cornerArc;

            // Bottom edge
            if (distance <= accumulated + straightWidth) {
                const progress = (distance - accumulated) / straightWidth;
                return { x: left + rectWidth - radius - progress * straightWidth, y: top + rectHeight };
            }
            accumulated += straightWidth;

            // Bottom-left corner
            if (distance <= accumulated + cornerArc) {
                const progress = (distance - accumulated) / cornerArc;
                return getCornerPoint(left + radius, top + rectHeight - radius, radius, Math.PI / 2, Math.PI / 2, progress);
            }
            accumulated += cornerArc;

            // Left edge
            if (distance <= accumulated + straightHeight) {
                const progress = (distance - accumulated) / straightHeight;
                return { x: left, y: top + rectHeight - radius - progress * straightHeight };
            }
            accumulated += straightHeight;

            // Top-left corner
            const progress = (distance - accumulated) / cornerArc;
            return getCornerPoint(left + radius, top + radius, radius, Math.PI, Math.PI / 2, progress);
        }

        function updateCanvasSize() {
            const rect = electricBorder.getBoundingClientRect();
            width = rect.width + borderOffset * 2;
            height = rect.height + borderOffset * 2;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);

            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = width + "px";
            canvas.style.height = height + "px";
        }

        function drawElectricBorder(currentTime) {
            const deltaTime = (currentTime - lastFrameTime) / 1000;
            time += deltaTime * speed;
            lastFrameTime = currentTime;

            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, width, height);

            ctx.strokeStyle = electricColor;
            ctx.lineWidth = thickness;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            const left = borderOffset;
            const top = borderOffset;
            const borderWidth = width - borderOffset * 2;
            const borderHeight = height - borderOffset * 2;
            const maxRadius = Math.min(borderWidth, borderHeight) / 2;
            const radius = Math.min(borderRadius, maxRadius);
            const perimeter = 2 * (borderWidth + borderHeight) + 2 * Math.PI * radius;
            const sampleCount = Math.floor(perimeter / 2);

            ctx.beginPath();
            for (let i = 0; i <= sampleCount; i++) {
                const progress = i / sampleCount;
                const point = getRoundedRectPoint(progress, left, top, borderWidth, borderHeight, radius);

                const xNoise = octavedNoise(progress * 8, 8, 1.6, 0.7, chaos, 10, time, 0);
                const yNoise = octavedNoise(progress * 8, 8, 1.6, 0.7, chaos, 10, time, 1);

                const x = point.x + xNoise * displacement;
                const y = point.y + yNoise * displacement;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.closePath();
            ctx.stroke();

            requestAnimationFrame(drawElectricBorder);
        }

        updateCanvasSize();
        window.addEventListener("resize", updateCanvasSize);

        if (window.ResizeObserver) {
            const resizeObserver = new ResizeObserver(updateCanvasSize);
            resizeObserver.observe(electricBorder);
        }

        requestAnimationFrame(drawElectricBorder);
    }

    /* ----------------------------------------------------------------------
       2. MÁQUINA DE ESCREVER COM MULTI-FRASES
       ---------------------------------------------------------------------- */
    const textoAnimadoEl = document.querySelector(".tex_animação");
    if (textoAnimadoEl) {
        const phrases = [
            "Olá, meu nome é JONAS.",
            "Desenvolvedor Front-End.",
            "Choose your fighter!"
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 90;
        const deletingSpeed = 45;
        const pauseTime = 1800;

        function typeLoop() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                charIndex--;
                textoAnimadoEl.innerHTML = currentPhrase.substring(0, charIndex) + '<span class="cursor-blink"></span>';
                if (charIndex <= 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    setTimeout(typeLoop, 500);
                    return;
                }
                setTimeout(typeLoop, deletingSpeed);
            } else {
                charIndex++;
                textoAnimadoEl.innerHTML = currentPhrase.substring(0, charIndex) + '<span class="cursor-blink"></span>';
                if (charIndex === currentPhrase.length) {
                    isDeleting = true;
                    setTimeout(typeLoop, pauseTime);
                    return;
                }
                setTimeout(typeLoop, typingSpeed);
            }
        }

        typeLoop();
    }

    /* ----------------------------------------------------------------------
       3. ÁUDIO INTERATIVO // MORTAL KOMBAT SFX
       ---------------------------------------------------------------------- */
    const audioShaoKahn = new Audio("./audio/shao kan_Sound_Effect.mp3");
    const audioScorpionWins = new Audio("./audio/8d82b5_MK3_Scorpion_Wins_Sound_Effect.mp3");

    let soundEnabled = true;

    // Função de reprodução segura
    function playAudioSafe(audio) {
        if (!soundEnabled) return;
        try {
            audio.currentTime = 0;
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch((err) => {
                    console.log("Audio autoplay prevented or interaction required:", err);
                });
            }
        } catch (e) {
            console.error("Audio error:", e);
        }
    }

    // Toggle de som no Header
    const btnAudioToggle = document.querySelector(".btn-audio-toggle");
    if (btnAudioToggle) {
        btnAudioToggle.addEventListener("click", () => {
            soundEnabled = !soundEnabled;
            if (soundEnabled) {
                btnAudioToggle.classList.remove("muted");
                btnAudioToggle.innerHTML = `<span>⚡</span> SFX ON`;
                playAudioSafe(audioShaoKahn);
            } else {
                btnAudioToggle.classList.add("muted");
                btnAudioToggle.innerHTML = `<span>🔇</span> SFX OFF`;
                audioShaoKahn.pause();
                audioScorpionWins.pause();
            }
        });
    }

    // Botão de Play na seção Sobre Mim
    const btnPlaySfx = document.getElementById("btnPlaySfx");
    const soundWave = document.querySelector(".audio-sound-wave");

    if (btnPlaySfx && soundWave) {
        btnPlaySfx.addEventListener("click", () => {
            if (audioShaoKahn.paused) {
                soundEnabled = true;
                if (btnAudioToggle) {
                    btnAudioToggle.classList.remove("muted");
                    btnAudioToggle.innerHTML = `<span>⚡</span> SFX ON`;
                }
                playAudioSafe(audioShaoKahn);
                soundWave.classList.add("playing");
                btnPlaySfx.textContent = "⏸️";
            } else {
                audioShaoKahn.pause();
                soundWave.classList.remove("playing");
                btnPlaySfx.textContent = "▶️";
            }
        });

        audioShaoKahn.addEventListener("ended", () => {
            soundWave.classList.remove("playing");
            btnPlaySfx.textContent = "▶️";
        });
    }

    // Efeitos ao clicar nos Kombatentes
    const rosterCards = document.querySelectorAll(".roster-card");
    rosterCards.forEach((card) => {
        card.addEventListener("click", () => {
            const fighter = card.getAttribute("data-fighter");
            if (fighter === "scorpion") {
                playAudioSafe(audioScorpionWins);
            } else {
                playAudioSafe(audioShaoKahn);
            }
        });
    });

    // Flip interativo no Card ao clicar (especialmente útil em celular)
    const cardBox = document.querySelector(".box");
    if (cardBox) {
        cardBox.addEventListener("click", () => {
            cardBox.classList.toggle("flipped");
            playAudioSafe(audioScorpionWins);
        });
    }

    /* ----------------------------------------------------------------------
       4. SCROLL DA NAVBAR & SCROLLSPY
       ---------------------------------------------------------------------- */
    const cabecalho = document.querySelector(".cabecalho");
    const backToTopBtn = document.querySelector(".btn-back-to-top");
    const navLinks = document.querySelectorAll(".cabecalho__menu__link");
    const sections = document.querySelectorAll("section[id]");

    window.addEventListener("scroll", () => {
        const scrollY = window.pageYOffset;

        // Navbar scrolled background
        if (scrollY > 50) {
            cabecalho.classList.add("scrolled");
        } else {
            cabecalho.classList.remove("scrolled");
        }

        // Back to top visibility
        if (scrollY > 400) {
            backToTopBtn.classList.add("visible");
        } else {
            backToTopBtn.classList.remove("visible");
        }

        // Scrollspy active link
        let currentSectionId = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    /* ----------------------------------------------------------------------
       5. MENU MOBILE TOGGLE
       ---------------------------------------------------------------------- */
    const btnMobileToggle = document.querySelector(".btn-mobile-toggle");
    const cabecalhoMenu = document.querySelector(".cabecalho__menu");

    if (btnMobileToggle && cabecalhoMenu) {
        btnMobileToggle.addEventListener("click", () => {
            cabecalhoMenu.classList.toggle("open");
        });

        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                cabecalhoMenu.classList.remove("open");
            });
        });
    }

    /* ----------------------------------------------------------------------
       6. FORMULÁRIO DE CONTATO (SIMULAÇÃO DE ENVIO COM FEEDBACK)
       ---------------------------------------------------------------------- */
    const contactForm = document.getElementById("kombatContactForm");
    const successMsg = document.getElementById("formSuccessMsg");

    if (contactForm && successMsg) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            playAudioSafe(audioShaoKahn);
            successMsg.style.display = "block";
            successMsg.textContent = "⚡ ROUND 1... MENSAGEM ENVIADA COM SUCESSO! FLAWLESS VICTORY!";
            contactForm.reset();

            setTimeout(() => {
                successMsg.style.display = "none";
            }, 6000);
        });
    }
});
