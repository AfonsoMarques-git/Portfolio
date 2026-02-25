function loadFooter() {
    const footerContainer = document.querySelector('footer');

    fetch('./json/footer-data.json')
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            footerContainer.innerHTML = `
                <div class="footer-content">
                    <img src="${data.logo.src}" alt="${data.logo.alt}">
                    <div class="social-media">
                        ${data.socialMedia.map(social => `
                            <a href="${social.url}" target="_blank">
                                <img src="${social.icon}" alt="${social.platform}">
                            </a>
                        `).join('')}
                    </div>
                </div>
                <div class="footer-base">
                    <p>${data.copyright}</p>
                </div>
            `;
        })
        .catch(error => {
            console.error('Error loading footer:', error);
            footerContainer.innerHTML = '<p>Error loading footer</p>';
        });
}