import { initTheme } from './theme.js';
import { initLangSwitcher } from './i18n.js';
import { startTypewriter } from './typewriter.js';
import { initDiagramAnimation } from './diagram.js';

document.addEventListener('DOMContentLoaded', () => {
    AOS?.init({ once: true, duration: 700 });

    initTheme();
    initLangSwitcher();
    initDiagramAnimation();

    const footerYear = document.getElementById('footer-year');
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }

    const codeElement = document.getElementById('code-example');
    if (codeElement) {
        const codeSnippet = `// Підключення до реєстратора
Driver.Connect(Порт: "COM3", Швидкість: 9600);

// Друк чека
Driver.OpenReceipt();
Driver.AddItem(Назва: "Товар 1", Ціна: 150.00, К-ть: 2);
Driver.AddPayment(Тип: "card", Сума: 300.00);
Driver.CloseReceipt(); // Готово!`;
        startTypewriter(codeElement, codeSnippet);
    }

    lucide.createIcons();
});