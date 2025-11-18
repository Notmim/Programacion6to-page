// ===== BOTÓN DE USUARIO SIMPLE =====
document.addEventListener('DOMContentLoaded', function() {
    // Buscar el botón de usuario (el último botón de los iconos del header)
    const userBtn = document.querySelector('.header-icons .icon-btn:last-child');
    
    if (userBtn) {
        userBtn.addEventListener('click', function() {
            // Prompt para introducir nombre de usuario
            const userName = prompt("¡Bienvenido a Fagenix! Introduce tu nombre:");
            
            if (userName && userName.trim()) {
                // Mostrar mensaje de confirmación
                alert(`¡Hola ${userName.trim()}! Bienvenido a nuestra tienda.`);
                
                // Cambiar el ícono para mostrar que está logueado
                const userIcon = userBtn.querySelector('i');
                if (userIcon) {
                    userIcon.className = 'fas fa-user'; // Cambiar a ícono sólido
                    userBtn.title = `Usuario: ${userName.trim()}`; // Tooltip nativo
                    userBtn.style.color = '#8a2be2'; // Color morado para indicar login
                }
            }
        });
    }
});