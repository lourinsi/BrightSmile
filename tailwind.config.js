// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // This 'content' array tells Tailwind CSS where to look for HTML/JSX/TSX files
  // that use Tailwind classes. Tailwind will scan these files and generate
  // only the CSS utilities you're actually using, making your final CSS bundle small.
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scans all .js, .jsx, .ts, .tsx files inside the 'src' directory and its subdirectories.
    "./public/index.html",         // Include your main HTML file, as it might also contain Tailwind classes.
  ],
  theme: {
    extend: {
      // You can define custom theme configurations here, e.g., custom colors, fonts, spacing.
      // For example, if you want to use the 'Inter' font (which you mentioned earlier),
      // you could extend the fontFamily here:
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    // You can add Tailwind CSS plugins here (e.g., @tailwindcss/forms, @tailwindcss/typography)
  ],
}
