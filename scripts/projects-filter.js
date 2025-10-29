// scripts/projects-filter.js - фильтрация проектов

console.log('projects-filter.js загружен');

document.addEventListener('DOMContentLoaded', function() {
    console.log('Инициализация фильтров проектов...');
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length === 0 || galleryItems.length === 0) {
        console.log('Фильтры или проекты не найдены');
        return;
    }
    
    // Обработчики для кнопок фильтров
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Обновляем активную кнопку
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Фильтруем проекты
            filterProjects(filter);
        });
    });
    
    function filterProjects(filter) {
        console.log('Применяем фильтр:', filter);
        
        galleryItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
                // Анимация появления
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                // Анимация скрытия
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
        
        // Показываем сообщение если нет проектов
        showNoProjectsMessage(filter);
    }
    
    function showNoProjectsMessage(filter) {
        // Удаляем существующие сообщения
        const existingMessage = document.querySelector('.no-projects-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Проверяем есть ли видимые проекты
        const visibleProjects = Array.from(galleryItems).filter(item => 
            item.style.display !== 'none'
        );
        
        if (visibleProjects.length === 0 && filter !== 'all') {
            const message = document.createElement('div');
            message.className = 'no-projects-message';
            message.innerHTML = `
                <div style="
                    text-align: center;
                    padding: 3rem;
                    background: #f8f9fa;
                    border-radius: 12px;
                    border: 2px dashed #dee2e6;
                    margin: 2rem 0;
                ">
                    <h3 style="color: #6c757d; margin-bottom: 1rem;">Проекты не найдены</h3>
                    <p style="color: #6c757d;">В категории "${getFilterName(filter)}" пока нет проектов.</p>
                    <button onclick="resetFilters()" style="
                        margin-top: 1rem;
                        padding: 0.5rem 1.5rem;
                        background: #dc3545;
                        color: white;
                        border: none;
                        border-radius: 25px;
                        cursor: pointer;
                    ">Показать все проекты</button>
                </div>
            `;
            
            const gallery = document.querySelector('.projects-gallery');
            if (gallery) {
                gallery.parentNode.insertBefore(message, gallery.nextSibling);
            }
        }
    }
    
    function getFilterName(filter) {
        const names = {
            'all': 'Все',
            'frontend': 'Frontend',
            'backend': 'Backend',
            'fullstack': 'Fullstack'
        };
        return names[filter] || filter;
    }
    
    // Глобальная функция для сброса фильтров
    window.resetFilters = function() {
        filterButtons.forEach(btn => {
            if (btn.getAttribute('data-filter') === 'all') {
                btn.click();
            }
        });
    };
    
    console.log('Фильтры проектов инициализированы');
});

// Добавляем стили для фильтров
const filterStyles = `
    .no-projects-message {
        animation: fadeIn 0.5s ease-in;
    }
    
    .gallery-item {
        transition: all 0.3s ease;
    }
    
    .tech-tag {
        display: inline-block;
        background: rgba(255, 255, 255, 0.2);
        color: white;
        padding: 0.2rem 0.6rem;
        border-radius: 12px;
        font-size: 0.8rem;
        margin-right: 0.3rem;
        margin-top: 0.5rem;
    }
    
    .projects-stats {
        margin-top: 4rem;
        padding: 2rem;
        background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
        border-radius: 15px;
        border: 1px solid #e9ecef;
    }
    
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1.5rem;
        margin-top: 1.5rem;
    }
    
    .stat-item {
        text-align: center;
        padding: 1.5rem;
        background: white;
        border-radius: 12px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        transition: all 0.3s ease;
    }
    
    .stat-item:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    }
    
    .stat-number {
        font-size: 2rem;
        font-weight: bold;
        color: #dc3545;
        margin-bottom: 0.5rem;
    }
    
    .stat-label {
        color: #666;
        font-size: 0.9rem;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    /* Адаптивность для статистики */
    @media (max-width: 768px) {
        .stats-grid {
            grid-template-columns: repeat(2, 1fr);
        }
        
        .stat-number {
            font-size: 1.5rem;
        }
    }
    
    @media (max-width: 480px) {
        .stats-grid {
            grid-template-columns: 1fr;
        }
    }
`;

// Добавляем стили в документ
if (!document.getElementById('filter-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'filter-styles';
    styleSheet.textContent = filterStyles;
    document.head.appendChild(styleSheet);
}