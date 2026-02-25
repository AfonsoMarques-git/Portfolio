const allCSS = [
    '/css/header.css',
    '/css/footer.css',
    '/css/style.css',
    '/css/about.css',
    '/css/contact.css',
    '/css/portfolio.css'
];

function loadAllCss() {
    return Promise.all(allCSS.map(href => {
        return new Promise((resolve) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.onload = resolve;
            link.onerror = resolve;
            document.head.appendChild(link);
        });
    }));
}