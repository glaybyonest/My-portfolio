// scripts/contact-form.js - обработка формы

console.log('contact-form.js загружен');

// Ждем полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен, инициализируем форму...');
    
    // Находим форму
    const contactForm = document.getElementById('contact-form');
    console.log('Найдена форма:', contactForm);
    
    if (!contactForm) {
        console.error('Форма с id="contact-form" не найдена!');
        return;
    }
    
    // Добавляем обработчик отправки формы
    contactForm.addEventListener('submit', function(event) {
        // Отменяем стандартную отправку формы
        event.preventDefault();
        console.log('Форма отправлена!');
        
        // Получаем данные формы
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            message: document.getElementById('message').value.trim()
        };
        
        console.log('Данные формы:', formData);
        
        // Простая валидация
        if (!formData.name || !formData.email || !formData.message) {
            alert('Пожалуйста, заполните все поля формы');
            return;
        }
        
        if (formData.message.length < 10) {
            alert('Сообщение должно содержать минимум 10 символов');
            return;
        }
        
        // Показываем индикатор загрузки
        const submitButton = contactForm.querySelector('.submit-btn');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = 'Отправка...';
        submitButton.disabled = true;
        
        // Имитируем отправку на сервер (задержка 2 секунды)
        setTimeout(function() {
            // Восстанавливаем кнопку
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            
            // Показываем модальное окно успеха
            showSuccessModal();
            
            // Очищаем форму
            contactForm.reset();
            
            console.log('Форма обработана успешно!');
        }, 2000);
    });
    
    console.log('Обработчик формы установлен');
});