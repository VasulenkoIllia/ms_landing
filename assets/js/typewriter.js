export function startTypewriter(element, text, speed = 40) {
    let i = 0;
    element.innerHTML = ''; // Clear previous content

    function type() {
        if (i < text.length) {
            // Handle newlines correctly
            if (text.charAt(i) === '\n') {
                element.innerHTML += '<br>';
            } else {
                element.innerHTML += text.charAt(i);
            }
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// // Example usage:
// document.addEventListener('DOMContentLoaded', () => {
//     const codeElement = document.getElementById('code-example');
//     if (codeElement) {
//         const codeSnippet = `// Підключення до реєстратора
// Driver.Connect(Порт: "COM3", Швидкість: 9600);
//
// // Друк чека
// Driver.OpenReceipt();
// Driver.AddItem(Назва: "Товар 1", Ціна: 150.00, К-ть: 2);
// Driver.AddPayment(Тип: "card", Сума: 300.00);
// Driver.CloseReceipt(); // Готово!`;
//         startTypewriter(codeElement, codeSnippet);
//     }
// });
