// scripts/modal.js - доступное модальное окно

console.log('modal.js загружен');

let previousActiveElement = null;

// Функция для показа доступного модального окна
function showSuccessModal() {
    console.log('Показываем доступное модальное окно...');
    
    // Запоминаем активный элемент для возврата фокуса
    previousActiveElement = document.activeElement;
    
    // Создаем HTML для доступного модального окна
    const modalHTML = `
        <div id="success-modal" 
             class="project-modal-overlay" 
             role="dialog" 
             aria-modal="true" 
             aria-labelledby="modal-title"
             aria-describedby="modal-description">
            <div class="project-modal-container">
                <div class="project-modal-header">
                    <h2 id="modal-title" class="project-modal-title">Сообщение отправлено!</h2>
                    <button class="project-modal-close" 
                            onclick="closeSuccessModal()" 
                            aria-label="Закрыть диалоговое окно">
                        &times;
                    </button>
                </div>
                
                <div class="project-modal-body">
                    <div class="project-image-section">
                        <div style="
                            background: #dc3545;
                            color: white;
                            width: 60px;
                            height: 60px;
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin: 0 auto 20px;
                            font-size: 30px;
                        " aria-hidden="true">✓</div>
                    </div>
                    
                    <div class="project-info-section">
                        <p id="modal-description" style="text-align: center; font-size: 16px; line-height: 1.5; color: #333;">
                            Спасибо за ваше сообщение! Я свяжусь с вами в ближайшее время.
                        </p>
                    </div>
                </div>
                
                <div class="project-modal-footer">
                    <div class="project-links">
                        <button onclick="closeSuccessModal()" 
                                class="project-link demo-link"
                                autofocus
                                style="min-width: 200px; text-align: center;">
                            Закрыть
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Добавляем модальное окно на страницу
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Скрываем основной контент от скринридера
    document.querySelectorAll('body > *:not(#success-modal)')
        .forEach(el => {
            if (!el.hasAttribute('aria-hidden')) {
                el.setAttribute('aria-hidden', 'true');
            }
        });
    
    // Блокируем скролл body
    document.body.style.overflow = 'hidden';
    
    // Фокусируемся на модальном окне
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.focus();
    }
    
    // Добавляем обработчик Escape
    document.addEventListener('keydown', handleModalEscape);
    
    // Захватываем фокус внутри модального окна
    trapModalFocus();
    
    console.log('Доступное модальное окно показано');
}

// Функция для захвата фокуса внутри модального окна
function trapModalFocus() {
    const modal = document.getElementById('success-modal');
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
                // Shift + Tab
                if (document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement.focus();
                }
            } else {
                // Tab
                if (document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });
}

// Обработчик клавиши Escape для модального окна
function handleModalEscape(event) {
    if (event.key === 'Escape') {
        closeSuccessModal();
    }
}

// Функция для закрытия модального окна
function closeSuccessModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.remove();
        
        // Восстанавливаем видимость основного контента для скринридера
        document.querySelectorAll('[aria-hidden="true"]')
            .forEach(el => el.removeAttribute('aria-hidden'));
        
        // Восстанавливаем скролл
        document.body.style.overflow = '';
        
        // Возвращаем фокус на предыдущий элемент
        if (previousActiveElement) {
            previousActiveElement.focus();
        }
        
        // Убираем обработчик Escape
        document.removeEventListener('keydown', handleModalEscape);
        
        console.log('Доступное модальное окно закрыто');
    }
}

// Закрытие модального окна при клике вне его
document.addEventListener('click', function(event) {
    const modal = document.getElementById('success-modal');
    if (modal && event.target === modal) {
        closeSuccessModal();
    }
});