function loadFooter() {
    const footerContainer = document.querySelector('footer');
    const isSubpage = window.location.pathname.includes('/pages/');
    const basePath = isSubpage ? '../' : './';

    fetch(`${basePath}json/footer-data.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const logoPath = isSubpage ? data.logo.src.replace('./', '../') : data.logo.src;

            footerContainer.innerHTML = `
                <div class="footer-content">
                    <img src="${logoPath}" alt="${data.logo.alt}">
                    <div class="social-media">
                        ${data.socialMedia.map(social => {
                return `<a href="${social.url}" target="_blank">
                                ${loadIcon(social.platform, { width: '30', height: '30' })}
                            </a>`;
            }).join('')}
                    </div>
                </div>
                <div class="footer-base">
                    <p>${data.copyright}</p>
                </div>
            `;

            const backToTopDiv = document.createElement('div');
            backToTopDiv.className = 'backtotop';
            backToTopDiv.innerHTML = `
                <a href="${data.backToTop.anchor}">
                    ${loadIcon('arrow-up', { width: '70', height: '70' })}
                </a>
            `;
            footerContainer.insertAdjacentElement('afterend', backToTopDiv);
        })
        .catch(error => {
            console.error('Error loading footer:', error);
            footerContainer.innerHTML = '<p>Error loading footer</p>';
        });
}