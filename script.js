document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Theme Switcher Engine ---
    const savedTheme = localStorage.getItem('theme') || 'dark';

    const navContainer = document.querySelector('.nav-container') || document.querySelector('.navbar');

    if (navContainer && !document.getElementById('theme-toggle')) {
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'theme-toggle';
        toggleBtn.className = 'theme-toggle-btn';
        navContainer.appendChild(toggleBtn);
    }

    const themeToggleBtn = document.getElementById('theme-toggle');

    function applyTheme(theme) {
        if (theme === 'light') {
            document.documentElement.classList.add('light-theme');
            document.body.classList.add('light-theme');
            document.documentElement.classList.remove('dark-theme');
            document.body.classList.remove('dark-theme');
            if (themeToggleBtn) themeToggleBtn.textContent = '🌙 Dark Mode';
        } else {
            document.documentElement.classList.remove('light-theme');
            document.body.classList.remove('light-theme');
            document.documentElement.classList.add('dark-theme');
            document.body.classList.add('dark-theme');
            if (themeToggleBtn) themeToggleBtn.textContent = '☀️ Light Mode';
        }
    }

    applyTheme(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isLight = document.body.classList.contains('light-theme');
            const newTheme = isLight ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        });
    }

    // --- 2. Date Display ---
    const currentDateElement = document.getElementById('current-date');
    if (currentDateElement) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        currentDateElement.textContent = new Date().toLocaleDateString(undefined, options);
    }

    // --- 3. Scroll Progress Indicator ---
    const progressBar = document.getElementById('scrollProgress');
    window.addEventListener('scroll', () => {
        if (progressBar) {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            progressBar.style.width = `${progress}%`;
        }
    });

    // --- 4. Scrollytelling Step Sync ---
    const steps = document.querySelectorAll('.scrolly-step');
    const visualCards = document.querySelectorAll('.visual-card');

    if (steps.length > 0 && visualCards.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-30% 0px -40% 0px',
            threshold: 0.2
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const stepNumber = entry.target.getAttribute('data-step');
                    
                    visualCards.forEach((card, index) => {
                        const cardStep = card.getAttribute('data-step') || card.id.replace('visual-', '');
                        if (cardStep == stepNumber || index + 1 == stepNumber) {
                            card.classList.add('active');
                        } else {
                            card.classList.remove('active');
                        }
                    });
                }
            });
        }, observerOptions);

        steps.forEach(step => observer.observe(step));
    }
});