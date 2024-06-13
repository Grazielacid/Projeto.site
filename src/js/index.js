
window.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.menu a');

    links.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    window.addEventListener('scroll', highlightCurrentSection);
});

function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetPosition = document.querySelector(targetId).offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start = null;

    window.requestAnimationFrame(step);

    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
        if (progress < duration) window.requestAnimationFrame(step);
    }

    function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }
}

function highlightCurrentSection() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY;

    sections.forEach(section => {
        const top = section.offsetTop - 50;
        const bottom = top + section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= top && scrollPosition < bottom) {
            const currentLink = document.querySelector(`.menu a[href="#${sectionId}"]`);
            if (currentLink) {
                links.forEach(link => link.classList.remove('current'));
                currentLink.classList.add('current');
            }
        }
    });
}