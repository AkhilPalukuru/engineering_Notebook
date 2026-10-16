document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Theme Switcher ---
    let savedTheme = 'dark';
    try { savedTheme = localStorage.getItem('theme') || 'dark'; } catch (e) {}

    const navContainer = document.querySelector('.nav-container');
    let themeToggleBtn = document.getElementById('theme-toggle');
    if (navContainer && !themeToggleBtn) {
        themeToggleBtn = document.createElement('button');
        themeToggleBtn.id = 'theme-toggle';
        themeToggleBtn.type = 'button';
        themeToggleBtn.className = 'theme-toggle-btn';
        navContainer.appendChild(themeToggleBtn);
    }

    function applyTheme(theme) {
        const light = theme === 'light';
        [document.documentElement, document.body].forEach(el => {
            el.classList.toggle('light-theme', light);
            el.classList.toggle('dark-theme', !light);
        });
        if (themeToggleBtn) themeToggleBtn.textContent = light ? '🌙 Dark Mode' : '☀️ Light Mode';
    }

    applyTheme(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const newTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
            try { localStorage.setItem('theme', newTheme); } catch (e) {}
            applyTheme(newTheme);
        });
    }

    // --- 2. Scroll Progress ---
    const progressBar = document.getElementById('scrollProgress');
    window.addEventListener('scroll', () => {
        if (!progressBar) return;
        const total = document.documentElement.scrollHeight - window.innerHeight;
        if (total > 0) progressBar.style.width = `${(window.scrollY / total) * 100}%`;
    });

    // --- 3. Scrollytelling ---
    const steps = document.querySelectorAll('.scrolly-step');
    const visualCards = document.querySelectorAll('.visual-card');
    if (steps.length && visualCards.length && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const n = entry.target.getAttribute('data-step');
                visualCards.forEach(card => card.classList.toggle('active', card.getAttribute('data-step') === n));
            });
        }, { rootMargin: '-30% 0px -40% 0px', threshold: 0.2 });
        steps.forEach(step => observer.observe(step));
    }

    // --- 4. Project Filters ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');
            const value = button.getAttribute('data-filter');
            projectCards.forEach(card => {
                const cats = (card.getAttribute('data-category') || '').split(/\s+/);
                const show = value === 'all' || cats.includes(value);
                card.style.display = show ? 'flex' : 'none';
            });
        });
    });

    // --- 5. Project Modal ---
    const modal = document.getElementById('project-modal');
    if (modal) {
        const closeModal = () => {
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
        };

        document.querySelectorAll('.open-modal-btn').forEach(button => {
            button.addEventListener('click', () => {
                document.getElementById('modal-title').textContent = button.dataset.title || '';
                document.getElementById('modal-desc').textContent = button.dataset.desc || '';
                document.getElementById('modal-learned').textContent = button.dataset.learned || '';
                document.getElementById('modal-github').setAttribute('href', button.dataset.github || '#');
                modal.style.display = 'flex';
                modal.setAttribute('aria-hidden', 'false');
            });
        });

        modal.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeModal));
        document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
    }
});