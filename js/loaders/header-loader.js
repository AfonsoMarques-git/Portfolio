function loadHeader(currentPage = 'home') {
    const headerContainer = document.querySelector('header');
    const isSubpage = window.location.pathname.includes('/pages/');
    const basePath = isSubpage ? '../' : './';

    console.log('Current Page Parameter:', currentPage);

    fetch(`${basePath}json/header-data.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const logoPath = isSubpage ? data.logo.src.replace('./', '../') : data.logo.src;
            const logoLink = isSubpage ? '../index.html' : './index.html';

            headerContainer.innerHTML = `
                <div class="logo">
                    <a href="${logoLink}">
                        <img src="${logoPath}" alt="${data.logo.alt}">
                    </a>
                </div>
                <div class="hamburguer">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <nav class="menu">
                    <ul>
                        ${data.navigation.map(item => {
                let itemLink;
                if (item.link.includes('index.html')) {
                    itemLink = isSubpage ? '../index.html' : './index.html';
                } else if (item.link.includes('./pages/')) {
                    itemLink = isSubpage ? item.link.replace('./pages/', '') : item.link;
                } else {
                    itemLink = item.link;
                }

                const isActive = item.label.toLowerCase() === currentPage.toLowerCase();
                console.log(`Item: ${item.label}, isActive: ${isActive}`);

                return `<li ${isActive ? 'class="active"' : ''}>
                                <a href="${itemLink}">${item.label}</a>
                            </li>`;
            }).join('')}
                    </ul>
                </nav>
            `;

            // Initialize hamburger menu
            const hamburguer = document.querySelector('.hamburguer');
            const menu = document.querySelector('.menu');

            if (hamburguer && menu) {
                hamburguer.addEventListener('click', () => {
                    hamburguer.classList.toggle('active');
                    menu.classList.toggle('active');
                    document.body.classList.toggle('menu-open');
                });

                document.addEventListener('click', (e) => {
                    if (!hamburguer.contains(e.target) && !menu.contains(e.target)) {
                        hamburguer.classList.remove('active');
                        menu.classList.remove('active');
                        document.body.classList.remove('menu-open');
                    }
                });
            }

            // Add loaded class AFTER content is inserted
            headerContainer.classList.add('loaded');
        })
        .catch(error => {
            console.error('Error loading header:', error);
            headerContainer.innerHTML = '<p>Error loading navigation</p>';
            headerContainer.classList.add('loaded');
        });
}