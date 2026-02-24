document.addEventListener('DOMContentLoaded', () => {
    const worksSection = document.getElementById('works-section');

    // Only run if works section exists (index page)
    if (!worksSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    fetch('../json/works.json')
        .then(response => response.json())
        .then(data => {
            data.works.forEach((work, idx) => {
                const workLink = document.createElement('a');
                workLink.href = '#';
                workLink.className = 'work-link';

                const workItem = document.createElement('section');
                workItem.className = 'work-item';
                workItem.style.animationDelay = `${0.1 * (idx + 1)}s`;

                const imageDiv = document.createElement('div');
                imageDiv.className = 'work-image';
                const img = document.createElement('img');
                img.src = work.image;
                img.alt = work.title;
                imageDiv.appendChild(img);

                const contentDiv = document.createElement('div');
                contentDiv.className = 'work-content';
                const hr = document.createElement('hr');
                const number = document.createElement('span');
                number.textContent = work.number;
                const title = document.createElement('h3');
                title.textContent = work.title;
                const description = document.createElement('p');
                description.textContent = work.description;

                contentDiv.appendChild(hr);
                contentDiv.appendChild(number);
                contentDiv.appendChild(title);
                contentDiv.appendChild(description);

                workItem.appendChild(imageDiv);
                workItem.appendChild(contentDiv);
                workLink.appendChild(workItem);
                worksSection.appendChild(workLink);

                observer.observe(workLink);
            });

            const seeMore = document.querySelector('.see-more');
            if (seeMore) {
                seeMore.style.animationDelay = `${0.1 * (data.works.length + 1)}s`;
                observer.observe(seeMore);
            }
        })
        .catch(error => console.error('Error loading works:', error));
});