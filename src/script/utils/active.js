import { parsePathToRoute } from '/src/router';

export function setActiveNav(currentPage) {
    const navLinks = document.querySelectorAll('[data-nav]');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        const { page: linkPage } = parsePathToRoute(href);
        if (linkPage === currentPage) {
            link.classList.add('active-p');
        } else {
            link.classList.remove('active-p');
        }
    });
}