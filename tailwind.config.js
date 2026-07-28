/** @type {import('tailwindcss').Config} */
module.exports = {
    // Tailwind scanne ces fichiers pour ne generer que les classes reellement
    // utilisees. index.html est inclus car <body> y porte des classes
    // (bg-[#FDFCF8], etc.) qui n'apparaissent pas dans le JSX.
    content: [
        './src/**/*.jsx',
        './index.html',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [
        // Fournit les classes prose-* utilisees par les pages legales.
        // Elles etaient presentes dans le code mais sans effet : le CDN
        // Tailwind ne chargeait pas ce plugin.
        require('@tailwindcss/typography'),
    ],
};
