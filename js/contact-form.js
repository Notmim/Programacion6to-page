// Contact Form Modal Handler - Shared across all pages
document.addEventListener('DOMContentLoaded', function() {
    const emailTrigger = document.querySelector('.email-contact-trigger');
    const contactModal = document.getElementById('contactModal');
    const contactModalClose = document.querySelector('.contact-modal-close');
    const contactModalOverlay = document.querySelector('.contact-modal-overlay');
    const contactForm = document.getElementById('contactForm');

    if (emailTrigger && contactModal) {
        // Open modal on email link click
        emailTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            contactModal.classList.add('active');
        });

        // Close modal on close button click
        if (contactModalClose) {
            contactModalClose.addEventListener('click', function() {
                contactModal.classList.remove('active');
                if (contactForm) contactForm.reset();
            });
        }

        // Close modal on overlay click
        if (contactModalOverlay) {
            contactModalOverlay.addEventListener('click', function() {
                contactModal.classList.remove('active');
                if (contactForm) contactForm.reset();
            });
        }

        // Close modal on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && contactModal.classList.contains('active')) {
                contactModal.classList.remove('active');
                if (contactForm) contactForm.reset();
            }
        });

        // Handle form submission
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const formData = {
                    name: document.getElementById('contactName').value,
                    email: document.getElementById('contactEmail').value,
                    topic: document.getElementById('contactTopic').value,
                    comments: document.getElementById('contactComments').value
                };

                // Create mailto link with form data
                const mailtoLink = `mailto:info@fagenix.com?subject=${encodeURIComponent(formData.topic)}&body=${encodeURIComponent(`Nombre: ${formData.name}\nCorreo: ${formData.email}\n\nMensaje:\n${formData.comments}`)}`;
                
                // Open default email client
                window.location.href = mailtoLink;
                
                // Show success message
                alert('Tu mensaje ha sido preparado. Se abrirá tu cliente de correo para enviar el mensaje.');
                
                // Close modal and reset form
                contactModal.classList.remove('active');
                contactForm.reset();
            });
        }
    }
});
