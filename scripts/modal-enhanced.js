// scripts/modal-enhanced.js - полностью доступное модальное окно

console.log('modal-enhanced.js загружен');

class EnhancedModal {
    constructor() {
        this.modal = null;
        this.previousActiveElement = null;
        this.focusableElements = [];
        this.firstFocusableElement = null;
        this.lastFocusableElement = null;
        this.escapeHandler = null;
        this.tabHandler = null;
        this.clickHandler = null;
    }
    
    showSuccess(title, description) {
        this.createModal('success', title, description);
        this.setupAccessibility();
        this.show();
    }
    
    showError(title, description) {
        this.createModal('error', title, description);
        this.setupAccessibility();
        this.show();
    }
    
    createModal(type, title, description) {
        const modalId = 'enhanced-modal';
        const existingModal = document.getElementById(modalId);
        if (existingModal) {
            existingModal.remove();
        }
        
        const icon = type === 'success' ? '✅' : '❌';
        const titleId = 'enhanced-modal-title';
        const descId = 'enhanced-modal-description';
        
        const modalHTML = `
            <div id="${modalId}" 
                 class="project-modal-overlay" 
                 role="dialog" 
                 aria-modal="true" 
                 aria-labelledby="${titleId}"
                 aria-describedby="${descId}"
                 tabindex="-1">
                <div class="project-modal-container">
                    <div class="project-modal-header">
                        <h2 id="${titleId}" class="project-modal-title">${title}</h2>
                        <button class="project-modal-close" 
                                aria-label="Закрыть диалоговое окно"
                                autofocus>
                            &times;
                        </button>
                    </div>
                    
                    <div class="project-modal-body">
                        <div class="project-image-section">
                            <div style="
                                background: ${type === 'success' ? '#28a745' : '#dc3545'};
                                color: white;
                                width: 60px;
                                height: 60px;
                                border-radius: 50%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                margin: 0 auto 20px;
                                font-size: 30px;
                            " aria-hidden="true">${icon}</div>
                        </div>
                        
                        <div class="project-info-section">
                            <p id="${descId}" style="text-align: center; font-size: 16px; line-height: 1.5; color: #333;">
                                ${description}
                            </p>
                        </div>
                    </div>
                    
                    <div class="project-modal-footer">
                        <div class="project-links">
                            <button class="project-link demo-link"
                                    style="min-width: 200px; text-align: center;">
                                Закрыть
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modal = document.getElementById(modalId);
        
        // Добавляем обработчики событий для кнопок
        const closeButton = this.modal.querySelector('.project-modal-close');
        const closeActionButton = this.modal.querySelector('.demo-link');
        
        closeButton.addEventListener('click', () => this.close());
        closeActionButton.addEventListener('click', () => this.close());
    }
    
    setupAccessibility() {
        if (!this.modal) return;
        
        // Запоминаем активный элемент
        this.previousActiveElement = document.activeElement;
        
        // Находим все фокусируемые элементы
        this.focusableElements = this.modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        this.firstFocusableElement = this.focusableElements[0];
        this.lastFocusableElement = this.focusableElements[this.focusableElements.length - 1];
        
        // Скрываем основной контент от скринридеров
        this.hideBackgroundContent();
        
        // Добавляем обработчики
        this.setupEventListeners();
    }
    
    hideBackgroundContent() {
        const mainContent = document.querySelectorAll('body > *:not(#enhanced-modal)');
        mainContent.forEach(el => {
            if (!el.hasAttribute('aria-hidden')) {
                el.setAttribute('aria-hidden', 'true');
            }
        });
    }
    
    showBackgroundContent() {
        const hiddenElements = document.querySelectorAll('[aria-hidden="true"]');
        hiddenElements.forEach(el => {
            if (el.id !== 'enhanced-modal') {
                el.removeAttribute('aria-hidden');
            }
        });
    }
    
    setupEventListeners() {
        // Обработчик Escape
        this.escapeHandler = (e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        };
        
        // Обработчик Tab для захвата фокуса
        this.tabHandler = (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    // Shift + Tab
                    if (document.activeElement === this.firstFocusableElement) {
                        e.preventDefault();
                        this.lastFocusableElement.focus();
                    }
                } else {
                    // Tab
                    if (document.activeElement === this.lastFocusableElement) {
                        e.preventDefault();
                        this.firstFocusableElement.focus();
                    }
                }
            }
        };
        
        // Обработчик клика вне модального окна
        this.clickHandler = (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        };
        
        document.addEventListener('keydown', this.escapeHandler);
        this.modal.addEventListener('keydown', this.tabHandler);
        this.modal.addEventListener('click', this.clickHandler);
    }
    
    show() {
        if (!this.modal) return;
        
        // Блокируем скролл body
        document.body.style.overflow = 'hidden';
        
        // Показываем модальное окно
        this.modal.style.display = 'flex';
        
        // Фокусируемся на модальном окне
        this.modal.focus();
        
        // Анонсируем открытие для скринридеров
        this.announceToScreenReader('Открыто диалоговое окно: ' + 
            document.getElementById('enhanced-modal-title').textContent);
    }
    
    close() {
        if (!this.modal) return;
        
        // Удаляем модальное окно
        this.modal.remove();
        this.modal = null;
        
        // Восстанавливаем видимость основного контента
        this.showBackgroundContent();
        
        // Восстанавливаем скролл
        document.body.style.overflow = '';
        
        // Возвращаем фокус на предыдущий элемент
        if (this.previousActiveElement) {
            this.previousActiveElement.focus();
        }
        
        // Убираем обработчики
        if (this.escapeHandler) {
            document.removeEventListener('keydown', this.escapeHandler);
        }
        if (this.tabHandler) {
            this.modal?.removeEventListener('keydown', this.tabHandler);
        }
        if (this.clickHandler) {
            this.modal?.removeEventListener('click', this.clickHandler);
        }
        
        // Анонсируем закрытие для скринридеров
        this.announceToScreenReader('Диалоговое окно закрыто');
    }
    
    announceToScreenReader(message) {
        let liveRegion = document.getElementById('a11y-announcements');
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.id = 'a11y-announcements';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.className = 'visually-hidden';
            document.body.appendChild(liveRegion);
        }
        
        liveRegion.textContent = message;
        
        setTimeout(() => {
            if (liveRegion && liveRegion.textContent === message) {
                liveRegion.textContent = '';
            }
        }, 3000);
    }
}

// Создаем глобальный экземпляр
const enhancedModal = new EnhancedModal();

// Глобальные функции для обратной совместимости
function showEnhancedSuccessModal() {
    enhancedModal.showSuccess('Сообщение отправлено!', 'Спасибо за ваше сообщение! Я свяжусь с вами в ближайшее время.');
}

function closeEnhancedModal() {
    enhancedModal.close();
}

// Делаем функции глобальными
window.enhancedModal = enhancedModal;
window.showEnhancedSuccessModal = showEnhancedSuccessModal;
window.closeEnhancedModal = closeEnhancedModal;