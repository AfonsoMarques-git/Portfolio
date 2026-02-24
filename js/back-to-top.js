document.addEventListener('DOMContentLoaded', () => {
    const backtotop = document.querySelector('.backtotop');
    const heroSection = document.querySelector('.hero-section');

    // Back to top button toggle
    if (heroSection && backtotop) {
        const toggleBackToTop = () => {
            const heroRect = heroSection.getBoundingClientRect();
            if (heroRect.bottom < 0) {
                backtotop.classList.add('show');
            } else {
                backtotop.classList.remove('show');
            }
        };

        window.addEventListener('scroll', toggleBackToTop);
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(Link => {
        Link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 25;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });
});