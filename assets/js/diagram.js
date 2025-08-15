const textForBlocks = {
    block1C: [
        { id: 'line-1c-1', text: 'Sale.Create()' },
        { id: 'line-1c-2', text: 'ManageItems()' },
        { id: 'line-1c-3', text: 'MakeReceipt()' },
        { id: 'line-1c-4', text: 'SendToDriver()' },
    ],
    blockDriver: [
        { id: 'line-driver-1', text: '// Driver: Posnet' },
        { id: 'line-driver-2', text: 'API()' },
        { id: 'line-driver-3', text: 'Handle1C()' },
        { id: 'line-driver-4', text: 'LogReports()' },
        { id: 'line-driver-5', text: 'Fiscalize()' },
    ],
    blockPosnet: [
        { id: 'line-posnet-1', text: 'status=OK' },
        { id: 'line-posnet-2', text: 'Print()' },
        { id: 'line-posnet-3', text: 'MakeZReport()' },
        { id: 'line-posnet-4', text: 'ReceiptPrinted()' },
    ]
};


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

function drawArrow(arrowElement) {
    return new Promise(resolve => {
        arrowElement.addEventListener('transitionend', resolve, { once: true });
        arrowElement.classList.add('is-drawing');
    });
}

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
            arrow.classList.remove('is-drawing');
            const length = arrow.getTotalLength();
            if (length > 0) {
                arrow.style.strokeDashoffset = length;
            }
        });
        allTspans.forEach(id => { const el = document.getElementById(id); if (el) el.textContent = ''; });
    };

    const startAnimation = async () => {
        if (isAnimating) return;
        isAnimating = true;

        box1.classList.add('is-visible');
        await typeWriterSVG(textForBlocks.block1C);

        await drawArrow(arrow1);

        box2.classList.add('is-visible');
        await typeWriterSVG(textForBlocks.blockDriver);

        await drawArrow(arrow2);

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