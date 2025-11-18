// ===== Buscador =====
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (!searchInput || !searchBtn) return;

    // Función principal de búsqueda
    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        
        if (query === '') {
            showAllItems();
            return;
        }

        // Detectar en qué página estamos
        const currentPage = detectCurrentPage();
        
        // Buscar según la página
        switch(currentPage) {
            case 'index':
                searchInIndex(query);
                break;
            case 'moda':
                searchInModa(query);
                break;
            case 'alimentos':
                searchInAlimentos(query);
                break;
        }
    }

    // Detectar página actual
    function detectCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('moda.html')) return 'moda';
        if (path.includes('alimentos.html')) return 'alimentos';
        return 'index';
    }

    // Búsqueda en página principal (index)
    function searchInIndex(query) {
        const cards = document.querySelectorAll('.feature-card, .product-card');
        let found = false;

        cards.forEach(card => {
            const title = card.querySelector('h3, h2')?.textContent.toLowerCase() || '';
            const description = card.querySelector('p')?.textContent.toLowerCase() || '';
            const category = card.querySelector('.product-category, .feature-icon')?.textContent.toLowerCase() || '';
            
            const isMatch = title.includes(query) || 
                          description.includes(query) || 
                          category.includes(query);

            if (isMatch) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
                found = true;
            } else {
                card.style.display = 'none';
            }
        });

        showSearchFeedback(found, query);
    }

    // Búsqueda en página de moda
    function searchInModa(query) {
        const productCards = document.querySelectorAll('.product-card');
        const categoryButtons = document.querySelectorAll('.filter-btn');
        let found = false;

        // Resetear filtros activos
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector('.filter-btn[data-category="all"]')?.classList.add('active');

        productCards.forEach(card => {
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const description = card.querySelector('p')?.textContent.toLowerCase() || '';
            const category = card.querySelector('.product-category')?.textContent.toLowerCase() || '';
            const dataCategory = card.getAttribute('data-category') || '';
            
            const isMatch = title.includes(query) || 
                          description.includes(query) || 
                          category.includes(query) ||
                          dataCategory.includes(query);

            if (isMatch) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
                found = true;
            } else {
                card.style.display = 'none';
            }
        });

        showSearchFeedback(found, query);
    }

    // Búsqueda en página de alimentos
    function searchInAlimentos(query) {
        const productCards = document.querySelectorAll('.product-card');
        const categoryButtons = document.querySelectorAll('.filter-btn');
        let found = false;

        // Resetear filtros activos
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector('.filter-btn[data-category="all"]')?.classList.add('active');

        productCards.forEach(card => {
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const description = card.querySelector('p')?.textContent.toLowerCase() || '';
            const category = card.querySelector('.product-category')?.textContent.toLowerCase() || '';
            const dataCategory = card.getAttribute('data-category') || '';
            
            const isMatch = title.includes(query) || 
                          description.includes(query) || 
                          category.includes(query) ||
                          dataCategory.includes(query);

            if (isMatch) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
                found = true;
            } else {
                card.style.display = 'none';
            }
        });

        showSearchFeedback(found, query);
    }

    // Mostrar todos los elementos
    function showAllItems() {
        const cards = document.querySelectorAll('.product-card, .feature-card');
        cards.forEach(card => {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease';
        });
        
        // Remover mensaje de búsqueda si existe
        removeSearchFeedback();
    }

    // Mostrar feedback de búsqueda
    function showSearchFeedback(found, query) {
        removeSearchFeedback();

        const mainContent = document.querySelector('.main-content, .hero-section');
        if (!mainContent) return;

        const feedbackDiv = document.createElement('div');
        feedbackDiv.id = 'search-feedback';
        feedbackDiv.style.cssText = `
            text-align: center;
            padding: 2rem;
            margin: 2rem 0;
            background: ${found ? '#f0f9ff' : '#fef2f2'};
            border: 1px solid ${found ? '#bae6fd' : '#fecaca'};
            border-radius: 12px;
            color: ${found ? '#0369a1' : '#dc2626'};
            font-weight: 500;
        `;

        if (found) {
            feedbackDiv.innerHTML = `
                <i class="fas fa-search" style="margin-right: 0.5rem;"></i>
                Resultados para: "<strong>${query}</strong>"
            `;
        } else {
            feedbackDiv.innerHTML = `
                <i class="fas fa-exclamation-circle" style="margin-right: 0.5rem;"></i>
                No se encontraron resultados para: "<strong>${query}</strong>"
                <br><small style="margin-top: 0.5rem; display: block; opacity: 0.8;">
                    Intenta con palabras diferentes o revisa la ortografía
                </small>
            `;
        }

        mainContent.insertBefore(feedbackDiv, mainContent.firstChild);
    }

    // Remover feedback de búsqueda
    function removeSearchFeedback() {
        const existing = document.getElementById('search-feedback');
        if (existing) {
            existing.remove();
        }
    }

    // Event listeners
    searchBtn.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    
    // Limpiar búsqueda cuando el input esté vacío
    searchInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            showAllItems();
        }
    });

    // Placeholder dinámico según la página
    function setDynamicPlaceholder() {
        const page = detectCurrentPage();
        const placeholders = {
            'index': 'Buscar productos y servicios...',
            'moda': 'Buscar ropa, calzado, accesorios...',
            'alimentos': 'Buscar alimentos, bebidas, snacks...'
        };
        
        if (placeholders[page]) {
            searchInput.placeholder = placeholders[page];
        }
    }

    // Inicializar
    setDynamicPlaceholder();
});