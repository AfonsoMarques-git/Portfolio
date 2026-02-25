const routes = {
    home: './pages/home.html',
    about: './pages/about.html',
    contact: './pages/contact.html',
    portfolio: './pages/portfolio.html'
};

function navigateTo(page) {
    const container = document.querySelector('.main-container');
    const path = routes[page];

    if (!path) {
        container.innerHTML = '<p>Page not found</p>';
        return;
    }

    container.style.transition = 'opacity 0.2s ease';
    container.style.opacity = '0';

    fetch(path)
        .then(response => {
            if (!response.ok) throw new Error('Page not found');
            return response.text();
        })
        .then(html => {
            container.innerHTML = html;
            updateActiveNav(page);
            initPageScripts(page);
            container.style.opacity = '1';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        })
        .catch(error => {
            console.error('Error loading page:', error);
            container.innerHTML = '<p>Error loading page</p>';
            container.style.opacity = '1';
        });
}

function initPageScripts(page) {
    switch (page) {
        case 'home':
            initHomeWorks();
            break;
        case 'portfolio':
            initAllWorks();
            break;
        case 'contact':
            initContactForm();
            break;
    }
}

function updateActiveNav(page) {
    document.querySelectorAll('header nav ul li').forEach(li => {
        li.classList.remove('active');
        const link = li.querySelector('a');
        if (link && link.getAttribute('href') === `#${page}`) {
            li.classList.add('active');
        }
    });
}

function handleRouting() {
    const hash = window.location.hash.replace('#', '') || 'home';
    if (!routes[hash]) return;
    navigateTo(hash);
}

window.addEventListener('hashchange', handleRouting);