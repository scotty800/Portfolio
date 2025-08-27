// Gestion de la soumission du formulaire
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Récupérer les données du formulaire
            const formData = FormValidation.getFormData();
            
            // Valider les champs
            if (!FormValidation.areFieldsFilled(formData)) {
                FormValidation.showAlert('Veuillez remplir tous les champs obligatoires.', 'error');
                return;
            }
            
            // Valider l'email
            if (!FormValidation.isValidEmail(formData.email)) {
                FormValidation.showAlert('Veuillez entrer une adresse email valide.', 'error');
                return;
            }
            
            // Afficher un indicateur de chargement
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;
            
            // Envoyer l'email via EmailJS
            emailjs.send(EmailJSConfig.SERVICE_ID, EmailJSConfig.TEMPLATE_ID, {
                from_name: formData.name,
                from_email: formData.email,
                message: formData.message,
                to_email: EmailJSConfig.TO_EMAIL
            })
            .then(function(response) {
                FormValidation.showAlert('Message envoyé avec succès ! Je vous répondrai dès que possible.', 'success');
                contactForm.reset();
            }, function(error) {
                FormValidation.showAlert('Une erreur s\'est produite. Veuillez réessayer ou me contacter directement.', 'error');
                console.error('Erreur EmailJS:', error);
            })
            .finally(function() {
                // Restaurer le texte du bouton
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }
});