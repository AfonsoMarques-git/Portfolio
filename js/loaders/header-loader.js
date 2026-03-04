function loadHeader() {
    const headerContainer = document.querySelector('header');

    return fetch('./json/header-data.json')
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            headerContainer.innerHTML = `
                <div class="logo">
                    <a href="#home">
                        <img src="${data.logo.src}" alt="${data.logo.alt}">
                    </a>
                </div>
                <div class="hamburguer">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <nav class="menu">
                    <ul>
                        ${data.navigation.map(item => `
                            <li><a href="${item.link}">${item.label}</a></li>
                        `).join('')}
                    </ul>
                </nav>
            `;

            const hamburguer = headerContainer.querySelector('.hamburguer');
            const menu = headerContainer.querySelector('.menu');

            if (hamburguer && menu) {
                const closeMenu = () => {
                    hamburguer.classList.remove('active');
                    menu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                };

                // avoid duplicated listeners if loadHeader runs multiple times
                if (window.__headerMenuAbortController) {
                    window.__headerMenuAbortController.abort();
                }
                const controller = new AbortController();
                window.__headerMenuAbortController = controller;
                const { signal } = controller;

                hamburguer.addEventListener('click', () => {
                    hamburguer.classList.toggle('active');
                    menu.classList.toggle('active');
                    document.body.classList.toggle('menu-open');
                });

                document.addEventListener('click', (e) => {
                    if (!hamburguer.contains(e.target) && !menu.contains(e.target)) {
                        closeMenu();
                    }
                }, { signal });

                menu.addEventListener('click', (e) => {
                    if (e.target.closest('a')) closeMenu(); // close immediately on tap
                });

                window.addEventListener('hashchange', closeMenu, { signal });
                document.addEventListener('content:loaded', closeMenu, { signal });
            }

            headerContainer.classList.add('loaded');
        })
        .catch(error => {
            console.error('Error loading header:', error);
            headerContainer.innerHTML = '<p>Error loading navigation</p>';
            headerContainer.classList.add('loaded');
        });
}