// scripts/download.js - исправленная версия с доступностью

console.log('download.js загружен');

let isDownloading = false; // Флаг для предотвращения множественных скачиваний

// Основная функция скачивания index.html как резюме
function downloadIndexHtmlAsResume() {
    // Защита от множественных вызовов
    if (isDownloading) {
        console.log('Скачивание уже выполняется...');
        announceToScreenReader('Скачивание уже выполняется, пожалуйста подождите');
        return;
    }
    
    isDownloading = true;
    console.log('Скачивание index.html как резюме...');
    announceToScreenReader('Начинается скачивание резюме');
    
    try {
        // Получаем текущий HTML содержимое страницы
        const htmlContent = document.documentElement.outerHTML;
        
        // Создаем Blob с HTML содержимым
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        // Создаем временную ссылку для скачивания
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Резюме_Сецков_Даниил.html';
        
        // Добавляем ссылку в DOM
        document.body.appendChild(link);
        
        // Программно кликаем по ссылке
        link.click();
        
        // Удаляем ссылку из DOM
        document.body.removeChild(link);
        
        // Освобождаем URL
        setTimeout(() => {
            URL.revokeObjectURL(url);
            isDownloading = false; // Сбрасываем флаг после завершения
        }, 100);
        
        // Показываем уведомление об успешном скачивании
        showDownloadSuccess();
        
        // Логируем действие
        logDownloadAction();
        
        // Объявляем успешное скачивание
        announceToScreenReader('Резюме успешно скачано. Файл: Резюме_Сецков_Даниил.html');
        
    } catch (error) {
        console.error('Ошибка при скачивании:', error);
        isDownloading = false; // Сбрасываем флаг в случае ошибки
        announceToScreenReader('Ошибка при скачивании резюме. Пожалуйста, попробуйте еще раз.');
    }
}

// Функция для показа уведомления об успешном скачивании
function showDownloadSuccess() {
    // Удаляем существующие уведомления
    const existingNotifications = document.querySelectorAll('[data-download-notification]');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.setAttribute('data-download-notification', 'true');
    notification.setAttribute('aria-live', 'polite');
    notification.innerHTML = `
        <div style="
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideInUp 0.3s ease-out;
            max-width: 350px;
        ">
            <span style="font-size: 18px;" aria-hidden="true">✅</span>
            <div>
                <strong>Резюме скачано!</strong>
                <div style="font-size: 12px; opacity: 0.9;">Файл: Резюме_Сецков_Даниил.html</div>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="
                        background: none;
                        border: none;
                        color: white;
                        font-size: 16px;
                        cursor: pointer;
                        padding: 0;
                        margin-left: 10px;
                    " 
                    aria-label="Закрыть уведомление">×</button>
        </div>
    `;
    
    // Добавляем стили для анимации
    if (!document.getElementById('download-styles')) {
        const style = document.createElement('style');
        style.id = 'download-styles';
        style.textContent = `
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
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Функция для логирования скачивания
function logDownloadAction() {
    const timestamp = new Date().toLocaleString('ru-RU');
    console.log(`HTML резюме скачано: ${timestamp}`);
}

// Функция для объявлений скринридеру
function announceToScreenReader(message) {
    // Создаем живую область если её нет
    let liveRegion = document.getElementById('a11y-announcements');
    if (!liveRegion) {
        liveRegion = document.createElement('div');
        liveRegion.id = 'a11y-announcements';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        document.body.appendChild(liveRegion);
    }
    
    liveRegion.textContent = message;
    
    // Очищаем сообщение через короткое время
    setTimeout(() => {
        liveRegion.textContent = '';
    }, 3000);
}

// Инициализация после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('Инициализация функций скачивания...');
    
    // Удаляем все предыдущие обработчики (на всякий случай)
    const downloadButtons = document.querySelectorAll('[data-download-resume]');
    downloadButtons.forEach(button => {
        button.replaceWith(button.cloneNode(true));
    });
    
    // Находим обновленные кнопки
    const freshDownloadButtons = document.querySelectorAll('[data-download-resume]');
    
    // Добавляем ОДИН обработчик на каждую кнопку
    freshDownloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Останавливаем всплытие события
            console.log('Клик по кнопке скачивания резюме (HTML версия)');
            downloadIndexHtmlAsResume();
        }, { once: true }); // Обработчик сработает только один раз
        
        // Добавляем обработчик для клавиатуры
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                downloadIndexHtmlAsResume();
            }
        });
    });
    
    console.log(`Найдено кнопок скачивания: ${freshDownloadButtons.length}`);
});

// Добавляем глобальную функцию для ручного вызова
window.downloadIndexHtmlAsResume = downloadIndexHtmlAsResume;

// Добавляем стили для скринридера
if (!document.getElementById('a11y-styles')) {
    const style = document.createElement('style');
    style.id = 'a11y-styles';
    style.textContent = `
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
    `;
    document.head.appendChild(style);
}