// scripts/diary-enhanced.js - упрощенная версия с улучшенной доступностью

console.log('diary-enhanced.js загружен');

// Массив для хранения записей
let diaryEntries = [];

// Инициализация после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('Инициализация улучшенного дневника...');
    
    // Загружаем записи
    loadEntries();
    
    // Отображаем записи
    renderEntries();
    
    // Находим кнопку добавления записи
    const addButton = document.querySelector('.add-entry-btn');
    if (addButton) {
        addButton.addEventListener('click', showEnhancedAddForm);
        addButton.setAttribute('aria-label', 'Добавить новую запись в дневник');
    }
    
    // Улучшаем доступность существующей таблицы
    enhanceTableAccessibility();
});

// Загрузка записей из localStorage
function loadEntries() {
    try {
        const saved = localStorage.getItem('diaryEntries');
        if (saved) {
            diaryEntries = JSON.parse(saved);
            console.log('Загружено записей:', diaryEntries.length);
        } else {
            // Начальные данные с улучшенной доступностью
            diaryEntries = [
                { 
                    id: 1, 
                    date: '15 дек', 
                    text: 'Верстка макета сайта', 
                    status: 'completed',
                    fullDate: '15 декабря 2024 года'
                },
                { 
                    id: 2, 
                    date: '10 дек', 
                    text: 'JavaScript основы', 
                    status: 'completed',
                    fullDate: '10 декабря 2024 года'
                },
                { 
                    id: 3, 
                    date: '05 дек', 
                    text: 'Работа с формами', 
                    status: 'in-progress',
                    fullDate: '05 декабря 2024 года'
                },
                { 
                    id: 4, 
                    date: '01 дек', 
                    text: 'Адаптивный дизайн', 
                    status: 'in-progress',
                    fullDate: '01 декабря 2024 года'
                }
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

// Улучшение доступности таблицы
function enhanceTableAccessibility() {
    const table = document.querySelector('.progress-table');
    if (!table) return;
    
    // Добавляем описание для скринридеров
    table.setAttribute('aria-describedby', 'table-description');
    
    // Создаем описание если его нет
    if (!document.getElementById('table-description')) {
        const description = document.createElement('div');
        description.id = 'table-description';
        description.className = 'sr-only';
        description.textContent = 'Таблица учебного прогресса с записями о пройденных темах и их статусе';
        table.parentNode.insertBefore(description, table);
    }
    
    // Добавляем ARIA-атрибуты к строкам
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach((row, index) => {
        row.setAttribute('aria-rowindex', index + 2);
        row.setAttribute('role', 'row');
    });
}

// Отображение записей с улучшенной доступностью
function renderEntries() {
    const container = document.querySelector('.progress-list');
    if (!container) return;
    
    container.innerHTML = '';
    container.setAttribute('role', 'list');
    container.setAttribute('aria-label', 'Список учебных записей');
    
    if (diaryEntries.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'empty-state';
        emptyMessage.innerHTML = `
            <p role="status" aria-live="polite">Записей пока нет. Добавьте первую запись!</p>
        `;
        container.appendChild(emptyMessage);
        return;
    }
    
    diaryEntries.forEach((entry, index) => {
        const entryElement = document.createElement('div');
        entryElement.className = `progress-item ${entry.status}`;
        entryElement.setAttribute('role', 'listitem');
        entryElement.setAttribute('aria-posinset', index + 1);
        entryElement.setAttribute('aria-setsize', diaryEntries.length);
        
        const statusText = getStatusText(entry.status);
        const statusSymbol = getStatusSymbol(entry.status);
        
        entryElement.innerHTML = `
            <span class="entry-content">
                <span class="entry-date" aria-label="${entry.fullDate || entry.date}">${entry.date}</span>
                <span class="entry-text"> - ${entry.text}</span>
            </span>
            <span class="status" aria-label="${statusText}">${statusSymbol}</span>
            <button class="delete-btn" 
                    onclick="deleteEntry(${entry.id})" 
                    aria-label="Удалить запись: ${entry.text}">
                ×
            </button>
        `;
        container.appendChild(entryElement);
    });
    
    // Объявляем количество записей для скринридеров
    announceToScreenReader(`Загружено ${diaryEntries.length} записей`);
}

// Получение текстового описания статуса
function getStatusText(status) {
    switch (status) {
        case 'completed': return 'Завершено';
        case 'in-progress': return 'В процессе выполнения';
        case 'planned': return 'Запланировано';
        default: return 'Не начато';
    }
}

// Получение символа статуса
function getStatusSymbol(status) {
    switch (status) {
        case 'completed': return '✓';
        case 'in-progress': return '⟳';
        case 'planned': return '○';
        default: return '○';
    }
}

// Показ улучшенной формы добавления
function showEnhancedAddForm() {
    // Создаем доступное модальное окно
    const modalHTML = `
        <div id="diary-modal" 
             class="project-modal-overlay" 
             role="dialog" 
             aria-modal="true" 
             aria-labelledby="diary-modal-title"
             aria-describedby="diary-modal-description">
            <div class="project-modal-container">
                <div class="project-modal-header">
                    <h2 id="diary-modal-title" class="project-modal-title">Добавить учебную запись</h2>
                    <button class="project-modal-close" 
                            onclick="closeEnhancedDiaryModal()" 
                            aria-label="Закрыть диалоговое окно добавления записи">
                        &times;
                    </button>
                </div>
                
                <div class="project-modal-body">
                    <form id="diary-form" role="form" aria-labelledby="diary-modal-title">
                        <div class="form-group">
                            <label for="new-entry-date" class="form-label">
                                Дата изучения <span class="required-asterisk" aria-hidden="true">*</span>
                                <span class="sr-only">обязательное поле</span>
                            </label>
                            <input type="date" 
                                   id="new-entry-date" 
                                   required
                                   aria-required="true"
                                   aria-describedby="date-help">
                            <div id="date-help" class="help-text">Выберите дату, когда вы изучали тему</div>
                        </div>
                        
                        <div class="form-group">
                            <label for="new-entry-text" class="form-label">
                                Описание темы <span class="required-asterisk" aria-hidden="true">*</span>
                                <span class="sr-only">обязательное поле</span>
                            </label>
                            <textarea id="new-entry-text" 
                                      required
                                      aria-required="true"
                                      aria-describedby="text-help"
                                      placeholder="Что вы изучали? Например: JavaScript функции, React хуки, CSS Grid"
                                      rows="3"></textarea>
                            <div id="text-help" class="help-text">Опишите тему или технологию, которую вы изучали</div>
                        </div>
                        
                        <div class="form-group">
                            <label for="new-entry-status" class="form-label">
                                Статус изучения <span class="required-asterisk" aria-hidden="true">*</span>
                                <span class="sr-only">обязательное поле</span>
                            </label>
                            <select id="new-entry-status" 
                                    required
                                    aria-required="true"
                                    aria-describedby="status-help">
                                <option value="">Выберите статус</option>
                                <option value="planned">Запланировано</option>
                                <option value="in-progress">В процессе</option>
                                <option value="completed">Выполнено</option>
                            </select>
                            <div id="status-help" class="help-text">Укажите текущий прогресс изучения темы</div>
                        </div>
                    </form>
                </div>
                
                <div class="project-modal-footer">
                    <div class="project-links">
                        <button onclick="closeEnhancedDiaryModal()" 
                                class="project-link"
                                style="background: #6c757d;">
                            Отмена
                        </button>
                        <button onclick="addEnhancedNewEntry()" 
                                class="project-link demo-link">
                            Добавить запись
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Устанавливаем сегодняшнюю дату по умолчанию
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('new-entry-date').value = today;
    
    // Настраиваем доступность
    setupDiaryModalAccessibility();
}

function setupDiaryModalAccessibility() {
    const modal = document.getElementById('diary-modal');
    if (!modal) return;
    
    // Запоминаем активный элемент
    window.previousDiaryActiveElement = document.activeElement;
    
    // Блокируем скролл body
    document.body.style.overflow = 'hidden';
    
    // Фокусируемся на модальном окне
    modal.focus();
    
    // Добавляем обработчики
    document.addEventListener('keydown', handleDiaryModalEscape);
    
    // Захватываем фокус внутри модального окна
    trapDiaryModalFocus();
}

function trapDiaryModalFocus() {
    const modal = document.getElementById('diary-modal');
    if (!modal) return;
    
    const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    modal.addEventListener('keydown', function(event) {
        if (event.key === 'Tab') {
            if (event.shiftKey) {
                if (document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });
}

function handleDiaryModalEscape(event) {
    if (event.key === 'Escape') {
        closeEnhancedDiaryModal();
    }
}

function closeEnhancedDiaryModal() {
    const modal = document.getElementById('diary-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleDiaryModalEscape);
        
        if (window.previousDiaryActiveElement) {
            window.previousDiaryActiveElement.focus();
        }
    }
}

// Добавление новой записи с улучшенной валидацией
function addEnhancedNewEntry() {
    const dateInput = document.getElementById('new-entry-date');
    const textInput = document.getElementById('new-entry-text');
    const statusInput = document.getElementById('new-entry-status');
    
    const date = dateInput.value;
    const text = textInput.value.trim();
    const status = statusInput.value;
    
    // Валидация
    let isValid = true;
    
    if (!date) {
        showFieldError(dateInput, 'Пожалуйста, выберите дату');
        isValid = false;
    } else {
        clearFieldError(dateInput);
    }
    
    if (!text) {
        showFieldError(textInput, 'Пожалуйста, введите описание');
        isValid = false;
    } else {
        clearFieldError(textInput);
    }
    
    if (!status) {
        showFieldError(statusInput, 'Пожалуйста, выберите статус');
        isValid = false;
    } else {
        clearFieldError(statusInput);
    }
    
    if (!isValid) {
        announceToScreenReader('Обнаружены ошибки в форме. Исправьте их перед добавлением записи.', 'assertive');
        
        // Фокусируемся на первом поле с ошибкой
        const firstError = document.querySelector('[aria-invalid="true"]');
        if (firstError) {
            firstError.focus();
        }
        return;
    }
    
    // Форматируем дату
    const formattedDate = formatDate(date);
    const fullDate = formatFullDate(date);
    
    // Создаем новую запись
    const newEntry = {
        id: Date.now(),
        date: formattedDate,
        text: text,
        status: status,
        fullDate: fullDate
    };
    
    // Добавляем в массив
    diaryEntries.unshift(newEntry);
    
    // Сохраняем и обновляем
    saveEntries();
    renderEntries();
    closeEnhancedDiaryModal();
    
    // Показываем уведомление
    showEnhancedNotification('Запись успешно добавлена в дневник!');
    announceToScreenReader(`Добавлена новая запись: ${text}. Статус: ${getStatusText(status)}`);
}

function showFieldError(field, message) {
    field.style.borderColor = '#dc3545';
    field.setAttribute('aria-invalid', 'true');
    
    // Создаем или обновляем сообщение об ошибке
    let errorElement = field.parentNode.querySelector('.field-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'field-error error-message';
        field.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearFieldError(field) {
    field.style.borderColor = '';
    field.removeAttribute('aria-invalid');
    
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

// Форматирование даты
function formatDate(dateString) {
    const date = new Date(dateString);
    const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
    const day = date.getDate();
    const month = months[date.getMonth()];
    return `${day} ${month}`;
}

function formatFullDate(dateString) {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDate('ru-RU', options);
}

// Удаление записи с подтверждением
function deleteEntry(id) {
    const entry = diaryEntries.find(e => e.id === id);
    if (!entry) return;
    
    if (confirm(`Удалить запись "${entry.text}"?`)) {
        diaryEntries = diaryEntries.filter(entry => entry.id !== id);
        saveEntries();
        renderEntries();
        showEnhancedNotification('Запись удалена из дневника');
        announceToScreenReader(`Запись "${entry.text}" удалена`);
    }
}

// Показать улучшенное уведомление
function showEnhancedNotification(message) {
    const notification = document.createElement('div');
    notification.setAttribute('role', 'status');
    notification.setAttribute('aria-live', 'polite');
    notification.setAttribute('aria-atomic', 'true');
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
            animation: slideInUp 0.3s ease-out;
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

// Функция для объявлений скринридеру
function announceToScreenReader(message, priority = 'polite') {
    let liveRegion = document.getElementById('diary-announcements');
    if (!liveRegion) {
        liveRegion = document.createElement('div');
        liveRegion.id = 'diary-announcements';
        liveRegion.setAttribute('aria-live', priority);
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        document.body.appendChild(liveRegion);
    }
    
    liveRegion.textContent = message;
    
    setTimeout(() => {
        liveRegion.textContent = '';
    }, 3000);
}

// Делаем функции глобальными для работы из HTML
window.closeEnhancedDiaryModal = closeEnhancedDiaryModal;
window.addEnhancedNewEntry = addEnhancedNewEntry;
window.deleteEntry = deleteEntry;

// Добавляем стили для улучшенного дневника
const diaryStyles = `
    @keyframes slideInUp {
        from {
            transform: translateY(100%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .progress-item {
        position: relative;
        padding-right: 60px;
    }
    
    .entry-content {
        display: block;
    }
    
    .entry-date {
        font-weight: bold;
    }
    
    .empty-state {
        text-align: center;
        padding: 2rem;
        color: #6c757d;
        font-style: italic;
    }
    
    .field-error {
        margin-top: 0.25rem;
    }
`;

if (!document.getElementById('diary-enhanced-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'diary-enhanced-styles';
    styleSheet.textContent = diaryStyles;
    document.head.appendChild(styleSheet);
}