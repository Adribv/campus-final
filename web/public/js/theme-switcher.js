document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.toggle('dark-theme', savedTheme === 'dark');
        themeToggle.classList.toggle('fa-sun', savedTheme === 'dark');
        themeToggle.classList.toggle('fa-moon', savedTheme === 'light');
    }
    
    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        
        // Toggle icon
        themeToggle.classList.toggle('fa-sun', isDark);
        themeToggle.classList.toggle('fa-moon', !isDark);
        
        // Save preference
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}); 