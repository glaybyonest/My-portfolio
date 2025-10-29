// scripts/projects-modal.js - расширенная версия для всех проектов

console.log('projects-modal.js загружен');

// Данные о всех проектах
const projectsData = {
    portfolio: {
        title: "Личный сайт-портфолио",
        description: "Современный адаптивный веб-сайт с информацией о навыках, проектах и контактами. Реализована сложная анимация и полная доступность. Сайт полностью адаптирован под мобильные устройства и использует современные технологии веб-разработки.",
        technologies: ["HTML5", "CSS3", "JavaScript", "Адаптивный дизайн", "Доступность", "Git", "Figma"],
        features: [
            "Главная страница с приветствием и навыками",
            "Страница проектов с фильтрацией", 
            "Учебный дневник с прогрессом",
            "Контактная форма с валидацией",
            "Адаптивный дизайн для всех устройств",
            "Оптимизированная производительность",
            "Семантическая верстка",
            "Плавные анимации и переходы"
        ],
        githubLink: "https://github.com/glaybyonest/portfolio",
        demoLink: "../index.html",
        status: "Завершен",
        duration: "2 недели",
        image: "../images/projects/portfolio-screenshot.jpg"
    },
    todo: {
        title: "Todo-приложение",
        description: "Продуктивное приложение для управления задачами с возможностью создания, редактирования, удаления и фильтрации задач. Данные сохраняются в Local Storage, что позволяет не терять задачи при перезагрузке страницы.",
        technologies: ["JavaScript", "Local Storage", "DOM API", "CSS Grid", "ES6+", "Responsive Design"],
        features: [
            "Добавление новых задач",
            "Отметка выполненных задач",
            "Удаление задач",
            "Фильтрация по статусу (все/активные/выполненные)",
            "Сохранение в Local Storage",
            "Адаптивный интерфейс",
            "Валидация ввода",
            "Счетчик оставшихся задач"
        ],
        githubLink: "https://github.com/glaybyonest/todo-app",
        demoLink: "#",
        status: "Завершен", 
        duration: "1 неделя",
        image: "../images/projects/todo-app-screenshot.jpg"
    },
    ecommerce: {
        title: "Интернет-магазин",
        description: "Полнофункциональный интернет-магазин с системой управления товарами, корзиной покупок, пользовательскими отзывами и системой фильтрации. Реализована панель администратора для управления товарами и заказами.",
        technologies: ["React", "Node.js", "MongoDB", "REST API", "JWT", "Bootstrap", "Express.js"],
        features: [
            "Каталог товаров с категориями",
            "Корзина покупок",
            "Фильтрация по категориям и цене",
            "Поиск товаров",
            "Система отзывов и рейтингов",
            "Панель администратора",
            "Система заказов",
            "История покупок"
        ],
        githubLink: "https://github.com/glaybyonest/e-commerce",
        demoLink: "#",
        status: "В разработке",
        duration: "4 недели",
        image: "../images/projects/ecommerce-screenshot.jpg"
    },
    api: {
        title: "REST API Сервис",
        description: "Масштабируемый REST API для управления пользователями и контентом. Реализована аутентификация, авторизация, валидация данных и документация Swagger. API поддерживает CRUD операции и пагинацию.",
        technologies: ["Node.js", "Express", "PostgreSQL", "JWT", "Swagger", "REST API", "Docker"],
        features: [
            "Аутентификация и авторизация",
            "CRUD операции для сущностей",
            "Валидация данных",
            "Документация Swagger",
            "Пагинация результатов",
            "Поиск и фильтрация",
            "Логирование запросов",
            "Тестирование API"
        ],
        githubLink: "https://github.com/glaybyonest/rest-api",
        demoLink: "#",
        status: "Завершен",
        duration: "3 недели",
        image: "../images/projects/api-service.jpg"
    },
    weather: {
        title: "Погодное приложение",
        description: "Интерактивное приложение для просмотра текущей погоды и прогноза на 5 дней. Интеграция с OpenWeather API, геолокация и адаптивный дизайн. Приложение показывает подробную информацию о погодных условиях.",
        technologies: ["React", "API Integration", "Geolocation API", "Responsive Design", "CSS Modules", "Axios"],
        features: [
            "Текущая погода с деталями",
            "Прогноз на 5 дней",
            "Поиск по городам",
            "Автоматическая геолокация",
            "Адаптивный дизайн",
            "Интерактивные графики температуры",
            "Смена единиц измерения",
            "Офлайн-режим"
        ],
        githubLink: "https://github.com/glaybyonest/weather-app",
        demoLink: "#",
        status: "Завершен",
        duration: "2 недели",
        image: "../images/projects/weather-app.jpg"
    },
    chat: {
        title: "Чат приложение",
        description: "Real-time чат приложение с комнатами, приватными сообщениями и уведомлениями. WebSocket соединение для мгновенной доставки сообщений. Возможность создания комнат и приглашения пользователей.",
        technologies: ["Vue.js", "Socket.io", "Node.js", "MongoDB", "WebSockets", "JWT", "Vuex"],
        features: [
            "Real-time обмен сообщениями",
            "Приватные и групповые комнаты",
            "Уведомления о новых сообщениях",
            "История сообщений",
            "Приглашения пользователей",
            "Адаптивный дизайн",
            "Темная тема",
            "Загрузка файлов"
        ],
        githubLink: "https://github.com/glaybyonest/chat-app",
        demoLink: "#",
        status: "В разработке",
        duration: "5 недель",
        image: "../images/projects/chat-app.jpg"
    }
};

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    console.log('Инициализация модальных окон проектов...');
    
    // Находим все карточки проектов
    const projectCards = document.querySelectorAll('.gallery-item');
    console.log('Найдено карточек проектов:', projectCards.length);
    
    projectCards.forEach((card) => {
        card.addEventListener('click', function(e) {
            // Проверяем, что клик не по кнопке внутри карточки
            if (!e.target.closest('.project-link')) {
                const projectId = this.getAttribute('data-project');
                console.log('Клик по проекту:', projectId);
                showProjectModal(projectId);
            }
        });
    });

    // Обработчики для кнопок "Смотреть проект"
    const viewButtons = document.querySelectorAll('.view-project-btn');
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Останавливаем всплытие
            const projectId = this.getAttribute('data-project');
            console.log('Клик по кнопке проекта:', projectId);
            showProjectModal(projectId);
        });
    });
});

