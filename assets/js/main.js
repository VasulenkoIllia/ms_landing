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
        const codeSnippet = `// Connection
Driver.Connect(Port: "COM3");


Driver.OpenReceipt();
Driver.AddItem(Name, Price);
Driver.AddPayment(Card);
Driver.CloseReceipt();`;
        startTypewriter(codeElement, codeSnippet);
    }

    lucide.createIcons();
});