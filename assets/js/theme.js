export function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const setTheme = (mode) => {
        // 1. Встановлюємо клас для всієї сторінки
        if (mode === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        // 2. Генеруємо потрібний HTML іконки всередині кнопки
        // Це найнадійніший спосіб, бо він не залежить від того, SVG там чи i
        themeToggle.innerHTML = `<i data-lucide="${mode === 'dark' ? 'moon' : 'sun'}" class="w-5 h-5"></i>`;

        // 3. Кажемо бібліотеці Lucide знайти нову іконку і перетворити її на SVG
        lucide.createIcons();

        // 4. Зберігаємо вибір користувача
        localStorage.setItem('theme', mode);
    };

    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.classList.contains('dark');
        setTheme(isDark ? 'light' : 'dark');
    });

    // Завантажуємо збережену тему при першому запуску
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);
}