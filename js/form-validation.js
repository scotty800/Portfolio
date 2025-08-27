// Fonctions de validation du formulaire
const FormValidation = {
    /**
     * Valide une adresse email
     * @param {string} email - L'adresse email à valider
     * @returns {boolean} True si l'email est valide, false sinon
     */
    isValidEmail: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    /**
     * Vérifie que tous les champs requis sont remplis
     * @param {Object} formData - Les données du formulaire
     * @returns {boolean} True si tous les champs sont remplis, false sinon
     */
    areFieldsFilled: function(formData) {
        return formData.name && formData.email && formData.message;
    },

    /**
     * Affiche un message d'alerte
     * @param {string} message - Le message à afficher
     * @param {string} type - Le type d'alerte ('success' ou 'error')
     */
    showAlert: function(message, type) {
        const alertBox = document.getElementById('alertBox');
        if (alertBox) {
            alertBox.textContent = message;
            alertBox.className = type === 'success' ? 'alert alert-success' : 'alert alert-error';
            alertBox.style.display = 'block';
            
            // Masquer l'alerte après 5 secondes
            setTimeout(() => {
                alertBox.style.display = 'none';
            }, 5000);
        }
    },

    /**
     * Récupère les données du formulaire
     * @returns {Object} Les données du formulaire
     */
    getFormData: function() {
        return {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
    }
};