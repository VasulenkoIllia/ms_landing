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