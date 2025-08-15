// Дані для анімації тексту в блоках
const textForBlocks = {
    block1C: [
        { id: 'line-1c-1', text: '> event Sale.Create()' }, { id: 'line-1c-2', text: '> Керування товарами' },
        { id: 'line-1c-3', text: '> Формування чека' }, { id: 'line-1c-4', text: '[Відправка в драйвер...]' },
    ],
    blockDriver: [
        { id: 'line-driver-1', text: '// Driver Postnet' }, { id: 'line-driver-2', text: 'Простий та гнучкий API' },
        { id: 'line-driver-3', text: 'Обробка команд 1С' }, { id: 'line-driver-4', text: 'Логування та звіти' },
        { id: 'line-driver-5', text: '[Фіскалізація...]' },
    ],
    blockPosnet: [
        { id: 'line-posnet-1', text: 'status: OK' }, { id: 'line-posnet-2', text: 'Друк на термострічці' },
        { id: 'line-posnet-3', text: 'Формування Z-звітів' }, { id: 'line-posnet-4', text: '>> Чек надруковано' },
    ]
};

// Функція "друкарської машинки", яка повертає Promise після завершення
function typeWriterSVG(lines, charSpeed = 30) {
    return new Promise(resolve => {
        let lineIndex = 0; let charIndex = 0;
        function type() {
            if (lineIndex >= lines.length) {
                resolve(); return;
            }
            const currentLine = lines[lineIndex]; const el = document.getElementById(currentLine.id);
            if (!el) return;
            if (charIndex < currentLine.text.length) {
                el.textContent += currentLine.text[charIndex]; charIndex++;
                setTimeout(type, charSpeed);
            } else {
                lineIndex++; charIndex = 0;
                setTimeout(type, charSpeed * 4);
            }
        }
        type();
    });
}

// Функція анімації стрілки, яка повертає Promise
function drawArrow(arrowElement) {
    return new Promise(resolve => {
        arrowElement.addEventListener('transitionend', resolve, { once: true });
        // Ось де ми додаємо клас, щоб запустити анімацію з CSS
        arrowElement.classList.add('is-drawing');
    });
}

// Головна функція анімації
export function initDiagramAnimation() {
    const diagram = document.getElementById('how-it-works-diagram');
    if (!diagram) return;

    const box1 = document.getElementById('diagram-box-1');
    const box2 = document.getElementById('diagram-box-2');
    const box3 = document.getElementById('diagram-box-3');
    const arrow1 = document.getElementById('arrow1');
    const arrow2 = document.getElementById('arrow2');
    const allArrows = [arrow1, arrow2];
    const allTspans = Object.values(textForBlocks).flat().map(line => line.id);

    let isAnimating = false;

    // Функція для підготовки елементів до анімації
    const setupElements = () => {
        allArrows.forEach(arrow => {
            const length = arrow.getTotalLength();
            arrow.style.strokeDashoffset = length;
        });
    };

    const resetAnimation = () => {
        isAnimating = false;
        [box1, box2, box3].forEach(box => box.classList.remove('is-visible'));
        allArrows.forEach(arrow => {
            arrow.classList.remove('is-drawing'); // Прибираємо клас при скиданні
            const length = arrow.getTotalLength();
            if (length > 0) {
                arrow.style.strokeDashoffset = length;
            }
        });
        allTspans.forEach(id => { const el = document.getElementById(id); if (el) el.textContent = ''; });
    };

    // Використовуємо async/await для чистої послідовності
    const startAnimation = async () => {
        if (isAnimating) return;
        isAnimating = true;

        // Крок 1: Показати перший блок і дочекатися завершення друку
        box1.classList.add('is-visible');
        await typeWriterSVG(textForBlocks.block1C);

        // Крок 2: Намалювати першу стрілку і дочекатися її завершення
        await drawArrow(arrow1);

        // Крок 3: Показати другий блок і дочекатися завершення друку
        box2.classList.add('is-visible');
        await typeWriterSVG(textForBlocks.blockDriver);

        // Крок 4: Намалювати другу стрілку і дочекатися її завершення
        await drawArrow(arrow2);

        // Крок 5: Показати третій блок і почати друк
        box3.classList.add('is-visible');
        await typeWriterSVG(textForBlocks.blockPosnet);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startAnimation();
            } else {
                resetAnimation();
            }
        });
    }, { threshold: 0.5 });

    setupElements();
    observer.observe(diagram);
}