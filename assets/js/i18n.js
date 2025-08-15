// Оголошуємо змінну на рівні модуля, щоб вона була доступна для всіх функцій
let translations = {};

// Карта відповідності ID елемента -> ключ у JSON
const elementsMap = {
    'tagline': 'tagline',
    'hero-title': 'heroTitle',
    'hero-sub': 'heroSub',
    'btn-learn': 'btnLearn',
    'btn-contact': 'btnContact',
    'card-title': 'cardTitle',
    'benefits-title': 'benefitsTitle',
    'b1-title': 'b1Title',
    'b1-sub': 'b1Sub',
    'b2-title': 'b2Title',
    'b2-sub': 'b2Sub',
    'b3-title': 'b3Title',
    'b3-sub': 'b3Sub',
    'b3-desc': 'b3Desc',
    'features-title': 'featuresTitle',
    'features-sub': 'featuresSub',
    'company-title': 'companyTitle',
    'company-desc': 'companyDesc',
    'company-li-1': 'companyLi1',
    'company-li-2': 'companyLi2',
    'company-li-3': 'companyLi3',
    'trust-title': 'trustTitle',
    'trust-desc': 'trustDesc',
    'location': 'location',
    'contact-title': 'contactTitle',
    'contact-sub': 'contactSub',
    'support-hours': 'supportHours',
    'send-text': 'sendText',
    'demo-btn': 'demoBtn',
    'copyright': 'copyright',
    'privacy-link': 'privacyLink',
    'terms-link': 'termsLink',
    'cta-buy-text': 'buyText'
};

// Окрема карта для плейсхолдерів у формах
const placeholdersMap = {
    'name': 'formName',
    'email': 'formEmail',
    'company': 'formCompany',
    'message': 'formMessage'
};

// Асинхронна функція для завантаження JSON файлу
async function fetchTranslations() {
    try {
        const response = await fetch('./assets/js/translations.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Записуємо результат у нашу глобальну змінну
        translations = await response.json();
    } catch (error) {
        console.error("Could not load translations:", error);
    }
}

// Функція, що застосовує переклади до сторінки
function applyTranslations(lang) {
    const t = translations[lang] || translations.ua;
    if (!t) return;

    // Встановлюємо атрибути для всієї сторінки
    document.documentElement.lang = lang;
    document.title = t.title;

    // Застосовуємо переклади до звичайних елементів
    for (const id in elementsMap) {
        const el = document.getElementById(id);
        if (el) {
            el.textContent = t[elementsMap[id]];
        }
    }

    // Окремо застосовуємо переклади до плейсхолдерів
    for (const id in placeholdersMap) {
        const el = document.getElementById(id);
        if (el) {
            el.placeholder = t[placeholdersMap[id]];
        }
    }
}

// Головна функція ініціалізації
export async function initLangSwitcher() {
    // Спочатку завантажуємо переклади
    await fetchTranslations();

    const langSwitch = document.getElementById('lang-switch');
    if (!langSwitch) return;

    // Додаємо слухач на зміну мови
    langSwitch.addEventListener('change', (e) => {
        const lang = e.target.value;
        localStorage.setItem('lang', lang);
        applyTranslations(lang);
    });

    // Застосовуємо збережену або дефолтну мову при завантаженні
    const savedLang = localStorage.getItem('lang') || 'ua';
    langSwitch.value = savedLang;
    applyTranslations(savedLang);
}