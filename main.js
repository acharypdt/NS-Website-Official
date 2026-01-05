document.addEventListener('DOMContentLoaded', function() {
    const fadeInElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeInElements.forEach(element => {
        observer.observe(element);
    });

    // Dynamically update the copyright year
    const copyrightSpan = document.getElementById('copyright-year');
    if (copyrightSpan) {
        const foundingYear = 2025;
        const currentYear = new Date().getFullYear();
        copyrightSpan.textContent = `${foundingYear} - ${currentYear}`;
    }
});
