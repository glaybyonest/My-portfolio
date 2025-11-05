// scripts/contact-form.js - улучшенная обработка формы с доступностью

console.log('contact-form.js загружен');

class ContactForm {
    constructor() {
        this.form = null;
        this.fields = {};
        this.liveRegion = null;
        this.init();
    }
    
    init() {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('Инициализируем улучшенную форму с доступностью...');
            
            this.form = document.getElementById('contact-form');
            if (!this.form) {
                console.error('Форма не найдена');
                return;
            }
            
            this.createLiveRegion();
            this.initializeFields();
            this.setupEventListeners();
            this.setupCharacterCounter();
            
            console.log('Улучшенная форма с доступностью инициализирована');
        });
    }
    
    createLiveRegion() {
        // Создаем живую область для объявлений скринридера
        this.liveRegion = document.createElement('div');
        this.liveRegion.setAttribute('aria-live', 'polite');
        this.liveRegion.setAttribute('aria-atomic', 'true');
        this.liveRegion.className = 'sr-only';
        this.liveRegion.id = 'form-live-region';
        document.body.appendChild(this.liveRegion);
    }
    
    announceToScreenReader(message) {
        if (this.liveRegion) {
            this.liveRegion.textContent = message;
            // Очищаем сообщение через короткое время
            setTimeout(() => {
                this.liveRegion.textContent = '';
            }, 3000);
        }
    }
    
    initializeFields() {
        this.fields = {
            name: document.getElementById('name'),
            email: document.getElementById('email'),
            subject: document.getElementById('subject'),
            message: document.getElementById('message'),
            budget: document.getElementById('budget')
        };
        
        // Инициализируем счетчик символов
        this.charCount = document.getElementById('char-count');
    }
    
    setupEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Валидация в реальном времени
        Object.values(this.fields).forEach(field => {
            if (field && field.type !== 'checkbox') {
                field.addEventListener('blur', () => this.validateField(field));
                field.addEventListener('input', () => this.clearError(field));
            }
        });
        
        // Особые обработчики
        if (this.fields.message) {
            this.fields.message.addEventListener('input', () => this.updateCharCount());
        }
        
        // Обработчик для клавиши Escape
        this.form.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.clearAllErrors();
                this.announceToScreenReader('Форма сброшена');
            }
        });
    }
    
    setupCharacterCounter() {
        if (this.fields.message && this.charCount) {
            this.updateCharCount(); // Инициализируем счетчик
        }
    }
    
    updateCharCount() {
        if (this.fields.message && this.charCount) {
            const count = this.fields.message.value.length;
            this.charCount.textContent = count;
            
            // Меняем цвет при приближении к лимиту
            if (count > 900) {
                this.charCount.style.color = '#dc3545';
            } else if (count > 700) {
                this.charCount.style.color = '#fd7e14';
            } else {
                this.charCount.style.color = '#28a745';
            }
            
            // Объявляем изменение для скринридера при приближении к лимиту
            if (count === 900) {
                this.announceToScreenReader('Внимание: осталось 100 символов до предела');
            } else if (count === 950) {
                this.announceToScreenReader('Внимание: осталось 50 символов до предела');
            }
        }
    }
    
    handleSubmit(event) {
        event.preventDefault();
        console.log('Отправка улучшенной формы...');
        
        // Объявляем начало проверки формы
        this.announceToScreenReader('Проверка формы перед отправкой');
        
        if (this.validateForm()) {
            this.submitForm();
        } else {
            this.showFormErrors();
        }
    }
    
    validateForm() {
        let isValid = true;
        
        // Проверяем обязательные поля
        const requiredFields = ['name', 'email', 'subject', 'message'];
        requiredFields.forEach(fieldName => {
            const field = this.fields[fieldName];
            if (field && !this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    validateField(field) {
        const value = field.value.trim();
        const errorElement = document.getElementById(`${field.id}-error`);
        const fieldLabel = field.previousElementSibling ? field.previousElementSibling.textContent.replace('*', '').trim() : 'поле';
        
        // Очищаем предыдущие ошибки
        this.clearError(field);
        
        // Проверяем обязательные поля
        if (field.hasAttribute('required') && !value) {
            this.showError(field, 'Это поле обязательно для заполнения');
            this.announceToScreenReader(`Ошибка в поле ${fieldLabel}: поле обязательно для заполнения`);
            return false;
        }
        
        // Специфические проверки
        switch (field.type) {
            case 'email':
                if (value && !this.isValidEmail(value)) {
                    this.showError(field, 'Введите корректный email адрес');
                    this.announceToScreenReader(`Ошибка в поле ${fieldLabel}: введите корректный email адрес`);
                    return false;
                }
                break;
                
            case 'text':
            case 'textarea':
                if (field.hasAttribute('minlength') && value.length < field.getAttribute('minlength')) {
                    const minLength = field.getAttribute('minlength');
                    this.showError(field, `Минимальная длина: ${minLength} символов`);
                    this.announceToScreenReader(`Ошибка в поле ${fieldLabel}: минимальная длина ${minLength} символов`);
                    return false;
                }
                break;
        }
        
        return true;
    }
    
    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    showError(field, message) {
        field.style.borderColor = '#dc3545';
        field.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
        
        const errorElement = document.getElementById(`${field.id}-error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        
        // Добавляем ARIA-атрибуты для доступности
        field.setAttribute('aria-invalid', 'true');
        field.setAttribute('aria-describedby', `${field.id}-error`);
    }
    
    clearError(field) {
        field.style.borderColor = '';
        field.style.boxShadow = '';
        
        const errorElement = document.getElementById(`${field.id}-error`);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
        
        field.removeAttribute('aria-invalid');
        field.removeAttribute('aria-describedby');
    }
    
    clearAllErrors() {
        Object.values(this.fields).forEach(field => {
            if (field) this.clearError(field);
        });
    }
    
    showFormErrors() {
        // Показываем общее сообщение об ошибках
        const submitButton = this.form.querySelector('.submit-btn');
        const originalText = submitButton.querySelector('.btn-text').textContent;
        
        submitButton.querySelector('.btn-text').textContent = 'Исправьте ошибки в форме';
        submitButton.style.background = '#fd7e14';
        
        // Объявляем ошибки для скринридера
        this.announceToScreenReader('В форме обнаружены ошибки. Пожалуйста, исправьте их перед отправкой.');
        
        // Прокручиваем к первой ошибке
        const firstError = this.form.querySelector('[aria-invalid="true"]');
        if (firstError) {
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
        
        // Показываем индикатор загрузки
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitButton.disabled = true;
        
        // Объявляем начало отправки
        this.announceToScreenReader('Отправка сообщения, пожалуйста подождите');
        
        try {
            // Имитируем отправку на сервер
            await this.simulateApiCall();
            
            // Показываем успешное сообщение
            this.showSuccessModal();
            
            // Очищаем форму
            this.form.reset();
            this.updateCharCount();
            this.clearAllErrors();
            
            // Объявляем успех
            this.announceToScreenReader('Сообщение успешно отправлено! Я свяжусь с вами в ближайшее время.');
            
        } catch (error) {
            console.error('Ошибка отправки:', error);
            this.showErrorModal();
            this.announceToScreenReader('Ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз.');
        } finally {
            // Восстанавливаем кнопку
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitButton.disabled = false;
        }
    }
    
    simulateApiCall() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // 10% шанс ошибки для демонстрации
                if (Math.random() < 0.1) {
                    reject(new Error('Сервер временно недоступен'));
                } else {
                    resolve();
                }
            }, 2000);
        });
    }
    
    showSuccessModal() {
        if (typeof showSuccessModal === 'function') {
            showSuccessModal();
        } else {
            // Фолбэк уведомление
            alert('Сообщение успешно отправлено! Я свяжусь с вами в ближайшее время.');
        }
    }
    
    showErrorModal() {
        alert('Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз или свяжитесь со мной другим способом.');
    }
}

// Инициализируем форму
new ContactForm();

// Добавляем стили для улучшенной формы с доступностью
const formStyles = `
    .error-message {
        color: #dc3545;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: none;
    }
    
    .char-counter {
        text-align: right;
        font-size: 0.875rem;
        color: #6c757d;
        margin-top: 0.25rem;
    }
    
    .required-asterisk {
        color: #dc3545;
    }
    
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
    
    .checkbox-label {
        display: flex;
        align-items: center;
        cursor: pointer;
        margin-top: 1rem;
    }
    
    .checkbox-label input {
        margin-right: 0.5rem;
    }
    
    .checkmark {
        width: 20px;
        height: 20px;
        border: 2px solid #ddd;
        border-radius: 4px;
        margin-right: 0.5rem;
        position: relative;
        transition: all 0.3s ease;
    }
    
    .checkbox-label input:checked + .checkmark {
        background: #dc3545;
        border-color: #dc3545;
    }
    
    .checkbox-label input:checked + .checkmark:after {
        content: '✓';
        color: white;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 14px;
    }
    
    .contact-hero {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 2rem;
        margin-bottom: 3rem;
        align-items: center;
    }
    
    .contact-intro {
        background: linear-gradient(135deg, #fff5f5 0%, #ffffff 100%);
        padding: 2rem;
        border-radius: 12px;
        border-left: 4px solid #dc3545;
    }
    
    .availability {
        background: #f8f9fa;
        padding: 1.5rem;
        border-radius: 8px;
        margin-top: 2rem;
        border: 1px solid #e9ecef;
    }
    
    .availability-status {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
    }
    
    .status-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
    }
    
    .status-dot.available {
        background: #28a745;
        animation: pulse 2s infinite;
    }
    
    .availability-note {
        color: #666;
        font-size: 0.9rem;
        margin: 0;
    }
    
    .diary-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 2rem;
        flex-wrap: wrap;
    }
    
    .export-btn {
        background: #6c757d;
        color: white;
        padding: max(.5rem, calc((44px - 1em)/2)) 2.5rem;
        border: none;
        border-radius: 50px;
        cursor: pointer;
        font-size: 1.1rem;
        transition: all 0.3s ease;
        font-weight: bold;
        box-shadow: 0 4px 15px rgba(108, 117, 125, 0.3);
        min-height: 44px;
        display: flex;
        align-items: center;
    }
    
    .export-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(108, 117, 125, 0.4);
        background: #5a6268;
    }
    
    @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.5; }
        100% { opacity: 1; }
    }
    
    /* Адаптивность для контактной страницы */
    @media (max-width: 768px) {
        .contact-hero {
            grid-template-columns: 1fr;
            text-align: center;
        }
        
        .contact-illustration {
            order: -1;
        }
        
        .diary-actions {
            flex-direction: column;
            align-items: center;
        }
        
        .export-btn,
        .add-entry-btn {
            width: 100%;
            max-width: 300px;
        }
    }
`;

// Добавляем стили в документ
if (!document.getElementById('form-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'form-styles';
    styleSheet.textContent = formStyles;
    document.head.appendChild(styleSheet);
}