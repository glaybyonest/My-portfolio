// scripts/modal.js - простой и надежный скрипт для модального окна

// Функция для показа модального окна
function showSuccessModal() {
    console.log('Показываем модальное окно...');
    
    // Создаем HTML для модального окна
    const modalHTML = `
        <div id="success-modal" style="
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
            font-family: Arial, sans-serif;
        ">
            <div style="
                background: white;
                padding: 40px;
                border-radius: 15px;
                max-width: 500px;
                width: 90%;
                text-align: center;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                border: 3px solid #dc3545;
            ">
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
                ">✓</div>
                
                <h2 style="color: #dc3545; margin-bottom: 20px; font-size: 24px;">
                    Сообщение отправлено!
                </h2>
                
                <p style="margin-bottom: 25px; font-size: 16px; line-height: 1.5; color: #333;">
                    Спасибо за ваше сообщение! Я свяжусь с вами в ближайшее время.
                </p>
                
                <button onclick="closeSuccessModal()" style="
                    background: #dc3545;
                    color: white;
                    border: none;
                    padding: 12px 30px;
                    border-radius: 25px;
                    cursor: pointer;
                    font-size: 16px;
                    font-weight: bold;
                    transition: all 0.3s ease;
                " onmouseover="this.style.background='#c82333'" 
                   onmouseout="this.style.background='#dc3545'">
                    Закрыть
                </button>
            </div>
        </div>
    `;
    
    // Добавляем модальное окно на страницу
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    console.log('Модальное окно добавлено на страницу');
}

// Функция для закрытия модального окна
function closeSuccessModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.remove();
        console.log('Модальное окно закрыто');
    }
}

// Закрытие модального окна по клавише ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeSuccessModal();
    }
});

// Закрытие модального окна при клике вне его
document.addEventListener('click', function(event) {
    const modal = document.getElementById('success-modal');
    if (modal && event.target === modal) {
        closeSuccessModal();
    }
});