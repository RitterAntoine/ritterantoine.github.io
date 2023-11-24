document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Check the user's preference
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Set initial theme based on user preference
    if (isDarkMode) {
        body.classList.add('dark-mode');
        themeToggle.checked = true;
    }

    // Toggle theme on switch change
    themeToggle.addEventListener('change', function () {
        if (themeToggle.checked) {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
    });
});
