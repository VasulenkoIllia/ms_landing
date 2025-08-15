const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: [
        './*.html',
        './assets/js/**/*.js',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
            },
        },
    },
    plugins: [],
}