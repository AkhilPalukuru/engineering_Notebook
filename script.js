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

    // --- 2. Scroll Progress Indicator ---
    const progressBar = document.getElementById('scrollProgress');
    window.addEventListener('scroll', () => {
        if (progressBar) {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (totalHeight > 0) {
                const progress = (window.scrollY / totalHeight) * 100;
                progressBar.style.width = `${progress}%`;
            }
        }
    });

    // --- 3. Scrollytelling Step Sync ---
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
                        const cardStep = card.getAttribute('data-step') || (index + 1);
                        if (cardStep == stepNumber) {
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

    // --- 4. Projects Filtering Engine ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const categories = card.getAttribute('data-category') || '';
                    if (filterValue === 'all' || categories.includes(filterValue)) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // --- 5. Interactive Project Modal Engine ---
    const modal = document.getElementById('project-modal');
    const openModalButtons = document.querySelectorAll('.open-modal-btn');
    const closeModalElements = document.querySelectorAll('[data-close]');

    if (modal) {
        openModalButtons.forEach(button => {
            button.addEventListener('click', () => {
                const title = button.getAttribute('data-title');
                const desc = button.getAttribute('data-desc');
                const learned = button.getAttribute('data-learned');
                const github = button.getAttribute('data-github');

                const modalTitle = document.getElementById('modal-title');
                const modalDesc = document.getElementById('modal-desc');
                const modalLearned = document.getElementById('modal-learned');
                const githubLink = document.getElementById('modal-github');

                if (modalTitle) modalTitle.textContent = title;
                if (modalDesc) modalDesc.textContent = desc;
                if (modalLearned) modalLearned.textContent = learned;
                if (githubLink) githubLink.setAttribute('href', github || '#');

                modal.style.display = 'flex';
                modal.setAttribute('aria-hidden', 'false');
            });
        });

        closeModalElements.forEach(element => {
            element.addEventListener('click', () => {
                modal.style.display = 'none';
                modal.setAttribute('aria-hidden', 'true');
            });
        });
    }
});