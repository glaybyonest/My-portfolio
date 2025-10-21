// scripts/diary-simple.js - упрощенная версия без зависаний

console.log('diary-simple.js загружен');

// Массив для хранения записей
let diaryEntries = [];

// Инициализация после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('Инициализация дневника...');
    
    // Загружаем записи
    loadEntries();
    
    // Отображаем записи
    renderEntries();
    
    // Находим кнопку добавления записи
    const addButton = document.querySelector('.add-entry-btn');
    if (addButton) {
        addButton.addEventListener('click', showAddForm);
    }
});

// Загрузка записей из localStorage
function loadEntries() {
    try {
        const saved = localStorage.getItem('diaryEntries');
        if (saved) {
            diaryEntries = JSON.parse(saved);
            console.log('Загружено записей:', diaryEntries.length);
        } else {
            // Начальные данные
            diaryEntries = [
                { id: 1, date: '15 дек', text: 'Верстка макета сайта', status: 'completed' },
                { id: 2, date: '10 дек', text: 'JavaScript основы', status: 'completed' },
                { id: 3, date: '05 дек', text: 'Работа с формами', status: 'in-progress' },
                { id: 4, date: '01 дек', text: 'Адаптивный дизайн', status: 'in-progress' }
            ];
        }
    } catch (error) {
        console.error('Ошибка загрузки:', error);
        diaryEntries = [];
    }
}

// Сохранение записей в localStorage
function saveEntries() {
    try {
        localStorage.setItem('diaryEntries', JSON.stringify(diaryEntries));
    } catch (error) {
        console.error('Ошибка сохранения:', error);
    }
}

// Отображение записей
function renderEntries() {
    const container = document.querySelector('.progress-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    diaryEntries.forEach(entry => {
        const entryElement = document.createElement('div');
        entryElement.className = `progress-item ${entry.status}`;
        entryElement.innerHTML = `
            <span>${entry.date} - ${entry.text}</span>
            <span class="status">${getStatusSymbol(entry.status)}</span>
            <button class="delete-btn" onclick="deleteEntry(${entry.id})">×</button>
        `;
        container.appendChild(entryElement);
    });
}

// Получение символа статуса
function getStatusSymbol(status) {
    switch (status) {
        case 'completed': return '✓';
        case 'in-progress': return 'in progress';
        default: return '○';
    }
}

// Показ формы добавления
function showAddForm() {
    // Создаем простое модальное окно
    const modalHTML = `
        <div id="diary-modal" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        ">
            <div style="
                background: white;
                padding: 2rem;
                border-radius: 10px;
                max-width: 500px;
                width: 90%;
                box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            ">
                <h3 style="margin-top: 0; color: #dc3545;">Добавить запись</h3>
                
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Дата:</label>
                    <input type="date" id="new-entry-date" style="
                        width: 100%;
                        padding: 0.5rem;
                        border: 1px solid #ddd;
                        border-radius: 4px;
                    ">
                </div>
                
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Описание:</label>
                    <textarea id="new-entry-text" style="
                        width: 100%;
                        padding: 0.5rem;
                        border: 1px solid #ddd;
                        border-radius: 4px;
                        min-height: 80px;
                    " placeholder="Что вы изучаете?"></textarea>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Статус:</label>
                    <select id="new-entry-status" style="
                        width: 100%;
                        padding: 0.5rem;
                        border: 1px solid #ddd;
                        border-radius: 4px;
                    ">
                        <option value="planned">Запланировано</option>
                        <option value="in-progress">В процессе</option>
                        <option value="completed">Выполнено</option>
                    </select>
                </div>
                
                <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                    <button onclick="closeModal()" style="
                        padding: 0.5rem 1rem;
                        background: #6c757d;
                        color: white;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                    ">Отмена</button>
                    <button onclick="addNewEntry()" style="
                        padding: 0.5rem 1rem;
                        background: #dc3545;
                        color: white;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                    ">Добавить</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Устанавливаем сегодняшнюю дату по умолчанию
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('new-entry-date').value = today;
}

// Закрытие модального окна
function closeModal() {
    const modal = document.getElementById('diary-modal');
    if (modal) {
        modal.remove();
    }
}

// Добавление новой записи
function addNewEntry() {
    const dateInput = document.getElementById('new-entry-date');
    const textInput = document.getElementById('new-entry-text');
    const statusInput = document.getElementById('new-entry-status');
    
    const date = dateInput.value;
    const text = textInput.value.trim();
    const status = statusInput.value;
    
    // Простая валидация
    if (!date) {
        alert('Пожалуйста, выберите дату');
        return;
    }
    
    if (!text) {
        alert('Пожалуйста, введите описание');
        return;
    }
    
    // Форматируем дату
    const formattedDate = formatDate(date);
    
    // Создаем новую запись
    const newEntry = {
        id: Date.now(),
        date: formattedDate,
        text: text,
        status: status
    };
    
    // Добавляем в массив
    diaryEntries.unshift(newEntry); // Добавляем в начало
    
    // Сохраняем и обновляем
    saveEntries();
    renderEntries();
    closeModal();
    
    // Показываем уведомление
    showNotification('Запись успешно добавлена!');
}

// Форматирование даты
function formatDate(dateString) {
    const date = new Date(dateString);
    const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
    const day = date.getDate();
    const month = months[date.getMonth()];
    return `${day} ${month}`;
}

// Удаление записи
function deleteEntry(id) {
    if (confirm('Удалить эту запись?')) {
        diaryEntries = diaryEntries.filter(entry => entry.id !== id);
        saveEntries();
        renderEntries();
        showNotification('Запись удалена');
    }
}

// Показать уведомление
function showNotification(message) {
    const notification = document.createElement('div');
    notification.innerHTML = `
        <div style="
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            z-index: 10001;
        ">
            ${message}
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}

// Делаем функции глобальными для работы из HTML
window.closeModal = closeModal;
window.addNewEntry = addNewEntry;
window.deleteEntry = deleteEntry;