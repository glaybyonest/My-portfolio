// scripts/contact-form-enhanced.js - улучшенная версия с полной доступностью

console.log('contact-form-enhanced.js загружен');

class EnhancedContactForm {
    constructor() {
        this.form = null;
        this.fields = {};
        this.liveRegion = null;
        this.isSubmitting = false;
        this.init();
    }
    
    init() {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('Инициализируем улучшенную форму с полной доступностью...');
            
            this.form = document.getElementById('contact-form');
            if (!this.form) {
                console.error('Форма не найдена');
                return;
            }
            
            this.createLiveRegion();
            this.initializeFields();
            this.setupEnhancedEventListeners();
            this.setupCharacterCounter();
            this.enhanceFormAccessibility();
            
            console.log('Улучшенная форма с полной доступностью инициализирована');
        });
    }
    
    createLiveRegion() {
        // Удаляем старые регионы если есть
        const oldRegion = document.getElementById('form-live-region');
        if (oldRegion) oldRegion.remove();
        
        this.liveRegion = document.createElement('div');
        this.liveRegion.id = 'form-live-region';
        this.liveRegion.setAttribute('aria-live', 'assertive');
        this.liveRegion.setAttribute('aria-atomic', 'true');
        this.liveRegion.className = 'visually-hidden';
        document.body.appendChild(this.liveRegion);
    }
    
    announceToScreenReader(message, priority = 'polite') {
        if (this.liveRegion) {
            this.liveRegion.setAttribute('aria-live', priority);
            this.liveRegion.textContent = message;
            
            // Очищаем сообщение через 3 секунды
            setTimeout(() => {
                if (this.liveRegion) {
                    this.liveRegion.textContent = '';
                }
            }, 3000);
        }
    }
    
    enhanceFormAccessibility() {
        // Добавляем роли и ARIA-атрибуты
        this.form.setAttribute('role', 'form');
        this.form.setAttribute('aria-labelledby', 'contact-heading');
        
        // Улучшаем управление фокусом
        this.setupFocusManagement();
        
        // Добавляем клавиатурные shortcuts
        this.setupKeyboardShortcuts();
    }
    
    setupFocusManagement() {
        // Управление фокусом при ошибках
        this.setupErrorFocusManagement();
    }
    
    setupErrorFocusManagement() {
        // При ошибке валидации фокус перемещается на первое поле с ошибкой
        this.form.addEventListener('invalid', (e) => {
            e.preventDefault();
            const firstError = this.form.querySelector('[aria-invalid="true"]');
            if (firstError) {
                setTimeout(() => {
                    firstError.focus();
                }, 100);
            }
        }, true);
    }
    
    setupKeyboardShortcuts() {
        // ESC для сброса формы
        this.form.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.isSubmitting) {
                this.clearAllErrors();
                this.announceToScreenReader('Форма сброшена. Все ошибки очищены.');
            }
            
            // Ctrl + Enter для отправки формы
            if (e.ctrlKey && e.key === 'Enter') {
                e.preventDefault();
                this.form.dispatchEvent(new Event('submit'));
            }
        });
    }
    
    initializeFields() {
        this.fields = {
            name: document.getElementById('name'),
            email: document.getElementById('email'),
            subject: document.getElementById('subject'),
            message: document.getElementById('message'),
            budget: document.getElementById('budget')
        };
        
        this.charCount = document.getElementById('char-count');
    }
    
    setupEnhancedEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Расширенная валидация в реальном времени
        Object.values(this.fields).forEach(field => {
            if (field && field.type !== 'checkbox') {
                field.addEventListener('blur', () => this.validateFieldWithDetails(field));
                field.addEventListener('input', () => this.clearError(field));
                field.addEventListener('focus', () => this.announceFieldHelp(field));
            }
        });
        
        // Особые обработчики
        if (this.fields.message) {
            this.fields.message.addEventListener('input', () => this.updateCharCount());
        }
    }
    
    announceFieldHelp(field) {
        const helpElement = document.getElementById(`${field.id}-help`);
        if (helpElement) {
            this.announceToScreenReader(helpElement.textContent);
        }
    }
    
    setupCharacterCounter() {
        if (this.fields.message && this.charCount) {
            this.updateCharCount();
        }
    }
    
    updateCharCount() {
        if (this.fields.message && this.charCount) {
            const count = this.fields.message.value.length;
            this.charCount.textContent = count;
            this.charCount.setAttribute('aria-label', `${count} символов из 1000`);
            
            // Меняем цвет при приближении к лимиту
            if (count > 900) {
                this.charCount.style.color = '#dc3545';
                this.charCount.style.fontWeight = 'bold';
                if (count === 900) {
                    this.announceToScreenReader('Внимание: осталось 100 символов до предела', 'assertive');
                }
            } else if (count > 700) {
                this.charCount.style.color = '#fd7e14';
                this.charCount.style.fontWeight = '600';
            } else {
                this.charCount.style.color = '#28a745';
                this.charCount.style.fontWeight = 'normal';
            }
        }
    }
    
    handleSubmit(event) {
        event.preventDefault();
        
        if (this.isSubmitting) {
            this.announceToScreenReader('Форма уже отправляется, пожалуйста подождите');
            return;
        }
        
        console.log('Отправка улучшенной формы...');
        this.announceToScreenReader('Проверка формы перед отправкой');
        
        if (this.validateForm()) {
            this.submitForm();
        } else {
            this.showEnhancedFormErrors();
        }
    }
    
    validateForm() {
        let isValid = true;
        let errorCount = 0;
        
        const requiredFields = ['name', 'email', 'subject', 'message'];
        requiredFields.forEach(fieldName => {
            const field = this.fields[fieldName];
            if (field && !this.validateFieldWithDetails(field)) {
                isValid = false;
                errorCount++;
            }
        });
        
        if (errorCount > 0) {
            this.announceToScreenReader(`Обнаружено ${errorCount} ошибок в форме. Исправьте их перед отправкой.`, 'assertive');
        }
        
        return isValid;
    }
    
    validateFieldWithDetails(field) {
        const value = field.value.trim();
        const errorElement = document.getElementById(`${field.id}-error`);
        const fieldLabel = field.labels ? field.labels[0].textContent.replace('*', '').trim() : 'поле';
        
        this.clearError(field);
        
        // Проверяем обязательные поля
        if (field.hasAttribute('required') && !value) {
            this.showError(field, 'Это поле обязательно для заполнения');
            this.announceToScreenReader(`Ошибка в поле ${fieldLabel}: поле обязательно для заполнения`, 'assertive');
            return false;
        }
        
        // Специфические проверки
        switch (field.type) {
            case 'email':
                if (value && !this.isValidEmail(value)) {
                    this.showError(field, 'Введите корректный email адрес');
                    this.announceToScreenReader(`Ошибка в поле ${fieldLabel}: введите корректный email адрес`, 'assertive');
                    return false;
                }
                break;
                
            case 'text':
            case 'textarea':
                if (field.hasAttribute('minlength') && value.length < parseInt(field.getAttribute('minlength'))) {
                    const minLength = field.getAttribute('minlength');
                    this.showError(field, `Минимальная длина: ${minLength} символов`);
                    this.announceToScreenReader(`Ошибка в поле ${fieldLabel}: минимальная длина ${minLength} символов`, 'assertive');
                    return false;
                }
                break;
                
            case 'select-one':
                if (field.hasAttribute('required') && !value) {
                    this.showError(field, 'Выберите значение из списка');
                    this.announceToScreenReader(`Ошибка в поле ${fieldLabel}: выберите значение из списка`, 'assertive');
                    return false;
                }
                break;
        }
        
        return true;
    }
    
    isValidEmail(email) {
        const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return re.test(email);
    }
    
    showError(field, message) {
        field.style.borderColor = '#dc3545';
        field.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
        
        const errorElement = document.getElementById(`${field.id}-error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            errorElement.setAttribute('role', 'alert');
        }
        
        // Добавляем ARIA-атрибуты для доступности
        field.setAttribute('aria-invalid', 'true');
        field.setAttribute('aria-describedby', `${field.id}-error ${field.id}-help`.trim());
    }
    
    clearError(field) {
        field.style.borderColor = '';
        field.style.boxShadow = '';
        
        const errorElement = document.getElementById(`${field.id}-error`);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
            errorElement.removeAttribute('role');
        }
        
        field.removeAttribute('aria-invalid');
        const helpElement = document.getElementById(`${field.id}-help`);
        field.setAttribute('aria-describedby', helpElement ? `${field.id}-help` : '');
    }
    
    clearAllErrors() {
        Object.values(this.fields).forEach(field => {
            if (field) this.clearError(field);
        });
    }
    
    showEnhancedFormErrors() {
        const submitButton = this.form.querySelector('.submit-btn');
        const originalText = submitButton.querySelector('.btn-text').textContent;
        
        // Визуальная индикация ошибок
        submitButton.querySelector('.btn-text').textContent = 'Исправьте ошибки в форме';
        submitButton.style.background = '#fd7e14';
        
        // Прокручиваем к первой ошибке
        const firstError = this.form.querySelector('[aria-invalid="true"]');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstError.focus();
        }
        
        setTimeout(() => {
            submitButton.querySelector('.btn-text').textContent = originalText;
            submitButton.style.background = '';
        }, 3000);
    }
    
    async submitForm() {
        const submitButton = this.form.querySelector('.submit-btn');
        const btnText = submitButton.querySelector('.btn-text');
        const btnLoading = submitButton.querySelector('.btn-loading');
        const originalText = btnText.textContent;
        
        this.isSubmitting = true;
        
        // Показываем индикатор загрузки
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-flex';
        submitButton.disabled = true;
        submitButton.setAttribute('aria-label', 'Отправка сообщения, пожалуйста подождите');
        
        this.announceToScreenReader('Отправка сообщения, пожалуйста подождите');
        
        try {
            await this.simulateApiCall();
            this.showEnhancedSuccessModal();
            this.form.reset();
            this.updateCharCount();
            this.clearAllErrors();
            this.announceToScreenReader('Сообщение успешно отправлено! Я свяжусь с вами в ближайшее время.');
            
        } catch (error) {
            console.error('Ошибка отправки:', error);
            this.showEnhancedErrorModal();
            this.announceToScreenReader('Ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз.', 'assertive');
        } finally {
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitButton.disabled = false;
            submitButton.setAttribute('aria-label', 'Отправить форму обратной связи');
            this.isSubmitting = false;
        }
    }
    
    simulateApiCall() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() < 0.1) {
                    reject(new Error('Сервер временно недоступен'));
                } else {
                    resolve();
                }
            }, 2000);
        });
    }
    
    showEnhancedSuccessModal() {
        if (typeof window.showEnhancedSuccessModal === 'function') {
            window.showEnhancedSuccessModal();
        } else if (window.enhancedModal) {
            window.enhancedModal.showSuccess('Сообщение успешно отправлено!', 'Я свяжусь с вами в ближайшее время.');
        } else {
            // Фолбэк - обычное сообщение
            alert('Сообщение успешно отправлено! Я свяжусь с вами в ближайшее время.');
        }
    }
    
    showEnhancedErrorModal() {
        if (window.enhancedModal) {
            window.enhancedModal.showError('Ошибка отправки', 'Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз или свяжитесь со мной другим способом.');
        } else {
            alert('Ошибка при отправке. Пожалуйста, попробуйте еще раз.');
        }
    }
}

// Инициализируем улучшенную форму
new EnhancedContactForm();