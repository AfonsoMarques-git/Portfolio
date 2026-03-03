function getProjectIdFromHash() {
    const hash = window.location.hash || "";

    // #single-project/abc
    let match = hash.match(/^#single-project\/([^/?#]+)/i);
    if (match) return decodeURIComponent(match[1]);

    // backward compatibility: #single_product/abc
    match = hash.match(/^#single_product\/([^/?#]+)/i);
    if (match) return decodeURIComponent(match[1]);

    // #single-project?id=abc
    const qIndex = hash.indexOf('?');
    if (qIndex !== -1) {
        const params = new URLSearchParams(hash.slice(qIndex + 1));
        return params.get('id');
    }

    return null;
}

function initSingleProject() {
    const root = document.querySelector('.product-presentation');
    if (!root) return;

    const mainImage = root.querySelector('.main-image img');
    const projectType = root.querySelector('.project-type');
    const projectName = root.querySelector('.project-name');
    const projectDescription = root.querySelector('.project-description');

    const projectId = getProjectIdFromHash();

    if (!projectId) {
        if (projectName) projectName.textContent = "Project not found";
        if (projectDescription) projectDescription.textContent = "Missing project id.";
        return;
    }

    fetch('./json/works.json')
        .then(res => res.json())
        .then(data => {
            const project = (data.works || []).find(w => String(w.id) === String(projectId));

            if (!project) {
                if (projectName) projectName.textContent = "Project not found";
                if (projectDescription) projectDescription.textContent = "No project found with this id.";
                return;
            }

            if (mainImage) {
                mainImage.src = project.image;
                mainImage.alt = project.title || "Project image";
            }
            if (projectType) projectType.textContent = project.number || "";
            if (projectName) projectName.textContent = project.title || "";
            if (projectDescription) projectDescription.textContent = project.description || "";

        })
        .catch(err => {
            console.error("Error loading project data:", err);
            if (projectName) projectName.textContent = "Error loading project";
            if (projectDescription) projectDescription.textContent = "Could not load project data.";
        });
}