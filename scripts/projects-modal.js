// scripts/projects-simple.js - упрощенная версия модальных окон

console.log('projects-simple.js загружен');

// Данные о проектах
const projectsData = {
    project1: {
        title: "Личный сайт-портфолио",
        description: "Многостраничный веб-сайт с информацией обо мне, моих навыках и проектах. Адаптивный дизайн, современная верстка.",
        technologies: ["HTML5", "CSS3", "JavaScript", "Адаптивный дизайн"],
        features: ["Главная страница с приветствием", "Страница проектов", "Учебный дневник", "Контактная форма"],
        githubLink: "https://github.com/yourusername/personal-site",
        demoLink: "#"
    },
    project2: {
        title: "Todo-приложение",
        description: "Интерактивное приложение для управления задачами с возможностью добавления, удаления и отметки выполненных задач.",
        technologies: ["JavaScript", "Local Storage", "DOM Manipulation"],
        features: ["Добавление новых задач", "Отметка выполненных задач", "Удаление задач", "Сохранение в Local Storage"],
        githubLink: "https://github.com/yourusername/todo-app",
        demoLink: "#"
    },
    project3: {
        title: "Интернет-магазин",
        description: "Учебный проект интернет-магазина с каталогом товаров, корзиной покупок и системой фильтрации.",
        technologies: ["React", "Node.js", "REST API", "Bootstrap"],
        features: ["Каталог товаров", "Корзина покупок", "Фильтрация по категориям", "Поиск товаров"],
        githubLink: "https://github.com/yourusername/e-commerce",
        demoLink: "#"
    }
};

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    console.log('Инициализация проектов...');
    
    const projectCards = document.querySelectorAll('.project-card');
    console.log('Найдено карточек проектов:', projectCards.length);
    
    projectCards.forEach((card, index) => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            console.log('Клик по проекту:', index + 1);
            showProjectSimple(index + 1);
        });
    });
});

// Показать модальное окно проекта
function showProjectSimple(projectNumber) {
    const project = projectsData[`project${projectNumber}`];
    if (!project) return;
    
    // Создаем простое модальное окно
    const modalHTML = `
        <div id="project-modal-simple" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            padding: 20px;
        ">
            <div style="
                background: white;
                padding: 30px;
                border-radius: 15px;
                max-width: 600px;
                width: 100%;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            ">
                <div style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                    border-bottom: 2px solid #dc3545;
                    padding-bottom: 10px;
                ">
                    <h3 style="margin: 0; color: #dc3545;">${project.title}</h3>
                    <button onclick="closeProjectModal()" style="
                        background: none;
                        border: none;
                        font-size: 24px;
                        cursor: pointer;
                        color: #dc3545;
                    ">&times;</button>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h4 style="color: #333; margin-bottom: 10px;">Описание</h4>
                    <p style="line-height: 1.6; color: #555;">${project.description}</p>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h4 style="color: #333; margin-bottom: 10px;">Технологии</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                        ${project.technologies.map(tech => 
                            `<span style="
                                background: #dc3545; 
                                color: white; 
                                padding: 5px 12px; 
                                border-radius: 15px; 
                                font-size: 14px;
                            ">${tech}</span>`
                        ).join('')}
                    </div>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h4 style="color: #333; margin-bottom: 10px;">Функциональность</h4>
                    <ul style="padding-left: 20px; color: #555;">
                        ${project.features.map(feature => 
                            `<li style="margin-bottom: 5px;">${feature}</li>`
                        ).join('')}
                    </ul>
                </div>
                
                <div style="display: flex; gap: 15px; margin-top: 25px;">
                    <a href="${project.githubLink}" target="_blank" style="
                        flex: 1;
                        background: #333;
                        color: white;
                        padding: 12px;
                        text-align: center;
                        border-radius: 8px;
                        text-decoration: none;
                        font-weight: bold;
                    ">🐙 GitHub</a>
                    <a href="${project.demoLink}" target="_blank" style="
                        flex: 1;
                        background: #dc3545;
                        color: white;
                        padding: 12px;
                        text-align: center;
                        border-radius: 8px;
                        text-decoration: none;
                        font-weight: bold;
                    ">🌐 Демо</a>
                </div>
            </div>
        </div>
    `;
    
    // Удаляем старое модальное окно если есть
    const oldModal = document.getElementById('project-modal-simple');
    if (oldModal) oldModal.remove();
    
    // Добавляем новое модальное окно
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    console.log('Модальное окно проекта показано');
}

// Закрыть модальное окно
function closeProjectModal() {
    const modal = document.getElementById('project-modal-simple');
    if (modal) {
        modal.remove();
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
    const modal = document.getElementById('project-modal-simple');
    if (modal && event.target === modal) {
        closeProjectModal();
    }
});

// Делаем функцию глобальной
window.closeProjectModal = closeProjectModal;