// Показать модальное окно проекта
function showProjectModal(projectId) {
    const project = projectsData[projectId];
    if (!project) {
        console.error('Проект не найден:', projectId);
        return;
    }
    
    // Создаем расширенное модальное окно
    const modalHTML = `
        <div id="project-modal" class="project-modal-overlay">
            <div class="project-modal-container">
                <div class="project-modal-header">
                    <h2 class="project-modal-title">${project.title}</h2>
                    <button class="project-modal-close" onclick="closeProjectModal()" aria-label="Закрыть">
                        &times;
                    </button>
                </div>
                
                <div class="project-modal-body">
                    <div class="project-image-section">
                        <img src="${project.image}" alt="${project.title}" class="project-modal-image" loading="lazy">
                    </div>
                    
                    <div class="project-info-section">
                        <div class="project-meta-info">
                            <div class="project-status">
                                <strong>Статус:</strong>
                                <span class="status-badge status-${project.status === 'Завершен' ? 'completed' : 'in-progress'}">
                                    ${project.status}
                                </span>
                            </div>
                            <div class="project-duration">
                                <strong>Длительность:</strong>
                                <span>${project.duration}</span>
                            </div>
                        </div>
                        
                        <div class="project-description-section">
                            <h3>Описание проекта</h3>
                            <p>${project.description}</p>
                        </div>
                        
                        <div class="project-technologies">
                            <h3>Использованные технологии</h3>
                            <div class="tech-tags">
                                ${project.technologies.map(tech => 
                                    `<span class="tech-tag">${tech}</span>`
                                ).join('')}
                            </div>
                        </div>
                        
                        <div class="project-features">
                            <h3>Основные функции</h3>
                            <ul class="features-list">
                                ${project.features.map(feature => 
                                    `<li>${feature}</li>`
                                ).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="project-modal-footer">
                    <div class="project-links">
                        <a href="${project.githubLink}" target="_blank" rel="noopener" class="project-link github-link">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                            </svg>
                            Исходный код
                        </a>
                        <a href="${project.demoLink}" target="_blank" rel="noopener" class="project-link demo-link">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M10.5 8a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"/>
                            </svg>
                            Посмотреть демо
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Удаляем старое модальное окно если есть
    const oldModal = document.getElementById('project-modal');
    if (oldModal) oldModal.remove();
    
    // Добавляем новое модальное окно
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Блокируем скролл body
    document.body.style.overflow = 'hidden';
    
    console.log('Модальное окно проекта показано:', project.title);
}

// Закрыть модальное окно
function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.remove();
        // Восстанавливаем скролл
        document.body.style.overflow = '';
        console.log('Модальное окно закрыто');
    }
}

// Закрытие по ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeProjectModal();
    }
});

// Закрытие при клике вне окна
document.addEventListener('click', function(event) {
    const modal = document.getElementById('project-modal');
    if (modal && event.target === modal) {
        closeProjectModal();
    }
});

// Делаем функцию глобальной
window.closeProjectModal = closeProjectModal;
window.showProjectModal = showProjectModal;