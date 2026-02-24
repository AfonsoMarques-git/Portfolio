window.onload = function() {
    const form = document.querySelector(".contact-form");
    if (form) {
        form.reset();
    }
}

// Function to show toast notification
function showToast(message, isSuccess = true) {
    const toast = document.createElement('div');
    toast.className = isSuccess ? 'toast toast-success' : 'toast toast-error';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// Reset form after submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector(".contact-form");
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            
            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                
                if (response.ok) {
                    form.reset();
                    showToast('Message sent successfully!', true);
                } else {
                    showToast('Failed to send message. Please try again later.', false);
                }
            } catch (error) {
                showToast('An error occurred. Please try again later.', false);
            }
        });
    }
});