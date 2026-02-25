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
                            <li>
                                <a href="${item.link}">${item.label}</a>
                            </li>
                        `).join('')}
                    </ul>
                </nav>
            `;

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

            headerContainer.classList.add('loaded');
        })
        .catch(error => {
            console.error('Error loading header:', error);
            headerContainer.innerHTML = '<p>Error loading navigation</p>';
            headerContainer.classList.add('loaded');
        });
}