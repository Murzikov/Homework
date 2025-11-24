const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    spaceBetween: 50,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        renderBullet: function (index, className) {
            return `<span class= ${className} ></span>`;
        },
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
// .......................................................//

// search modal script
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.search-toggle');
    const modal = document.getElementById('search-modal');
    if (!toggle || !modal) return;

    const overlay = modal.querySelector('.search-modal__overlay');
    const closeBtn = modal.querySelector('.search-modal__close');
    const input = modal.querySelector('.search-input');

    let lastFocused = null;

    function openModal() {
        lastFocused = document.activeElement;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        toggle.setAttribute('aria-expanded', 'true');
        document.body.classList.add('modal-open');

        // небольшая задержка чтобы анимация успела и input получил фокус
        window.setTimeout(() => {
            input.focus();
            input.select && input.select();
        }, 160);
    }

    function closeModal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('modal-open');

        // вернуть фокус туда, откуда открывали
        if (lastFocused && typeof lastFocused.focus === 'function') {
            lastFocused.focus();
        }
    }

    // toggle click
    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        if (modal.classList.contains('open')) closeModal();
        else openModal();
    });

    // overlay and close button
    overlay.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);

    // key handlers: Esc
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });

    modal.addEventListener('submit', function (e) {
        e.preventDefault();
        const q = input.value.trim();

        if (!q) {
            input.classList.add('search-input--error');
            input.focus();
            setTimeout(() => input.classList.remove('search-input--error'), 1400);
            return;
        }

        // показываем "загрузка" и не закрываем модалку
        showInlineResults(q);
    });

    function showInlineResults(query) {
        // контейнер результатов — создаём если нет
        let results = modal.querySelector('.search-results');
        if (!results) {
            results = document.createElement('div');
            results.className = 'search-results';
            results.style.marginTop = '12px';
            modal.querySelector('.search-modal__panel').appendChild(results);
        }

        results.innerHTML = 'Идёт поиск...';

        // пример: имитация запроса (или замени fetch(...) на реальный запрос к API)
        setTimeout(() => {
            // пример вывода
            results.innerHTML = `
      <div class="results-hit">Найдено по запросу: <strong>${escapeHtml(query)}</strong></div>
      <ul>
        <li><a href="/item/1?q=${encodeURIComponent(query)}">Результат 1</a></li>
        <li><a href="/item/2?q=${encodeURIComponent(query)}">Результат 2</a></li>
      </ul>
    `;
        }, 600);
    }

    function escapeHtml(s) {
        return s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }
});

// dropdown menu simple script
document.addEventListener('DOMContentLoaded', function () {
    const dropdowns = Array.from(document.querySelectorAll('.dropdown'));

    dropdowns.forEach(drop => {
        const toggle = drop.querySelector('.dropdown-toggle');
        const menu = drop.querySelector('.dropdown-menu');

        // click/press on toggle
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            const isOpen = drop.classList.toggle('open');
            toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        // keyboard support: Enter, Space, Escape
        toggle.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const isOpen = drop.classList.toggle('open');
                toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            } else if (e.key === 'Escape') {
                drop.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.focus();
            }
        });

        // close when clicking a menu item
        Array.from(menu.querySelectorAll('a')).forEach(a => {
            a.addEventListener('click', function () {
                drop.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    });

    // close any open dropdown when clicking outside
    document.addEventListener('click', function (e) {
        document.querySelectorAll('.dropdown.open').forEach(openDrop => {
            if (!openDrop.contains(e.target)) {
                openDrop.classList.remove('open');
                const t = openDrop.querySelector('.dropdown-toggle');
                if (t) t.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // global Esc handler
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.dropdown.open').forEach(d => {
                d.classList.remove('open');
                const t = d.querySelector('.dropdown-toggle');
                if (t) t.setAttribute('aria-expanded', 'false');
            });
        }
    });
});

// ..................................................................

/* script.js */
// вставляем подсказку в инпут, фокусируем и ставим каретку в конец
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('searchInput');
    document.querySelectorAll('.hint-chip').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // если нужно — возьми value из data-value (без лишних пробелов)
            const value = (btn.getAttribute('data-value') || btn.textContent || '').trim();
            if (!value) return;

            // просто вставляем текст — не инициализируем поиск
            input.value = value;

            // фокусируем и ставим курсор в конец (как будто напечатал)
            input.focus();
            const len = input.value.length;
            // для большинства браузеров
            if (input.setSelectionRange) {
                input.setSelectionRange(len, len);
            } else {
                // запасной вариант
                input.selectionStart = input.selectionEnd = len;
            }

            // при необходимости — можно вызвать событие input (если где-то слушаешь)
            input.dispatchEvent(new Event('input', { bubbles: true }));
        });
    });

    // предотвращаем отправку формы при Enter — убрал поведение по умолчанию
    const form = document.querySelector('.search-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
        });
    }
});


// ............................................................
