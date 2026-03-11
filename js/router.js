const routes = {
    home: './pages/home.html',
    about: './pages/about.html',
    contact: './pages/contact.html',
    portfolio: './pages/portfolio.html',
    'single-project': './pages/single-project.html'
};

const pageTitles = {
    home: 'My Portfolio - Home Page',
    about: 'My Portfolio - About Me',
    contact: 'My Portfolio - Contacts',
    portfolio: 'My Portfolio - Portfolio',
    'single-project': 'My Portfolio'
};

function normalizePageKey(page) {
    if (page === 'single_product') return 'single-project';
    return page;
}

function navigateTo(page, slug = null) {
    const container = document.querySelector('.main-container');
    const normalizedPage = normalizePageKey(page);
    const path = routes[normalizedPage];

    if (!path) {
        window.location.replace('/404');
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

            // Keep Portfolio active when viewing a single project
            updateActiveNav(normalizedPage === 'single-project' ? 'portfolio' : normalizedPage);

            document.title = pageTitles[normalizedPage] || 'My Portfolio';

            initPageScripts(normalizedPage, slug);
            container.style.opacity = '1';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        })
        .catch(error => {
            console.error('Error loading page:', error);
            container.innerHTML = '<p>Error loading page</p>';
            container.style.opacity = '1';
        });
}

function initPageScripts(page, slug = null) {
    switch (page) {
        case 'home':
            if (typeof initHomeWorks === 'function') initHomeWorks();
            break;
        case 'portfolio':
            if (typeof initAllWorks === 'function') initAllWorks();
            break;
        case 'contact':
            if (typeof initContactForm === 'function') initContactForm();
            break;
        case 'single-project':
            if (typeof initSingleProject === 'function') initSingleProject();
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
    const raw = window.location.hash.replace('#', '') || 'home';
    const [rawPage, slug] = raw.split('/');
    const page = normalizePageKey(rawPage);

    if (!routes[page]) {
        window.location.replace('/404');
        return;
    }

    navigateTo(page, slug || null);
}

window.addEventListener('hashchange', handleRouting);