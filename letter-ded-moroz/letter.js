(() => {
    /* ===============================
       УТИЛИТЫ
    =============================== */
    const $ = s => document.querySelector(s);
    const $$ = s => document.querySelectorAll(s);

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    /* ===============================
       ПЕРСОНАЛИЗАЦИЯ (имя)
    =============================== */
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");

    const nameTarget = document.querySelector("[data-name]");
    if (nameTarget) {
        nameTarget.textContent = name || "Путник";
    }

    /* ===============================
       ПОЯВЛЕНИЕ АБЗАЦЕВ
    =============================== */
    if (!prefersReducedMotion) {
        const reveals = $$(".reveal");

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );

        reveals.forEach(el => observer.observe(el));
    } else {
        $$(".reveal").forEach(el => el.classList.add("visible"));
    }

    /* ===============================
       ПАРАЛЛАКС ФОНА
    =============================== */
    const bg = $(".parallax-bg");
    if (bg && !prefersReducedMotion) {
        window.addEventListener("scroll", () => {
            const offset = window.scrollY * 0.12;
            bg.style.transform = `translateY(${offset}px)`;
        });
    }

    /* ===============================
       СНЕГОПАД (CANVAS)
    =============================== */
    const canvas = $("#snow");
    if (canvas && !prefersReducedMotion) {
        const ctx = canvas.getContext("2d");
        let w, h, flakes = [];

        function resize() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        }

        window.addEventListener("resize", resize);
        resize();

        flakes = Array.from({ length: 120 }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 2 + 1,
            s: Math.random() * 1 + 0.5
        }));

        function draw() {
            ctx.clearRect(0, 0, w, h);
            ctx.fillStyle = "rgba(255,255,255,0.8)";

            flakes.forEach(f => {
                ctx.beginPath();
                ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
                ctx.fill();

                f.y += f.s;
                if (f.y > h) {
                    f.y = -5;
                    f.x = Math.random() * w;
                }
            });

            requestAnimationFrame(draw);
        }

        draw();
    }

    /* ===============================
       ЗАПЕЧАТЫВАНИЕ ПИСЬМА
    =============================== */
    const sealBtn = $("#seal");
    if (sealBtn) {
        sealBtn.addEventListener("click", () => {
            $(".letter")?.classList.add("sealed");
            localStorage.setItem("letterSealed", "true");
        });
    }

    /* ===============================
       СОСТОЯНИЕ (память)
    =============================== */
    if (localStorage.getItem("letterSealed") === "true") {
        $(".letter")?.classList.add("sealed");
    }

})();