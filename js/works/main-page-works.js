function initHomeWorks() {
    const worksSection = document.getElementById('works-section');
    if (!worksSection) return;

    worksSection.classList.remove('all-works-section');
    worksSection.classList.add('home-works-section');

    fetch('./json/works.json')
        .then(response => response.json())
        .then(data => {
            worksSection.innerHTML = '';

            data.works.slice(0, 4).forEach(work => {
                const workItem = document.createElement('section');
                workItem.classList.add('work-item');
                workItem.innerHTML = `
                    <div class="work-image">
                        <img src="${work.image}" alt="${work.title}">
                    </div>
                    <div class="work-content">
                        <hr>
                        <span>${work.number}</span>
                        <h3>${work.title}</h3>
                        <p>${work.description}</p>
                        <img src="${work.direction}" alt="arrow">
                    </div>
                `;
                worksSection.appendChild(workItem);
            });

            observeHomeWorkItems();
        })
        .catch(error => console.error('Error fetching works data:', error));
}

function observeHomeWorkItems() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.work-item').forEach(item => observer.observe(item));

    const seeMore = document.querySelector('.see-more');
    if (seeMore) observer.observe(seeMore);
}