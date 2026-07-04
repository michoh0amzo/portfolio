window.initPortfolio = () => {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (navToggle && !navToggle.dataset.bound) {
        navToggle.dataset.bound = "true";
        navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
        navLinks.querySelectorAll('a').forEach(a =>
            a.addEventListener('click', () => navLinks.classList.remove('open')));
    }

    const revealEls = document.querySelectorAll('.reveal:not([data-observed])');
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    revealEls.forEach(el => { el.dataset.observed = "true"; io.observe(el); });


    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('.stack-block').forEach(b => b.style.animation = 'none');
        revealEls.forEach(el => el.classList.add('in-view'));
    }
};