let translations = {};

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
    'b4-title': 'b4Title',
    'b4-sub': 'b4Sub',
    'cta-buy-text': 'buyText'
};

async function fetchTranslations() {
    try {
        const response = await fetch('./assets/js/translations.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        translations = await response.json();
    } catch (error) {
        console.error("Could not load translations:", error);
    }
}

function applyTranslations(lang) {
    const t = translations[lang] || translations.ua;
    if (!t) return;

    document.documentElement.lang = lang;
    document.title = t.title;

    for (const id in elementsMap) {
        const el = document.getElementById(id);
        if (el) {
            el.textContent = t[elementsMap[id]];
        }
    }
}

export async function initLangSwitcher() {
    await fetchTranslations();

    const langSwitch = document.getElementById('lang-switch');
    if (!langSwitch) return;

    langSwitch.addEventListener('change', (e) => {
        const lang = e.target.value;
        localStorage.setItem('lang', lang);
        applyTranslations(lang);
    });

    const savedLang = localStorage.getItem('lang') || 'ua';
    langSwitch.value = savedLang;
    applyTranslations(savedLang);
}