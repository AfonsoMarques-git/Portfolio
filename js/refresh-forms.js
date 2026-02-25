function initContactForm() {
    const form = document.querySelector(".contact-form");
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showToast('Message sent successfully!', true);
                    form.reset();
                } else {
                    showToast('Something went wrong, please try again.', false);
                }
            })
            .catch(() => showToast('Something went wrong, please try again.', false));
    });
}

function showToast(message, isSuccess = true) {
    const toast = document.createElement('div');
    toast.classList.add('toast', isSuccess ? 'toast-success' : 'toast-error');
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}