function initAllWorks() {
    const worksSection = document.getElementById('works-section');
    if (!worksSection) return;

    worksSection.classList.remove('home-works-section');
    worksSection.classList.add('all-works-section');
    worksSection.classList.add('portfolio-works-section');

    fetch('./json/works.json')
        .then(response => response.json())
        .then(data => {
            worksSection.innerHTML = '';
            data.works.forEach(work => {
                const workItem = document.createElement('section');
                workItem.classList.add('portfolio-work-item');
                workItem.innerHTML = `
                    <div class="portfolio-work-image">
                        <img src="${work.image}" alt="${work.title}">
                    </div>
                    <div class="portfolio-work-content">
                        <hr>
                        <span class="portfolio-work-number">${work.number}</span>
                        <h3 class="portfolio-work-title">${work.title}</h3>
                        <p class="portfolio-work-description">${work.description}</p>
                        <a class="portfolio-work-link" href="#single_product/${encodeURIComponent(work.id)}">
                            <img class="portfolio-work-arrow" src="${work.direction}" alt="arrow">
                        </a>
                    </div>
                `;
                worksSection.appendChild(workItem);
            });
            observeAllWorkItems();
        })
        .catch(error => console.error('Error fetching works data:', error));
}

function observeAllWorkItems() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.portfolio-work-item').forEach(item => observer.observe(item));
}